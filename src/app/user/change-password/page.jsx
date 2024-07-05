// internal imports
import ChangeUserPassword from "@components/user-dashboard/ChangeUserPassword";
import { getUserServerSession } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const ChangePassword = async () => {
  const userInfo = await getUserServerSession();

  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <h2 className="text-xl font-serif font-semibold mb-5">
        {showingTranslateValue(
          storeCustomizationSetting?.dashboard?.change_password
        )}
      </h2>

      <ChangeUserPassword
        userInfo={userInfo}
        storeCustomizationSetting={storeCustomizationSetting}
      />
    </>
  );
};

export default ChangePassword;
