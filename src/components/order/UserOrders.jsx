"use client";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";

// internal imports
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getOrderByCustomer } from "@services/OrderServices";
import Skeleton from "react-loading-skeleton";
import OrderHistory from "./OrderHistory";

const UserOrders = ({ cname, userInfo, storeCustomizationSetting }) => {
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();

  const { currentPage, handleChangePage } = useContext(SidebarContext);

  // react hook
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("data >><<", data);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrderByCustomer({
          cname,
          limit: 8,
          page: currentPage,
          sellFrom: "SHOP",
          user: userInfo?._id,
        });

        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    })();
  }, [currentPage]);

  const pageCount = Math.ceil(data?.totalDoc / 8);

  return (
    <div className="overflow-hidden">
      {loading ? (
        <>
          <div>
            <Skeleton count={1} height={30} width={100} />
          </div>

          <div>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item + 1} className="py-2">
                <Skeleton count={1} height={30} />
              </div>
            ))}
          </div>
        </>
      ) : error ? (
        <h2 className="text-2xl text-center my-10 mx-auto w-11/12">{error}</h2>
      ) : data?.orders?.length === 0 ? (
        <div className="text-center">
          <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
            <IoBagHandle />
          </span>
          <h2 className="font-medium text-md my-4 text-gray-600">
            {t("common:noOrder")}
          </h2>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-xl font-serif font-semibold mb-5">
            {showingTranslateValue(
              storeCustomizationSetting?.dashboard?.my_order
            )}
          </h2>

          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                {data?.orders?.length === 0 ? (
                  <div className="text-center">
                    <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
                      <IoBagHandle />
                    </span>
                    <h2 className="font-medium text-md my-4 text-gray-600">
                      {t("common:noOrder")}
                    </h2>
                  </div>
                ) : (
                  <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100">
                        <th
                          scope="col"
                          className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          {t("common:id")}
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          {t("common:oderTime")}
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          {t("common:method")}
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          {t("common:status")}
                        </th>

                        <th
                          scope="col"
                          className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          {t("common:total")}
                        </th>

                        <th
                          scope="col"
                          className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                        >
                          {t("common:action")}
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.orders?.map((order) => (
                        <tr key={order._id}>
                          <OrderHistory order={order} />

                          <td className="px-5 py-3 whitespace-nowrap text-center text-sm order-link">
                            <div className="flex justify-end items-center gap-3">
                              <Link
                                href={`/order/${order._id}`}
                                className="px-3 py-1 bg-blue-100 text-xs text-blue-600  hover:text-blue-400 transition-all font-semibold rounded-full"
                              >
                                {t("common:invoice")}
                              </Link>{" "}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {data?.orders?.length > 10 && (
                  <div className="paginationOrder">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel={t("common:next")}
                      onPageChange={(e) => handleChangePage(e.selected + 1)}
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      previousLabel={t("common:previous")}
                      renderOnZeroPageCount={null}
                      pageClassName="page--item"
                      pageLinkClassName="page--link"
                      previousClassName="page-item"
                      previousLinkClassName="page-previous-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-next-link"
                      breakClassName="page--item"
                      breakLinkClassName="page--link"
                      containerClassName="pagination"
                      activeClassName="activePagination"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
