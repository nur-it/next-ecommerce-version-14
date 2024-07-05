"use client";
import Card from "@components/order-card/Card";
import useFilter from "@hooks/useFilter";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";

const OrderCard = ({ customerOrders, storeCustomizationSetting }) => {
  const { showingTranslateValue } = useUtilsFunction();
  const { pending, processing, delivered } = useFilter(customerOrders?.orders);

  return (
    <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title={showingTranslateValue(
          storeCustomizationSetting?.dashboard?.total_order
        )}
        Icon={FiShoppingCart}
        quantity={customerOrders?.orders?.length}
        className="text-red-600  bg-red-200"
      />
      <Card
        title={showingTranslateValue(
          storeCustomizationSetting?.dashboard?.pending_order
        )}
        Icon={FiRefreshCw}
        quantity={pending?.length}
        className="text-orange-600 bg-orange-200"
      />
      <Card
        title={showingTranslateValue(
          storeCustomizationSetting?.dashboard?.processing_order
        )}
        Icon={FiTruck}
        quantity={processing?.length}
        className="text-indigo-600 bg-indigo-200"
      />
      <Card
        title={showingTranslateValue(
          storeCustomizationSetting?.dashboard?.complete_order
        )}
        Icon={FiCheck}
        quantity={delivered?.length}
        className="text-emerald-600 bg-emerald-200"
      />
    </div>
  );
};

export default OrderCard;
