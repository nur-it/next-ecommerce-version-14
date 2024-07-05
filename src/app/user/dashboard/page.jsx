import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";

// internal imports
import Card from "@components/order-card/Card";
import RecentOrder from "@components/order/RecentOrder";
import { getCname, getUserServerSession } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import { getOrderByCustomer } from "@services/OrderServices";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const Dashboard = async ({ searchParams }) => {
  const cname = getCname();

  // user cookies data
  const userInfo = await getUserServerSession();
  const { page, query } = searchParams;

  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { data, error } = await getOrderByCustomer({
    cname,
    limit: 8,
    sellFrom: "SHOP",
    user: userInfo?._id,
  });

  // console.log("data", data);

  return (
    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
      <div className="overflow-hidden">
        <h2 className="text-xl font-semibold mb-5">
          {showingTranslateValue(
            storeCustomizationSetting?.dashboard?.dashboard_title
          )}
        </h2>
        <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card
            title={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.total_order
            )}
            Icon={FiShoppingCart}
            quantity={data?.totalDoc}
            className="text-red-600  bg-red-200"
          />
          <Card
            title={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.pending_order
            )}
            Icon={FiRefreshCw}
            quantity={data?.pending}
            className="text-orange-600 bg-orange-200"
          />
          <Card
            title={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.processing_order
            )}
            Icon={FiTruck}
            quantity={data?.processing}
            className="text-indigo-600 bg-indigo-200"
          />
          <Card
            title={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.complete_order
            )}
            Icon={FiCheck}
            quantity={data?.delivered}
            className="text-emerald-600 bg-emerald-200"
          />
        </div>
        <RecentOrder
          data={data}
          error={error}
          storeCustomizationSetting={storeCustomizationSetting}
        />
      </div>
    </div>
  );
};

export default Dashboard;
