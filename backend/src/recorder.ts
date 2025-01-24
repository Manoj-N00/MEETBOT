import { Builder, Browser, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import path from 'path';
import fs from 'fs';

const RECORDINGS_DIR = path.join(process.cwd(), 'recordings');

// Ensure recordings directory exists
if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
}

export async function startRecording(meetingUrl: string) {
  const driver = await getDriver();
  
  try {
    await openMeet(driver, meetingUrl);
    await new Promise(x => setTimeout(x, 20000)); // Wait for admin approval
    const recordingPath = await startScreenshare(driver);
    return { 
      status: 'Recording completed',
      path: recordingPath
    };
  } catch (error) {
    console.error('Recording error:', error);
    throw error;
  }
}

async function openMeet(driver: WebDriver, meetingUrl: string) {
  try {
    await driver.get(meetingUrl);
    const popupButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Got it")]')), 10000);
    await popupButton.click();
    const nameInput = await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Your name"]')), 10000);
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys('Meeting Recorder');
    await driver.sleep(1000);
    const buttonInput = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ask to join")]')), 10000);
    await buttonInput.click();
  } catch (error) {
    console.error('Error joining meeting:', error);
    throw error;
  }
}

async function getDriver() {
  const options = new Options();
  options.addArguments(
    "--disable-blink-features=AutomationControlled",
    "--use-fake-ui-for-media-stream",
    "--window-size=1080,720",
    "--auto-select-desktop-capture-source=[RECORD]",
    "--enable-usermedia-screen-capturing",
    "--auto-select-tab-capture-source-by-title=Meet",
    "--allow-running-insecure-content"
  );

  // Set Chrome download directory to our recordings folder
  options.setUserPreferences({
    'download.default_directory': RECORDINGS_DIR,
    'download.prompt_for_download': false,
    'download.directory_upgrade': true
  });

  return new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
}

async function startScreenshare(driver: WebDriver) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `recording-${timestamp}.webm`;
  const recordingPath = path.join(RECORDINGS_DIR, filename);

  const script = `
    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }

    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];
      
      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();
      
      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });
      
      let recorded = wait(lengthInMS).then(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      });
      
      return Promise.all([stopped, recorded]).then(() => data);
    }
    
    window.navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "browser"
      },
      audio: true,
      preferCurrentTab: true
    }).then(async screenStream => {                        
      const audioContext = new AudioContext();
      const screenAudioStream = audioContext.createMediaStreamSource(screenStream);
      const audioEl1 = document.querySelectorAll("audio")[0];
      const audioEl2 = document.querySelectorAll("audio")[1];
      const audioEl3 = document.querySelectorAll("audio")[2];
      const audioElStream1 = audioContext.createMediaStreamSource(audioEl1.srcObject);
      const audioElStream2 = audioContext.createMediaStreamSource(audioEl3.srcObject);
      const audioElStream3 = audioContext.createMediaStreamSource(audioEl2.srcObject);

      const dest = audioContext.createMediaStreamDestination();

      screenAudioStream.connect(dest);
      audioElStream1.connect(dest);
      audioElStream2.connect(dest);
      audioElStream3.connect(dest);
      
      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...dest.stream.getAudioTracks()
      ]);
      
      const recordedChunks = await startRecording(combinedStream, 60000);
      
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      
      const recording = document.createElement("video");
      recording.src = URL.createObjectURL(recordedBlob);
      
      const downloadButton = document.createElement("a");
      downloadButton.href = recording.src;
      downloadButton.download = "${filename}";    
      downloadButton.click();
      
      screenStream.getTracks().forEach(track => track.stop());
      dest.stream.getTracks().forEach(track => track.stop());
    });
  `;
  
  await driver.executeScript(script);
  await driver.sleep(65000); // Wait for recording to complete (60s + 5s buffer)
  
  return recordingPath;
}