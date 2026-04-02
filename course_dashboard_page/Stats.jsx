import { BookOpen, CheckCircle2 } from 'lucide-react';

const loaderSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24.014 1C11.303 1 .999 11.304.999 24.015c0 11.235 8.05 20.588 18.697 22.61c1.247.237 2.317-.748 2.317-1.944v-4.402c0-.97-.685-1.755-1.565-1.974c-6.41-1.594-11.16-7.389-11.16-14.29c0-8.133 6.593-14.725 14.726-14.725c6.984 0 12.834 4.863 14.345 11.39c.207.893.998 1.597 1.982 1.597h4.387c1.187 0 2.167-1.054 1.948-2.294C44.77 9.195 35.35 1 24.014 1m9.92 36.026c-.678-.679-1.706-.756-2.48-.301a14.6 14.6 0 0 1-3.876 1.58c-.88.219-1.564 1.004-1.564 1.974v4.402c0 1.196 1.07 2.18 2.317 1.944a22.9 22.9 0 0 0 8.446-3.456c1.062-.709 1.129-2.172.278-3.023zm4.317-9.239c.237-.854 1.011-1.51 1.96-1.51h4.418c1.205 0 2.194 1.086 1.939 2.34a22.85 22.85 0 0 1-3.631 8.5c-.72 1.038-2.163 1.092-3.004.251l-3.105-3.105c-.687-.687-.757-1.727-.288-2.503v-.001l.024-.042a47 47 0 0 0 .37-.672c.226-.418.47-.888.602-1.193c.133-.306.31-.813.461-1.272a44 44 0 0 0 .24-.746z" clipRule="evenodd"/></svg>
);

function StatCard({ icon: Icon, iconColor, iconFill, label, num }) {
    return(
        <div className="flex bg-white px-4 py-8 pb-4 gap-4 rounded-lg max-sm:bg-transparent max-sm:border max-sm:border-gray-300">
            <div className={`${iconColor}`}>
                <Icon size={36} fill={iconFill} />
            </div>
            <div className="flex flex-col text-gray-500 text-lg font-semibold max-md:text-sm max-sm:text-lg">
                {label}
                <div className="text-gray-900">
                    {num}
                </div>
            </div>
        </div>
    )
}

export default function Stats() {
    return(
        <div>
            <div className="p-4">
                <h2 className="text-black text-2xl font-semibold">Progress</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 max-sm:flex max-sm:flex-col">
                <StatCard label="Total Course Enrolled" num="8" icon={BookOpen} iconColor="text-gray-500" iconFill="none" />
                <StatCard label="Courses Completed" num="3" icon={CheckCircle2} iconColor="text-white" iconFill="#037350" />
                <StatCard label="Ongoing Courses" num="5" icon={loaderSVG} iconColor="text-primary" />
            </div>
        </div>
    )
}