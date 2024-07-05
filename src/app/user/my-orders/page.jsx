// internal imports
import UserOrders from "@components/order/UserOrders";
import { getCname, getUserServerSession } from "@lib/auth-server";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const MyOrders = async () => {
  // cname
  const cname = getCname();
  const userInfo = await getUserServerSession();

  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <UserOrders
        cname={cname}
        userInfo={userInfo}
        storeCustomizationSetting={storeCustomizationSetting}
      />
    </>
  );
};

export default MyOrders;
