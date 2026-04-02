import { BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
const WebDesign = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1"><path strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"/><path strokeLinejoin="round" strokeWidth="1.5" d="M2.5 9h19"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 13h4m-4 4h2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6h.009M11 6h.009"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 9v12.5"/></g></svg>
);

const CertSVG =() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32"><path fill="currentColor" d="M16 3c-.625 0-1.246.21-1.781.594L12.563 4.75L10.655 5h-.031l-.031.031A3.39 3.39 0 0 0 8.03 7.594L8 7.625v.031l-.25 1.938l-1.156 1.5l-.032.031v.031c-.699 1.117-.73 2.559.032 3.625l1.187 1.656l.313 1.72l-3.219 4.905l-1.031 1.532h4.781l1.156 2.687L10.5 29l1.031-1.563l3.156-4.75c.848.348 1.805.38 2.626 0l3.156 4.75L21.5 29l.719-1.719l1.156-2.687h4.781l-1.031-1.532L24 18.313l.25-1.875l1.156-1.656l.032-.031v-.031c.699-1.117.73-2.528-.032-3.594L24.25 9.469l-.375-1.875h.031c-.004-.024-.027-.04-.031-.063c-.18-1.308-1.215-2.37-2.531-2.531h-.032l-1.875-.25l-1.656-1.156A3.07 3.07 0 0 0 16 3m0 2.031c.23 0 .457.07.625.188L18.406 6.5l.219.156l.25.032L21.063 7h.03c.45.05.762.363.813.813v.062l.407 2.219l.03.219l.157.187l1.281 1.781c.239.332.27.895-.031 1.375l-1.406 1.969l-.032.25L22 18.063v.03a1 1 0 0 1-.156.438l-.063.032v.03a.88.88 0 0 1-.593.313h-.063l-2.281.407l-.25.03l-.188.157l-1.781 1.281c-.332.239-.926.27-1.406-.031l-1.625-1.25l-.188-.156l-.281-.032L10.937 19h-.03a.89.89 0 0 1-.688-.438a1 1 0 0 1-.125-.375v-.062l-.406-2.281l-.032-.25l-.156-.188l-1.281-1.781c-.239-.332-.27-.926.031-1.406l1.25-1.625l.156-.188l.031-.281l.282-2.094c.004-.015.027-.015.031-.031a1.4 1.4 0 0 1 1-1c.016-.004.016-.027.031-.031l2.094-.282l.25-.03l.219-.157l1.781-1.281c.168-.117.395-.188.625-.188m6.906 15.219l1.532 2.344H22.03l-.25.625l-.687 1.593l-2.125-3.25l.468-.343l1.97-.344v.031c.023-.004.038-.027.062-.031a2.97 2.97 0 0 0 1.437-.625zm-13.812.031a2.85 2.85 0 0 0 1.562.719h.031l1.907.25l.437.344l-2.125 3.218l-.687-1.593l-.25-.625H7.563z"/></svg>
);

const ReloadSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 16h5v5M10 8H5V3m14.418 6.003A8 8 0 0 0 5.086 7.976m-.504 7.021a8 8 0 0 0 14.331 1.027"/></svg>
);

function ProgressCard({ icon: Icon, iconColor, iconFill, label, btnColor, progress, progressColor, btnDisabled, btnBorder, btnText }) {
    return(
        <div className="flex items-center gap-4 p-5 border-t border-gray-300 w-full max-sm:border-none max-sm:p-2">
            <div className={`flex p-2 ${iconColor} bg-gray-100 rounded-lg`}>
                <Icon size={36} fill={iconFill}/>
            </div>
            <div className="flex w-full gap-4">
                <div className="flex flex-col gap-4 w-full text-black text-lg font-semibold max-md:text-base max-sm:text-sm">
                    {label}
                    <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div className={`h-full ${progressColor} rounded-full transition-all`} style={{ width: `${progress}%` }} />
                    </div>
                </div>
                <div className="flex items-end">            
                    <button className={`py-2 px-6 max-sm:py-1 max-sm:px-4 ${btnColor} rounded-lg border font-semibold text-base ${btnBorder} ${btnText} ${btnDisabled ? 'disabled:' : ''} max-md:text-sm max-sm:text-xs`}>{btnDisabled ? 'Completed' : 'Continue'}</button>
                </div>
            </div>
        </div>
    )
}

