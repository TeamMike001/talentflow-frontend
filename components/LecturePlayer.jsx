// components/LecturePlayer.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Play, Pause, Volume2, VolumeX, Maximize, FileText, ExternalLink } from 'lucide-react';
import { progressService } from '@/services/progressService';

const normalizeVideoUrl = (url = '') => {
  if (!url) return { type: 'none', src: '' };

  const trimmed = url.trim();

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    if (host.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) {
        return { type: 'embed', src: `https://www.youtube.com/embed/${videoId}` };
      }
    }

    if (host.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '');
      if (videoId) {
        return { type: 'embed', src: `https://www.youtube.com/embed/${videoId}` };
      }
    }

    if (host.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop();
      if (videoId) {
        return { type: 'embed', src: `https://player.vimeo.com/video/${videoId}` };
      }
    }

    return { type: 'video', src: trimmed };
  } catch {
    return { type: 'video', src: trimmed };
  }
};

export default function LecturePlayer({ courseId, lectureId, lectureTitle, videoUrl, lectureNotes, onComplete }) {
  const [isWatched, setIsWatched] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [watchPercentage, setWatchPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarking, setIsMarking] = useState(false);
  const videoRef = useRef(null);
  const normalizedVideo = normalizeVideoUrl(videoUrl);
  const hasVideo = normalizedVideo.type !== 'none';
  const hasNotes = Boolean(lectureNotes?.trim());

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
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {hasVideo ? (
        <div className="bg-black">
          <div className="relative">
            {normalizedVideo.type === 'video' && isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
              </div>
            )}

            {normalizedVideo.type === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src={normalizedVideo.src}
                  className="w-full"
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedMetadata={handleVideoLoad}
                  onClick={togglePlay}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity hover:opacity-100">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="text-white transition-colors hover:text-blue-400">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button onClick={toggleMute} className="text-white transition-colors hover:text-blue-400">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="flex-1">
                      <div className="h-1 w-full rounded-full bg-gray-600">
                        <div
                          className="h-1 rounded-full bg-blue-500 transition-all"
                          style={{ width: `${watchPercentage}%` }}
                        />
                      </div>
                    </div>
                    <button onClick={handleFullscreen} className="text-white transition-colors hover:text-blue-400">
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="aspect-video w-full bg-gray-950">
                <iframe
                  src={normalizedVideo.src}
                  title={lectureTitle}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-b bg-gray-50 p-6">
          <div className="flex items-start gap-3 text-gray-700">
            <FileText size={22} className="mt-0.5 text-blue-600" />
            <div>
              <p className="font-semibold">Reading lesson</p>
              <p className="mt-1 text-sm text-gray-500">
                This lesson does not have a video. Students can read the notes below and then mark it as completed.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 border-t p-4">
        <div>
          <h3 className="font-semibold text-gray-900">{lectureTitle}</h3>
          <p className="mt-1 text-xs text-gray-500">
            {isWatched ? (
              <span className="text-green-600">Completed</span>
            ) : (
              <span className="text-yellow-600">Not completed yet</span>
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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isMarking ? 'Marking...' : hasVideo ? 'Mark as Completed' : 'Mark reading as done'}
          </button>
        )}
      </div>

      {hasNotes && (
        <div className="border-t bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              <h4 className="font-semibold text-gray-900">Lesson Notes</h4>
            </div>
            {normalizedVideo.type === 'embed' && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Open source video <ExternalLink size={14} />
              </a>
            )}
          </div>
          <div className="mt-3 whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-700">
            {lectureNotes}
          </div>
        </div>
      )}

      {!hasNotes && !hasVideo && (
        <div className="border-t bg-amber-50 p-4 text-sm text-amber-700">
          No video or notes were added to this lesson yet.
        </div>
      )}
    </div>
  );
}
