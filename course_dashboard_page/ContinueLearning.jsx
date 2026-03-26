const VSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.85 2L9.09 9.77l-4.9-3.86L2.05 7v10l2.15 1.09l4.93-3.85L16.87 22L22 19.93V4ZM4.37 14.3V9.65l2.44 2.43Zm12.33 1.29L12.05 12l4.65-3.59Z"/></svg>
);

const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.272 1v2.65l6.613 3.89v7.745l2.465 1.295l-.93 1.77l-2.507-1.317l-5.641 3.317V23h-2v-2.65l-5.69-3.346l-3.12 1.304l-.77-1.845l2.967-1.24V7.539l6.613-3.889V1zm-2 17.03v-5.458L6.66 9.859v5.458z"/></svg>
);

const OrbitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11.422 7.378c.273-.252.41-.378.578-.378s.305.126.578.378l.466.43c.143.133.215.199.306.227c.092.028.19.015.388-.012l.642-.086c.376-.051.565-.076.7.018c.137.094.17.273.235.63l.112.609c.035.188.052.281.109.356c.056.074.144.118.32.208l.573.29c.336.17.504.254.556.407s-.032.315-.199.641l-.284.556c-.088.17-.132.256-.132.348s.044.177.132.348l.284.556c.167.326.25.489.199.641c-.052.153-.22.238-.556.408l-.573.29c-.176.089-.264.133-.32.207c-.057.075-.074.168-.109.356l-.112.609c-.065.357-.098.536-.234.63s-.325.069-.701.018l-.642-.086c-.197-.027-.296-.04-.388-.012c-.091.028-.163.095-.306.227l-.466.43c-.273.252-.41.378-.578.378s-.305-.126-.578-.378l-.466-.43c-.143-.133-.215-.199-.306-.227c-.092-.028-.19-.015-.388.012l-.642.086c-.376.051-.565.076-.7-.018c-.137-.094-.17-.273-.235-.63l-.112-.609c-.035-.187-.052-.281-.108-.355c-.057-.075-.145-.12-.321-.209l-.573-.29c-.336-.17-.504-.254-.556-.407s.032-.315.199-.641l.284-.556c.088-.17.132-.256.132-.348s-.044-.177-.132-.348l-.284-.556c-.167-.326-.25-.489-.199-.641c.052-.153.22-.238.556-.408l.573-.29c.176-.089.264-.133.32-.207c.057-.075.074-.168.109-.356l.112-.609c.065-.357.098-.536.234-.63s.325-.069.701-.018l.642.086c.197.027.296.04.388.012c.091-.028.163-.094.306-.227z"/><path strokeLinecap="round" d="M6.483 3.658a2 2 0 1 0-2.825 2.825m2.825-2.825a2 2 0 0 1-2.825 2.825m2.825-2.825A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10a9.95 9.95 0 0 1-1.647 5.5M3.658 6.483A9.95 9.95 0 0 0 2 12c0 5.523 4.477 10 10 10a9.95 9.95 0 0 0 5.517-1.658m0 0a2 2 0 1 0 2.966-2.684a2 2 0 0 0-2.966 2.684Z"/></g></svg>
);

function ProgressCard({ title, lesson, progress, status, icon: Icon, iconColor, bgColor }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 ${bgColor} rounded-xl ${iconColor}`}><Icon size={28} /></div>
        <span className="text-sm font-bold px-3 py-1 bg-gray-100 text-gray-500 uppercase">
          {status}
        </span>
      </div>
      <h4 className="font-bold text-gray-900 text-base mb-3">{title}</h4>
      <p className="text-sm text-gray-900 mb-4">{lesson}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-bold text-gray-900">
          <span>Completion</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-600 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function ContinueLearning() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-black whitespace-nowrap">Continue Learning</h2>
        <div className="h-px bg-black w-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCard title="Foundations of User Centered Design" lesson="Lesson 5 of 24 • 10h 24m left" progress={35} status="In Progress" icon={VSIcon} iconColor="text-white" bgColor="bg-primary" />
        <ProgressCard title="Intro to Data Science and Machine Learning" lesson="Lesson 15 of 24 • 5h left" progress={75} status="In Progress" icon={SystemIcon} iconColor="text-white" bgColor="bg-orange" />
        <ProgressCard title="Principles of User-Focused Design" lesson="Prerequisite: Intro to Figma" progress={0} status="Next Up" icon={OrbitIcon} iconColor="text-white" bgColor="bg-[#9632DC]" />
      </div>
    </section>
  );
}