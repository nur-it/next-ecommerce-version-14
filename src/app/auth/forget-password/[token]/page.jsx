"use client";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FiLock } from "react-icons/fi";
// internal imports
import Error from "@components/form/Error";
import Label from "@components/form/Label";
import SubmitButton from "@components/form/SubmitButton";
import { resetPassword } from "@services/CustomerServices";
import { redirect } from "next/navigation";

const ForgetPassword = ({ params }) => {
  const { t } = useTranslation();

  const [state, formAction] = useFormState(resetPassword, {
    token: params.token,
  });

  useEffect(() => {
    if (state?.success) {
      return redirect("/auth/login");
    }
  }, [state?.success]);

  return (
    <section className="py-10 lg:py-20 px-5">
      <div className="container max-w-screen-sm mx-auto px-3 sm:px-10 md:py-10 py-5 border border-gray-300 rounded-md shadow shadow-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-serif">Forget Password</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
            Reset Your Password
          </p>
        </div>

        <form action={formAction} className="flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Label label={t("common:password")} />

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                    <FiLock />
                  </span>
                </div>

                <input
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  className="py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                />
              </div>

              <ul>
                {state?.errors?.newPassword?.map((error) => (
                  <li key={error}>
                    <Error errorName={error} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Label label="Confirm password" />

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                    <FiLock />
                  </span>
                </div>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                />
              </div>

              <ul>
                {state?.errors?.confirmPassword?.map((error) => (
                  <li key={error}>
                    <Error errorName={error} />
                  </li>
                ))}
              </ul>
            </div>

            <SubmitButton text={"Recover password"} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
