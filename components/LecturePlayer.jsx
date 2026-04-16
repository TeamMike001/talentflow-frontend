// components/LecturePlayer.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { progressService } from '@/services/progressService';

export default function LecturePlayer({ courseId, lectureId, lectureTitle, videoUrl, onComplete }) {
  const [isWatched, setIsWatched] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [watchPercentage, setWatchPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarking, setIsMarking] = useState(false);
  const videoRef = useRef(null);
  
  // Check if lecture is already watched
  useEffect(() => {
    checkLectureStatus();
  }, [lectureId]);
  
  const checkLectureStatus = async () => {
    try {
      const watched = await progressService.getLectureStatus(lectureId);
      setIsWatched(watched);
    } catch (error) {
      console.error('Failed to check lecture status:', error);
    }
  };
  
  const markAsWatched = async () => {
    if (isWatched || isMarking) return;
    
    setIsMarking(true);
    try {
      await progressService.markLectureComplete(courseId, lectureId);
      setIsWatched(true);
      if (onComplete) onComplete();
      // Trigger course progress update
      window.dispatchEvent(new CustomEvent('progressUpdated', { detail: { courseId } }));
    } catch (error) {
      console.error('Failed to mark lecture as watched:', error);
    } finally {
      setIsMarking(false);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current && !isWatched && !isMarking) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      if (duration > 0) {
        const percentage = (currentTime / duration) * 100;
        setWatchPercentage(percentage);
        
        // Mark as watched after watching 90% of the video
        if (percentage >= 90) {
          markAsWatched();
        }
      }
    }
  };
  
  const handleVideoLoad = () => {
    setIsLoading(false);
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  return (
    <div className="bg-black rounded-xl overflow-hidden">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={handleVideoLoad}
          onClick={togglePlay}
        />
        
        {/* Custom controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-blue-400 transition-colors">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="flex-1">
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all"
                  style={{ width: `${watchPercentage}%` }}
                />
              </div>
            </div>
            <button onClick={handleFullscreen} className="text-white hover:text-blue-400 transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border-t flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{lectureTitle}</h3>
          <p className="text-xs text-gray-500 mt-1">
            {isWatched ? (
              <span className="text-green-600">✓ Completed</span>
            ) : (
              <span className="text-yellow-600">⏳ Not completed yet</span>
            )}
          </p>
        </div>
        
        {isWatched ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : (
          <button
            onClick={markAsWatched}
            disabled={isMarking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMarking ? 'Marking...' : 'Mark as Completed'}
          </button>
        )}
      </div>
    </div>
  );
}