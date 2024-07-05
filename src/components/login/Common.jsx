"use client";
import { useState } from "react";
// import { ImFacebook, ImGoogle } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";

//internal import
// import useLoginSubmit from "@hooks/useLoginSubmit";
import useGetSetting from "@hooks/useGetSetting";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

const Common = ({ setModalOpen }) => {
  const { t } = useTranslation();

  const [showRegister, setShowRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // const { handleGoogleSignIn, GoogleLogin } = useLoginSubmit(setModalOpen);

  const { storeCustomizationSetting } = useGetSetting();

  const handleModal = () => {
    setShowRegister(!showRegister);
    setShowResetPassword(false);
  };

  return (
    <>
      <div className="overflow-hidden bg-white mx-auto">
        {showResetPassword ? (
          <ResetPassword
            setModalOpen={setModalOpen}
            setShowResetPassword={setShowResetPassword}
            storeCustomizationSetting={storeCustomizationSetting}
          />
        ) : showRegister ? (
          <Register
            setModalOpen={setModalOpen}
            setShowResetPassword={setShowResetPassword}
            storeCustomizationSetting={storeCustomizationSetting}
          />
        ) : (
          <Login
            setModalOpen={setModalOpen}
            setShowResetPassword={setShowResetPassword}
            storeCustomizationSetting={storeCustomizationSetting}
          />
        )}

        <div className="text-center text-sm text-gray-900 mt-4">
          <div className="text-gray-500 mt-2.5">
            {showRegister
              ? t("common:alreadyHaveAccount")
              : t("common:notAccount")}
            <button
              onClick={handleModal}
              className="text-gray-800 hover:text-emerald-500 font-bold mx-2"
            >
              {showRegister ? t("common:loginBtn") : t("common:register")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
