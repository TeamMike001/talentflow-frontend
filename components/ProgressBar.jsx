// components/ProgressBar.jsx
'use client';

export default function ProgressBar({ progress, showLabel = true, size = 'default' }) {
  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getHeight = () => {
    switch(size) {
      case 'small': return 'h-1.5';
      case 'large': return 'h-3';
      default: return 'h-2.5';
    }
  };
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Course Progress</span>
          <span className="text-xs font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getHeight()}`}>
        <div
          className={`${getProgressColor(progress)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {progress >= 100 && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <p className="text-sm text-green-700 font-medium">
            🎉 Congratulations! You've completed this course! 
            <a href="/student/certifications" className="ml-2 text-green-600 underline font-semibold">
              View your certificate →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}