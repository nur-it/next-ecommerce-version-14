"use client";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiUnlock } from "react-icons/fi";
import { IoLockOpenOutline } from "react-icons/io5";

const Logout = ({ userDashboard, storeCustomizationSetting }) => {
  const router = useRouter();

  const { showingTranslateValue } = useUtilsFunction();

  // handle logout
  const handleLogOut = () => {
    router.push("/");
    signOut({ redirect: false });
  };

  return userDashboard ? (
    <div className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
      <span className="mr-2">
        <FiUnlock />
      </span>

      <button
        onClick={handleLogOut}
        className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
      >
        {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogOut}
      className="flex items-center font-medium hover:text-emerald-600"
    >
      <span className="mr-1">
        <IoLockOpenOutline />
      </span>
      {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
    </button>
  );
};

export default Logout;
