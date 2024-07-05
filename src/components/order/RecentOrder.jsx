"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoBagHandle } from "react-icons/io5";

//internal import
import OrderHistory from "@components/order/OrderHistory";
import Pagination from "@components/pagination/Pagination";
import useUtilsFunction from "@hooks/useUtilsFunction";

const RecentOrder = ({ data, error, storeCustomizationSetting }) => {
  const router = useRouter();

  const { showingTranslateValue } = useUtilsFunction();

  const handleChangePage = (page) => {
    // console.log("handleChangePage::", page);
    router.push(`?page=${page}`);
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="rounded-md">
          {error ? (
            <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">
              {error}
            </h2>
          ) : data?.orders?.length === 0 ? (
            <div className="text-center">
              <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
                <IoBagHandle />
              </span>
              <h2 className="font-medium text-md my-4 text-gray-600">
                You Have no order Yet!
              </h2>
            </div>
          ) : (
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-5">
                {showingTranslateValue(
                  storeCustomizationSetting?.dashboard?.recent_order
                )}
              </h3>
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="align-middle inline-block border border-gray-100 min-w-full pb-2 sm:px-6 lg:px-8 rounded-md">
                  <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                    <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="bg-gray-100">
                          <th
                            scope="col"
                            className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            OrderTime
                          </th>

                          <th
                            scope="col"
                            className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Method
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="text-right text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                          >
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {data?.orders?.map((order) => (
                          <tr key={order._id}>
                            <OrderHistory order={order} />
                            <td className="px-5 py-3 whitespace-nowrap text-right text-sm">
                              <Link
                                className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full"
                                href={`/order/${order._id}`}
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {data?.totalDoc > 10 && (
                      <Pagination
                        totalResults={data?.totalDoc}
                        resultsPerPage={10}
                        onChange={handleChangePage}
                        label="Product Page Navigation"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentOrder;
