"use client";
// import { signIn } from "next-auth/react";

const LoginWithGoogleBtn = () => {
  // handle google login

  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-gray-300 h-12 px-4 py-2 w-full bg-emerald-500 hover:bg-transparent text-white hover:text-black">
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 mr-2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="21.17" x2="12" y1="8" y2="8"></line>
          <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
          <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
        </svg>
        Login with Google
      </div>
    </button>
  );
};

export default LoginWithGoogleBtn;
