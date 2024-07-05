"use client";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FiMail } from "react-icons/fi";
// internal imports
import Error from "@components/form/Error";
import Label from "@components/form/Label";
import SubmitButton from "@components/form/SubmitButton";
import { forgetPassword } from "@services/CustomerServices";

const ResetPasswordForm = () => {
  const { t } = useTranslation();

  const [state, formAction] = useFormState(forgetPassword, undefined);

  useEffect(() => {
    if (state?.success) {
      return redirect("/auth/login");
    }
  }, [state?.success]);

  return (
    <form action={formAction} className="flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-5">
        <div>
          <Label label={t("common:email")} />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                <FiMail />
              </span>
            </div>

            <input
              name="verifyEmail"
              type="email"
              placeholder="Your Register Email"
              className={
                "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              }
            />
          </div>
          <Error errorName={state?.errors?.verifyEmail} />
        </div>

        <SubmitButton text={"Recover password"} />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