function CircularProgress({ percentage = 75 }) {
  const size = 100; 
  const strokeWidth = 8;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full mb-4 aspect-square relative mx-auto bg-white p-4 rounded-lg max-sm:bg-transparent max-sm:border max-sm:border-gray-300">
      <svg
        viewBox={`0 0 ${size} ${size}`} // This makes the SVG fluid
        className="w-full h-full transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          className="text-emerald-50"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress Circle */}
        <circle
          className="text-emerald-500 transition-all duration-1000 ease-in-out"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>

      {/* Text Overlay - Uses responsive text sizes */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-5xl max-lg:text-4xl max-md:text-2xl font-black text-gray-900 leading-none">
          {percentage}%
        </span>
        <span className="text-xl max-lg:text-lg max-md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">
          Completed
        </span>
      </div>
    </div>
  );
}

export default function Progress() {
    return(
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
            {/* Left: Course Progress */}
            <div className="col-span-2 max-sm:mb-4">
                {/* Progress */}
                <div className="bg-white rounded-lg mb-4 max-sm:bg-transparent max-sm:border max-sm:border-gray-300">
                    <div className="pt-4 px-4">
                        <h3 className="text-black text-2xl font-bold mt-1 max-md:text-xl">Your Course Progress</h3>
                    </div>
                    <div>
                        <ProgressCard icon={BookOpen} label="UI/UX Design" iconColor="text-gray-500" iconFill="none" progress={80} progressColor="bg-primary" btnDisabled={false} btnColor="bg-primary" btnBorder="border-none" btnText="text-white" />
                        <ProgressCard icon={ReloadSVG} label="Frontend Fundamentals" iconColor="text-gray-400" iconFill="none" progress={20} progressColor="bg-[#22B286]" btnDisabled={false} btnColor="bg-white" btnBorder="border-gray-300" btnText="text-primary" />
                        <ProgressCard icon={CheckCircle2} label="Database Management" iconColor="text-white" iconFill="#037350" progress={100} progressColor="bg-[#22B286]" btnDisabled={true} btnColor="bg-gray-100" btnBorder="border-none" btnText="text-gray-400" />
                        <ProgressCard icon={CheckCircle2} label="Digital Marketing" iconColor="text-white" iconFill="#1E6DC6" progress={60} progressColor="bg-[#FFD700]" btnDisabled={false} btnColor="bg-primary" btnBorder="border-none" btnText="text-white" />
                    </div>
                </div>
                {/* Recent Courses */}
                <div className="bg-white rounded-lg px-8 pt-6 pb-12 max-sm:bg-transparent max-sm:border max-sm:border-gray-300 max-sm:pt-4 max-sm:px-6 max-sm:pb-8">
                    <h3 className=" text-gray-400 text-2xl font-bold mb-6 max-md:text-xl max-sm:mb-4">Recent Courses</h3>
                    <div className="flex gap-3 border border-gray-300 rounded-lg p-3">
                        <div className="text-[#D3E1F1]">
                            <WebDesign />
                        </div>
                        <div className="flex flex-col gap-3 text-black text-lg font-semibold w-full max-md:text-base max-sm:text-sm">
                            <div className="flex justify-between">
                                UI/UX Design
                                <button className="flex gap-2 items-center text-gray-400 text-sm max-sm:text-xs">25/100 <ChevronRight size={18} /></button>
                            </div>
                            <div>
                                <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full transition-all w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Achievement */}
            <div>
                {/* Completion Progress */}
                <CircularProgress percentage={75} />
                {/* Achievement */}
                <div className="bg-white rounded-lg py-6 px-4 pb-2 max-sm:bg-transparent max-sm:border max-sm:border-gray-300">
                    <h3 className="text-black text-2xl font-semibold mb-10 max-lg:mb-8 max-md:text-xl">Achievements</h3>
                    <div className="flex gap-2 mb-10 max-lg:mb-8">
                        <div className="text-white p-2 bg-gray-100 rounded-lg h-fit">
                            <CheckCircle2 size={36} fill="#037350" />
                        </div>
                        <div className="text-base font-semibold max-md:text-sm">
                            <p className="text-black">UI Basics Completed</p>
                            <p className="text-gray-400 text-sm max-md:text-xs">Completed UI/UX Design course</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-10 max-lg:mb-8">
                        <div className="text-[#FFD700] p-2 bg-gray-100 rounded-lg h-fit">
                            <CertSVG />
                        </div>
                        <div className="text-base font-semibold max-md:text-sm">
                            <p className="text-black">50 Lessons Completed</p>
                            <p className="text-gray-400 text-sm max-md:text-xs">You have completed 50 lessons.</p>
                        </div>
                    </div>
                    <div className="flex text-sm text-primary gap-2 items-center justify-end cursor-pointer">View All <span className="text-gray-400"><ChevronRight size={18} /></span></div>
                </div>
            </div>
        </div>
    )
}