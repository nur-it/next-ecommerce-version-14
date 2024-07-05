// internal imports

import SingleOrder from "@components/invoice/SingleOrder";
import { getCname } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import { getOrderById } from "@services/OrderServices";
import {
  getGlobalSetting,
  getPosSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

const Order = async ({ params }) => {
  const cname = getCname();
  console.log(params)

  const { posSetting } = await getPosSetting();
  const { globalSetting } = await getGlobalSetting();
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { singleOrder: data } = await getOrderById({ id: params.id, cname });

  const currency = globalSetting?.default_currency || "$";

  return (
    <>
      <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
        <div className="bg-emerald-100 rounded-md mb-5 px-4 py-3">
          <label>
            {showingTranslateValue(
              storeCustomizationSetting?.dashboard?.invoice_message_first
            )}{" "}
            <span className="font-bold text-emerald-600">
              {data?.user_info?.name},
            </span>{" "}
            {showingTranslateValue(
              storeCustomizationSetting?.dashboard?.invoice_message_last
            )}
          </label>
        </div>

        <SingleOrder
          data={data}
          currency={currency}
          posSetting={posSetting}
          globalSetting={globalSetting}
          storeCustomizationSetting={storeCustomizationSetting}
        />
      </div>
    </>
  );
};

export default Order;
