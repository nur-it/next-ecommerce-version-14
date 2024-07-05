"use client";
import Link from "next/link";
import { FiMail } from "react-icons/fi";

//internal import
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";

const ResetPassword = ({
  setModalOpen,
  setShowResetPassword,
  storeCustomizationSetting,
}) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit(setModalOpen);

  return (
    <>
      <div className="text-center mb-6">
        <Link href="/" className="text-3xl font-bold font-serif">
          Forget Password
        </Link>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Reset Your Password
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <InputArea
              register={register}
              label="Email"
              name="verifyEmail"
              type="email"
              placeholder="Your Register Email"
              Icon={FiMail}
            />
            <Error errorName={errors.verifyEmail} />
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline focus:outline-none hover:bg-white"
              >
                Forgot password?
              </button>
            </div>
          </div> */}

          {loading ? (
            <button
              disabled={loading}
              type="submit"
              style={{
                backgroundColor:
                  storeCustomizationSetting?.color?.bg_button?.hex,
              }}
              className={`bg-gray-800 text-white hover:bg-gray-900 w-full text-center py-3 rounded transition-all focus:outline-none my-1`}
            >
              <img
                src="/loader/spinner.gif"
                alt="Loading"
                width={20}
                height={10}
                className="my-auto"
              />
              <span className="font-serif ml-1 font-light">Processing</span>
            </button>
          ) : (
            <button
              type="submit"
              style={{
                backgroundColor:
                  storeCustomizationSetting?.color?.bg_button?.hex,
              }}
              className={`bg-gray-800 text-white hover:bg-gray-900 w-full text-center py-3 rounded transition-all focus:outline-none my-1`}
            >
              Recover password
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
