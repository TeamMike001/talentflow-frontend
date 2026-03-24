'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PasswordSuccessPage() {
  const router = useRouter();

  const handleDone = () => {
    router.push('/signin');
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-20 rounded-full flex items-center justify-center">
            <CheckCircle size={80} className="text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-primary mb-3 text-[21px]">
          Password Changed Successfully!
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Your security has been updated.
        </p>

        <button
          onClick={handleDone}
          className="w-full py-3 bg-primary text-white font-semibold rounded-lg text-sm"
        >
          Done
        </button>
      </div>
    </main>
  );
}