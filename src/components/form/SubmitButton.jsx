"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          disabled={pending}
          type="submit"
          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
        >
          <img src="/loader/spinner.gif" alt="Loading" width={20} height={10} />
          <span className=" ml-2 font-light">Processing</span>
        </button>
      ) : (
        <button
          disabled={pending}
          type="submit"
          className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
        >
          {text}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
