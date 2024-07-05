import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";
// internal imports
import BottomNavigation from "@components/login/BottomNavigation";
import RegisterForm from "@components/userForm/RegisterForm";
import { getUserServerSession } from "@lib/auth-server";

const Register = async () => {
  const { t } = useTranslation();
  const userInfo = await getUserServerSession();

  if (userInfo) {
    return redirect("/");
  }

  return (
    <section className="py-10 lg:py-12 px-5">
      <div className="container mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
        <div className="overflow-hidden mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-serif">
              {t("common:signingUp")}
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
              {t("common:createAccount")}
            </p>
          </div>

          <RegisterForm />

          <BottomNavigation
            or={true}
            route={"/auth/login"}
            pageName={"Sign In"}
            loginTitle="Login"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
