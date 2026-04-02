import { 
  Star, CirclePlay, MessageCircleMore, UsersRound, 
  BarChartHorizontal, NotepadText, Notebook, Clock3,
  Trophy, ChevronDown, StarHalf,
} from 'lucide-react';

const statItems = [
  { icon: CirclePlay, iconColor: 'text-[#FF6636]', bgColor: 'bg-[#FFEEE8]', label: '1,957', desc: 'Lecture', descM: '(219.3 GB)' },
  { icon: MessageCircleMore, iconColor: 'text-[#564FFD]', bgColor: 'bg-[#EBEBFF]', label: '432', desc: 'Total Commends'  },
  { icon: UsersRound, iconColor: 'text-[#E34444]', bgColor: 'bg-[#FFF0F0]', label: '523', desc: 'Students Enrolled'  },
  { icon: BarChartHorizontal, iconColor: 'text-[#23BD33]', bgColor: 'bg-[#E1F7E3]', label: 'Beginner', desc: 'Course Level'  },
  { icon: NotepadText, iconColor: 'text-[#1D2026]', bgColor: 'bg-[#F5F7FA]', label: 'English', desc: 'Course Language'  },
  { icon: Notebook, iconColor: 'text-[#FD8E1F]', bgColor: 'bg-[#FFF2E5]', label: '23', desc: 'Attach File', descM: '(4.4 GB)' },
  { icon: Clock3, iconColor: 'text-[#564FFD]', bgColor: 'bg-[#EBEBFF]', label: '19:37:51', desc: 'Hours'  },
  { icon: Trophy, iconColor: 'text-[#1D2026]', bgColor: 'bg-[#F5F7FA]', label: '504', desc: 'Students Viewed'  },
];

const starRating = [
  {star: '5', progress: 56},
  {star: '4', progress: 47},
  {star: '3', progress: 8},
  {star: '2', progress: 1},
  {star: '1', progress: '<1'},
];

export default function CourseGrid() {
  const stars = Array(4).fill(null);

  return (
    <div className="relative flex items-center p-12 pt-0 mt-0 gap-6 max-lg:gap-3 max-md:flex-col max-md:p-8 max-sm:p-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {statItems.map((item) => (
          <div key={item.label} className="flex p-6 gap-6 mb-4 border border-gray-300 items-center max-lg:p-3 max-lg:gap-2">
            <div className={`p-3 ${item.iconColor} ${item.bgColor}`}>
              <item.icon size={30} className="max-lg:size-6"/>
            </div>
            <div className="flex flex-col text-2xl text-black font-medium max-lg:text-lg">
              {item.label}
              <div className="text-gray-700 flex text-sm gap-2 max-lg:text-xs max-lg:gap-1">
                {item.desc}
                <div className="text-gray-500">
                  {item.descM}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Section */}
      <div className="flex flex-col border border-gray-300 max-sm:border-none">
        <div className="flex justify-between items-center p-4 text-black text-sm font-semibold border-b border-gray-300">
          Overall Course Rating <span className="flex items-center gap-1 text-gray-400 text-sm font-medium">This week <ChevronDown size={18} /></span>
        </div>
        <div className="flex gap-3 py-4 px-6 border-b border-gray-300">
          {/* Overall Rating */}
          <div className="flex flex-col items-center gap-4 py-4 text-black text-3xl font-bold bg-[#E1EFFE] max-sm:px-2">
            4.6
            <div className="text-orange flex gap-0.5">
              {stars.map((_, i) => <Star key={i} size={18} fill="currentColor" className="size-4" />)}
                <StarHalf size={18} fill="currentColor" className="size-4" />
            </div>
            <p className="text-xs font-medium -mt-2">Overall Rating</p>
          </div>
          {/* Rating Graph */}
          <div className="flex items-end h-full relative w-[390px] max-lg:w-[300px] max-sm:w-[240px]">
            <svg viewBox="0 0 200 80" className="w-full h-full">
              <path 
                d="M0 40 Q 20 10, 40 50 T 80 40 T 120 30 T 160 50 T 200 30" 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M0 40 Q 20 10, 40 50 T 80 40 T 120 30 T 160 50 T 200 30 V 80 H 0 Z" 
                fill="url(#gradient)" 
                fillOpacity="0.1"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Star Rating */}
        <div className="space-y-4 p-4 max-sm:px-0 max-sm:py-2">
            {starRating.map((item) => (
              <div key={item.star} className="flex items-center gap-5 max-sm:gap-3">
                {/* 5 Stars Row */}
                <div className="flex gap-0.5 text-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < item.star ? "currentColor" : "none"} 
                      className={"text-orange size-4"}
                    />
                  ))}
                </div>
                
                <span className="text-sm font-medium text-gray-500 -ml-3 max-sm:-ml-1">{item.star} Star</span>
                
                {/* Progress Bar */}
                <div className="flex-1 h-2 bg-gray-100 overflow-hidden w-80 max-lg:w-52 max-sm:w-40">
                  <div 
                    className="h-full bg-orange transition-all duration-500" 
                    style={{ width: `${item.progress === '<1' ? 0.9 : item.progress}%` }}
                  />
                </div>
                
                <span className="text-sm font-bold text-black text-right">
                  {item.progress}%
                </span>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}