import dayjs from "dayjs";
import Image from "next/image";
// internal imports
// import useUtilsFunction from "@hooks/useUtilsFunction";
import { showingTranslateValue } from "@lib/translate";
import CPButton from "./CPButton";
import OfferTimer from "./OfferTimer";

const Coupon = async ({ couponInHome, enterCouponCodeList, globalSetting }) => {
  const currency = globalSetting?.default_currency || "$";

  return (
    <>
      {couponInHome
        ? enterCouponCodeList?.length > 0 &&
          enterCouponCodeList?.slice(0, 2).map(
            (coupon) =>
              coupon && (
                <div key={coupon._id}>
                  {!dayjs().isAfter(dayjs(coupon.endTime)) && (
                    <div className="coupon coupon-home mx-4 my-5 block md:flex lg:flex md:justify-between lg:justify-between items-center bg-white rounded-md shadow">
                      <div className="tengah py-2 px-3 flex items-center justify-items-start">
                        <figure>
                          <Image
                            src={
                              coupon?.logo ||
                              "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                            }
                            alt="Coupon"
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                        </figure>

                        <div className="ml-3">
                          <div className="flex items-center font-serif">
                            <h6 className="pl-1 text-base font-medium text-gray-600">
                              <span className="text-lg md:text-xl lg:text-xl text-red-500 font-bold">
                                {coupon?.discountType?.type === "fixed" ? (
                                  <span>
                                    {currency}
                                    {coupon?.discountType?.value}
                                  </span>
                                ) : (
                                  <span>{coupon?.discountType?.value}%</span>
                                )}
                              </span>{" "}
                              Off
                            </h6>
                            <div className="ml-2">
                              {dayjs().isAfter(dayjs(coupon.endTime)) ? (
                                <span className="text-red-600 inline-block px-4 py-1 rounded-full font-medium text-xs bg-red-100">
                                  Inactive
                                </span>
                              ) : (
                                <span className="text-emerald-600 inline-block px-4 py-1 rounded-full font-medium text-xs bg-emerald-100">
                                  Active
                                </span>
                              )}
                            </div>
                          </div>

                          <h2 className="pl-1 font-serif text-base text-gray-700 leading-6 font-semibold mb-2">
                            {showingTranslateValue(coupon?.title)}
                          </h2>

                          {dayjs().isAfter(dayjs(coupon.endTime)) ? (
                            <span className="inline-block mb-2">
                              <div className="flex items-center font-semibold">
                                <span className="flex items-center justify-center bg-red-500 text-white text-sm font-serif font-semibold mx-1 px-2 py-1 rounded">
                                  00
                                </span>
                                :
                                <span className="flex items-center justify-center bg-red-500 text-white text-sm font-serif font-semibold mx-1 px-2 py-1 rounded">
                                  00
                                </span>
                                :
                                <span className="flex items-center justify-center bg-red-500 text-white text-sm font-serif font-semibold mx-1 px-2 py-1 rounded">
                                  00
                                </span>
                                :
                                <span className="flex items-center justify-center bg-red-500 text-white text-sm font-serif font-semibold mx-1 px-2 py-1 rounded">
                                  00
                                </span>
                              </div>
                            </span>
                          ) : (
                            <span className="inline-block mb-2">
                              <div className="flex items-center font-semibold">
                                <OfferTimer
                                  darkGreen
                                  expiryTimestamp={new Date(coupon.endTime)}
                                />
                              </div>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="md:border-l-2 lg:border-l-2 border-dashed lg:w-1/3 md:w-1/3 relative px-4">
                        <div className="info flex items-center">
                          <div className="w-full">
                            <div className="block">
                              <div className="font-serif border border-dashed bg-emerald-50 py-1 border-emerald-300 rounded-lg text-center block">
                                <CPButton couponCode={coupon.couponCode} />

                                {/* <CopyToClipboard
                                  text={coupon.couponCode}
                                  onCopy={() => handleCopied(coupon.couponCode)}
                                >
                                  <button className="block w-full">
                                    {copied &&
                                    coupon.couponCode === copiedCode ? (
                                      <span className="text-emerald-600 text-sm leading-7 font-semibold">
                                        Copied!
                                      </span>
                                    ) : (
                                      <span className="uppercase font-serif font-semibold text-sm leading-7 text-emerald-600">
                                        {coupon.couponCode}{" "}
                                      </span>
                                    )}
                                  </button>
                                </CopyToClipboard> */}
                              </div>
                            </div>
                            <p className="text-xs leading-4 text-gray-500 mt-2">
                              * This coupon apply when shopping more then{" "}
                              <span className="font-bold">
                                {currency}
                                {coupon.minimumAmount}
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
          )
        : enterCouponCodeList?.length > 0 &&
          enterCouponCodeList?.map(
            (coupon, i) =>
              coupon && (
                <div
                  key={i}
                  className="coupon block md:flex lg:flex md:justify-between lg:justify-between items-center bg-white rounded-md shadow-sm"
                >
                  <div className="tengah p-6 flex items-center justify-items-start">
                    <figure>
                      {coupon?.logo ? (
                        <Image
                          src={coupon?.logo}
                          alt="coupon"
                          width={120}
                          height={120}
                          className="rounded-lg "
                        />
                      ) : (
                        <Image
                          src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                          width={120}
                          height={120}
                          alt="coupon"
                          className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                        />
                      )}
                    </figure>

                    <div className="ml-5">
                      {dayjs().isAfter(dayjs(coupon?.endTime)) ? (
                        <span className="inline-block mb-2">
                          <div className="flex items-center font-semibold">
                            <span className="flex items-center justify-center bg-red-100 text-sm font-serif font-semibold px-2 py-1 rounded mx-1">
                              00
                            </span>
                            :
                            <span className="flex items-center justify-center bg-red-100 text-sm font-serif font-semibold px-2 py-1 rounded mx-1">
                              00
                            </span>
                            :
                            <span className="flex items-center justify-center bg-red-100 text-sm font-serif font-semibold px-2 py-1 rounded mx-1">
                              00
                            </span>
                            :
                            <span className="flex items-center justify-center bg-red-100 text-sm font-serif font-semibold px-2 py-1 rounded mx-1">
                              00
                            </span>
                          </div>
                        </span>
                      ) : (
                        <span className="inline-block mb-2">
                          <div className="flex items-center font-semibold">
                            <OfferTimer
                              expiryTimestamp={new Date(coupon?.endTime)}
                            />
                          </div>
                        </span>
                      )}

                      <h2 className="font-serif text-lg leading-6 font-medium mb-3">
                        {showingTranslateValue(coupon?.title)}
                      </h2>
                      <p className="font-serif font-bold text-xl text-gray-600">
                        <span className="text-lg md:text-xl lg:text-2xl leading-12 text-red-500 font-extrabold">
                          {coupon?.discountType?.type === "fixed" ? (
                            <span>
                              {currency}
                              {coupon?.discountType?.value}
                            </span>
                          ) : (
                            <span>{coupon?.discountType?.value}%</span>
                          )}
                        </span>{" "}
                        Off
                      </p>
                    </div>
                  </div>

                  <div className="md:border-l-2 lg:border-l-2 border-dashed lg:w-1/3 md:w-1/3 relative px-6">
                    <div className="info flex lg:my-6 md:my-5 mb-6 items-center">
                      <div className="w-full">
                        <div className="block">
                          <div className="font-serif font-medium flex items-center mb-1">
                            <span>Coupon</span>
                            <div className="ml-2">
                              {dayjs().isAfter(dayjs(coupon?.endTime)) ? (
                                <span className="text-red-600 inline-block">
                                  Inactive
                                </span>
                              ) : (
                                <span className="text-emerald-600 inline-block">
                                  Active
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="font-serif border border-dashed bg-emerald-50 py-2 border-emerald-300 rounded-lg text-center block">
                            <CPButton couponCode={coupon.couponCode} />

                            {/* <CopyToClipboard
                              text={coupon?.couponCode}
                              onCopy={() => handleCopied(coupon?.couponCode)}
                            >
                              <button className="block w-full">
                                {copied && coupon?.couponCode === copiedCode ? (
                                  <span className="text-emerald-600 text-base leading-7 font-semibold">
                                    Copied!
                                  </span>
                                ) : (
                                  <span className="uppercase font-serif font-semibold text-base leading-7 text-emerald-600">
                                    {coupon?.couponCode}{" "}
                                  </span>
                                )}
                              </button>
                            </CopyToClipboard> */}
                          </div>
                        </div>
                        <p className="text-xs leading-5 text-gray-500 mt-2">
                          * This coupon code will apply on{" "}
                          <span className="font-bold text-gray-700">
                            {coupon?.productType} type products
                          </span>{" "}
                          and when you shopping more then{" "}
                          <span className="font-bold text-gray-700">
                            {currency}

                            {coupon?.minimumAmount}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
    </>
  );
};

export default Coupon;
