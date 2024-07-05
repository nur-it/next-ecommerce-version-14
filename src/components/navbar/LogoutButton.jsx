"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUnlock, FiUser } from "react-icons/fi";

//internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth-client";

const LogoutButton = ({ storeCustomizationSetting }) => {
  const router = useRouter();
  const userInfo = getUserSession();
  const { showingTranslateValue } = useUtilsFunction();

  const handleLogout = () => {
    router.push("/");
    signOut({ redirect: false });
  };

  return (
    <>
      <Link
        href={`${userInfo ? "/user/my-account" : "/auth/login"}`}
        className="font-medium hover:text-emerald-600"
      >
        {showingTranslateValue(storeCustomizationSetting?.navbar?.my_account)}
      </Link>
      <span className="mx-2">|</span>
      {userInfo?.email ? (
        <button
          onClick={handleLogout}
          type="submit"
          className="flex items-center font-medium hover:text-emerald-600"
        >
          <span className="mr-1">
            <FiUnlock />
          </span>
          {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
        </button>
      ) : (
        <Link
          href="/auth/login"
          className="flex items-center font-medium hover:text-emerald-600"
        >
          <span className="mr-1">
            <FiUser />
          </span>

          {showingTranslateValue(storeCustomizationSetting?.navbar?.login)}
        </Link>
      )}
    </>
  );
};

export default LogoutButton;
