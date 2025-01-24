import express from 'express';
import cors from 'cors';
import path from 'path';
import { startRecording } from './recorder.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve recordings statically
app.use('/recordings', express.static(path.join(process.cwd(), 'recordings')));

app.post('/api/record', async (req, res) => {
  const { meetingUrl } = req.body;
  
  try {
    const recording = await startRecording(meetingUrl);
    res.json({ 
      success: true, 
      recording: {
        ...recording,
        url: `/recordings/${path.basename(recording.path)}`
      }
    });
  } catch (error) {
    console.error('Recording failed:', error);
    res.status(500).json({ success: false, error: 'Recording failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});