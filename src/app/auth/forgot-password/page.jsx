import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { redirect } from "next/navigation";

// internal imports
import { getUserServerSession } from "@lib/auth-server";
import ResetPasswordForm from "@components/userForm/ResetPasswordForm";

const ResetPassword = async () => {
  const { t } = useTranslation();
  const userInfo = await getUserServerSession();

  if (userInfo) {
    return redirect("/");
  }

  return (
    <section className="py-10 lg:py-20 px-5">
      <div className="container max-w-screen-sm mx-auto px-3 sm:px-10 md:py-10 py-5 border border-gray-300 rounded-md shadow shadow-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-serif">Forget Password</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
            Reset Your Password
          </p>
        </div>

        <ResetPasswordForm />

        <div className="text-center text-sm text-gray-900 mt-4">
          <div className="text-gray-500 mt-2.5">
            {t("common:notAccount")}

            <Link
              href={"/auth/signup"}
              className="text-gray-800 hover:text-emerald-500 font-bold mx-2"
            >
              {t("common:register")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
