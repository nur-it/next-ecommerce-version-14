import Link from "next/link";

import {
  FiFileText,
  FiGrid,
  FiHome,
  FiList,
  FiSettings,
  FiUser,
} from "react-icons/fi";

//internal import
import { showingTranslateValue } from "@lib/translate";
import { getStoreCustomizationSetting } from "@services/SettingServices";
import LogoutButton from "./LoginButton";

const Sidebar = async () => {
  const { storeCustomizationSetting, error } =
    await getStoreCustomizationSetting();

  const userSidebar = [
    {
      title: showingTranslateValue(
        storeCustomizationSetting?.dashboard?.dashboard_title
      ),
      href: "/user/dashboard",
      icon: FiGrid,
    },

    {
      title: showingTranslateValue(
        storeCustomizationSetting?.dashboard?.my_order
      ),
      href: "/user/my-orders",
      icon: FiList,
    },
    {
      title: "My Account",
      href: "/user/my-account",
      icon: FiUser,
    },
    {
      title: "Shipping Address",
      href: "/user/shipping-address",
      icon: FiHome,
    },
    {
      title: showingTranslateValue(
        storeCustomizationSetting?.dashboard?.update_profile
      ),
      href: "/user/update-profile",
      icon: FiSettings,
    },
    {
      title: showingTranslateValue(
        storeCustomizationSetting?.dashboard?.change_password
      ),
      href: "/user/change-password",
      icon: FiFileText,
    },
  ];

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
      {userSidebar?.map((item, index) => (
        <span
          key={index + 1}
          className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
        >
          <item.icon className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
          <Link
            href={item.href}
            className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600"
          >
            {item.title}
          </Link>
        </span>
      ))}

      <LogoutButton storeCustomizationSetting={storeCustomizationSetting} />
    </div>
  );
};

export default Sidebar;
