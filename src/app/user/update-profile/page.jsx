// internal imports
import UserProfileForm from "@components/user-dashboard/UserProfileForm";
import { getCname, getUserServerSession, getUserToken } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const UpdateProfile = async () => {
  // cname
  const cname = getCname();
  // user cookies data
  const userInfo = (await getUserToken()) || (await getUserServerSession());

  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className="text-xl font-serif font-semibold mb-5">
              {showingTranslateValue(
                storeCustomizationSetting?.dashboard?.update_profile
              )}
            </h2>
          </div>
        </div>
      </div>

      <UserProfileForm
        cname={cname}
        userInfo={userInfo}
        storeCustomizationSetting={storeCustomizationSetting}
      />
    </>
  );
};

export default UpdateProfile;
