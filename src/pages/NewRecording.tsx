import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Link as LinkIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewRecording() {
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingUrl }),
      });

      if (!response.ok) throw new Error('Failed to start recording');

      navigate('/');
    } catch (error) {
      console.error('Recording error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="relative overflow-hidden bg-black border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent opacity-50" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-500/10 mb-6 
                       border border-violet-500/20">
            <Video className="h-10 w-10 text-violet-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
            Start New Recording
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enter your Google Meet URL below and we'll handle the rest
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-secondary rounded-xl p-8 shadow-xl border border-white/5">
            <div className="mb-8">
              <label htmlFor="meetingUrl" className="block text-lg font-medium text-white mb-2">
                Meeting URL
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-violet-400" />
                </div>
                <input
                  type="url"
                  id="meetingUrl"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-black border border-white/10 rounded-lg 
                           focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/20 transition-all
                           text-white placeholder-gray-500 text-lg"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 rounded-lg text-white 
                       bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 
                       focus:ring-violet-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       text-lg font-medium shadow-lg shadow-violet-500/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Starting Recording...
                </>
              ) : (
                <>
                  <Video className="h-5 w-5 mr-2" />
                  Start Recording
                </>
              )}
            </button>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-white/5">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-violet-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Automatic Transcription</h3>
                  <p className="text-sm text-gray-400">Get searchable text from your meetings</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-violet-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Smart Summaries</h3>
                  <p className="text-sm text-gray-400">AI-generated meeting highlights</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-violet-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Instant Sharing</h3>
                  <p className="text-sm text-gray-400">Share recordings with your team</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-violet-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Cloud Storage</h3>
                  <p className="text-sm text-gray-400">Secure & reliable storage</p>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              By starting a recording, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}