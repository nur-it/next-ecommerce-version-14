// internal imports
import UserReviews from "@components/order/UserReviews";
import { getUserServerSession } from "@lib/auth-server";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const Reviews = async () => {
  // user cookies data
  const userInfo = await getUserServerSession();

  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <UserReviews
        userInfo={userInfo}
        storeCustomizationSetting={storeCustomizationSetting}
      />
    </>
  );
};

export default Reviews;
