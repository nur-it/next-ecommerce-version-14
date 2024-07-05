import Link from "next/link";

//internal import
import NavbarPromo from "@layout/navbar/NavbarPromo";
import {
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";
import NotifyIcon from "@components/navbar/NotifyIcon";
import ProfileDropDown from "@components/navbar/ProfileDropDown";
import SearchInput from "@components/navbar/SearchInput";

const Navbar = async () => {
  // api calling
  const { globalSetting } = await getGlobalSetting();
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  const currency = globalSetting?.default_currency || "$";

  return (
    <div className="bg-gray-800 sticky top-0 z-20">
      <header
        as="header"
        style={{
          backgroundColor:
            storeCustomizationSetting?.color?.bg_header_middle?.hex,
        }}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
          <div className="relative flex h-20 justify-between">
            <div className="relative z-10 hidden sm:flex px-2 lg:px-0">
              <Link href="/" className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="/logo/logo-light.svg"
                  alt="CloudClever"
                />
              </Link>
            </div>

            {/* search input section */}
            <div className="min-w-0 flex-1 md:px-8 lg:px-10 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <SearchInput />
                </div>
              </div>
            </div>

            {/* notification icons */}
            <div className="lg:relative lg:z-10 sm:flex sm:items-center hidden">
              <NotifyIcon currency={currency} />

              {/* Profile dropdown */}
              <div className="relative ml-4 flex-shrink-0">
                <ProfileDropDown />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* second header */}
      <NavbarPromo storeCustomizationSetting={storeCustomizationSetting} />
    </div>
  );
};

export default Navbar;
