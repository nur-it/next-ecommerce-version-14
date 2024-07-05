"use client";
import useTranslation from "next-translate/useTranslation";
import { useFormState } from "react-dom";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
// internal import
import ButtonLink from "@components/common/ButtonLink";
import Error from "@components/form/Error";
import Label from "@components/form/Label";
import SubmitButton from "@components/form/SubmitButton";
import { verifyEmailAddress } from "@services/CustomerServices";

const RegisterForm = () => {
  const { t } = useTranslation();

  const [state, formAction] = useFormState(verifyEmailAddress, undefined);

  return (
    <form action={formAction} className="flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-5">
        <div>
          <Label label={t("common:name")} />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                <FiUser />
              </span>
            </div>

            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className={
                "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              }
            />
          </div>
          <Error errorName={state?.errors?.name} />
        </div>

        <div>
          <Label label={t("common:email")} />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                <FiMail />
              </span>
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="username"
              className={
                "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              }
            />
          </div>
          <Error errorName={state?.errors?.email} />
        </div>

        <div>
          <Label label={t("common:password")} />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                <FiLock />
              </span>
            </div>

            <input
              name="password"
              type="password"
              placeholder={t("common:password")}
              autoComplete="current-password"
              className={
                "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              }
            />
          </div>
          {/* <Error errorName={state?.errors?.password?.join(" ")} /> */}
          <ul>
            {state?.errors?.password?.map((error) => (
              <li key={error}>
                <Error errorName={error} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex ms-auto">
            <ButtonLink
              url={"/auth/forgot-password"}
              title={t("common:forgotPassword")}
            />
          </div>
        </div>

        <SubmitButton text={t("common:register")} />
      </div>
    </form>
  );
};

export default RegisterForm;
