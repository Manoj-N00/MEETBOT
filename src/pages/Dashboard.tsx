import React from 'react';
import { Video, Clock, Calendar, Play, Download, Trash2, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const recordings = [
  {
    id: 1,
    title: 'Weekly Team Sync',
    date: '2024-03-15',
    duration: '45:32',
    status: 'completed',
    participants: ['John D.', 'Sarah M.', 'Mike R.'],
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    title: 'Product Review',
    date: '2024-03-14',
    duration: '32:15',
    status: 'completed',
    participants: ['Alex K.', 'Emma S.'],
    thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Client Meeting',
    date: '2024-03-13',
    duration: '28:45',
    status: 'completed',
    participants: ['David L.', 'Rachel P.', 'Tom H.'],
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop&q=60'
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black border-b border-white/5 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent opacity-50" />
        <div className="relative container mx-auto px-4 pt-12 pb-24">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
              Your Meetings,<br />Intelligently Captured
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Record, transcribe, and share your Google Meet conversations with ease. Never miss an important detail again.
            </p>
            <Link
              to="/new"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-violet-500 text-white hover:bg-violet-600 
                       transition-all duration-300 text-lg font-medium shadow-lg shadow-violet-500/25"
            >
              <Video className="h-5 w-5 mr-2" />
              Start Recording
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20">
        {/* Search and Filter Bar */}
        <div className="bg-secondary rounded-xl p-4 mb-8 border border-white/5 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search recordings..."
                className="w-full pl-10 pr-4 py-2 bg-black/50 rounded-lg border border-white/10 focus:border-violet-500/50 
                         focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-black 
                           transition-all border border-white/10">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Recordings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recordings.map((recording) => (
            <div 
              key={recording.id} 
              className="group bg-secondary rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] 
                       border border-white/5 hover:border-violet-500/20 shadow-lg hover:shadow-xl"
            >
              <div className="aspect-video relative">
                <img 
                  src={recording.thumbnail} 
                  alt={recording.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              flex items-center justify-center backdrop-blur-sm">
                  <button className="p-4 bg-violet-500 rounded-full hover:bg-violet-600 transition-all duration-300 
                                   transform hover:scale-110">
                    <Play className="h-6 w-6 text-white" fill="currentColor" />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                    {recording.title}
                  </h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-violet-500/20 text-violet-400 border border-violet-500/20">
                    {recording.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {recording.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recording.duration}
                  </div>
                </div>

                <div className="flex -space-x-2 mb-4">
                  {recording.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-secondary flex items-center justify-center"
                    >
                      <span className="text-xs text-violet-400 font-medium">
                        {participant.split(' ')[0][0]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 flex items-center justify-center px-4 py-2 rounded-lg bg-violet-500/10 text-violet-400 
                                   hover:bg-violet-500/20 transition-colors border border-violet-500/20">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}