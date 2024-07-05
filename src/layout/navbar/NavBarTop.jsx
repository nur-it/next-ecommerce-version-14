import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";

//internal import

import LogoutButton from "@components/navbar/LogoutButton";
import { showingTranslateValue } from "@lib/translate";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const NavBarTop = async () => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <div className="hidden lg:block max-w-screen-4xl mx-auto  px-4 sm:px-10 bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="text-gray-700 py-2 font-sans text-xs font-medium border-b flex justify-between items-center">
            <span className="flex items-center">
              <FiPhoneCall className="mr-2" />
              {showingTranslateValue(
                storeCustomizationSetting?.navbar?.help_text
              )}
              Call Us :
              <a
                href={`tel:${
                  storeCustomizationSetting?.navbar?.phone_number ||
                  "+099949343"
                }`}
                className="font-bold text-emerald-700 ml-1"
              >
                {storeCustomizationSetting?.navbar?.phone_number ||
                  "+099949343"}
              </a>
            </span>

            <div className="lg:text-right flex items-center navBar">
              {storeCustomizationSetting?.navbar?.about_menu_status && (
                <div>
                  <Link
                    href="/about-us"
                    className="font-medium hover:text-emerald-600"
                  >
                    {showingTranslateValue(
                      storeCustomizationSetting?.navbar?.about_us
                    )}
                  </Link>
                  <span className="mx-2">|</span>
                </div>
              )}

              {storeCustomizationSetting?.navbar?.contact_menu_status && (
                <div>
                  <Link
                    href="/contact-us"
                    className="font-medium hover:text-emerald-600"
                  >
                    {showingTranslateValue(
                      storeCustomizationSetting?.navbar?.contact_us
                    )}
                  </Link>
                  <span className="mx-2">|</span>
                </div>
              )}

              <LogoutButton
                storeCustomizationSetting={storeCustomizationSetting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarTop;
