"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRef } from "react";
import { IoCloudDownloadOutline, IoPrintOutline } from "react-icons/io5";
import ReactToPrint from "react-to-print";
// internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import Invoice from "./Invoice";
import InvoiceForDownload from "./InvoiceForDownload";

const SingleOrder = ({
  data,
  currency,
  posSetting,
  globalSetting,
  storeCustomizationSetting,
}) => {
  const printRef = useRef();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Invoice
        data={data}
        printRef={printRef}
        currency={currency}
        posSetting={posSetting}
        globalSetting={globalSetting}
        storeCustomizationSetting={storeCustomizationSetting}
      />

      <div className="bg-white p-8 rounded-b-xl">
        <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between invoice-btn">
          <PDFDownloadLink
            document={
              <InvoiceForDownload
                data={data}
                currency={currency}
                posSetting={posSetting}
                globalSetting={globalSetting}
              />
            }
            fileName="Invoice"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading..."
              ) : (
                <button
                  style={{
                    backgroundColor:
                      storeCustomizationSetting?.color?.bg_button?.hex,
                  }}
                  className={`bg-gray-800 text-white mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md`}
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.dashboard?.download_button
                  )}{" "}
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink>

          <ReactToPrint
            trigger={() => (
              <button
                style={{
                  backgroundColor:
                    storeCustomizationSetting?.color?.bg_button?.hex,
                }}
                className={`bg-gray-800 text-white mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md`}
              >
                {showingTranslateValue(
                  storeCustomizationSetting?.dashboard?.print_button
                )}
                <span className="ml-2">
                  <IoPrintOutline />
                </span>
              </button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
