import Image from "next/image";
// internal imports
import Coupon from "@components/coupon/Coupon";
import { showingTranslateValue } from "@lib/translate";
import { getShowingCoupons } from "@services/CouponServices";
import dayjs from "dayjs";

const OfferCard = async ({
  cname,
  couponInHome,
  globalSetting,
  storeCustomizationSetting,
}) => {
  let showCouponBox = true;
  let enterCouponCodeList = [];

  let { coupons } = await getShowingCoupons({ cname });

  for (let i = 0; i < coupons.length; i++) {
    const item = coupons[i];

    if (!dayjs().isAfter(dayjs(item.endTime))) {
      showCouponBox = true;
      break;
    }
  }

  // filtering data coupon home page
  if (couponInHome) {
    const filteredCoupon = coupons?.filter(({ couponCode }) =>
      storeCustomizationSetting?.home?.discount_coupon_code.includes(couponCode)
    );

    enterCouponCodeList = filteredCoupon;
  } else {
    const filteredCoupon = coupons?.filter(({ couponCode }) =>
      storeCustomizationSetting?.offers?.coupon_code.includes(couponCode)
    );
    enterCouponCodeList = filteredCoupon;
  }

  return (
    <>
      {!storeCustomizationSetting?.home?.slider_width_status &&
        showCouponBox && (
          <div className="w-full hidden lg:flex">
            {storeCustomizationSetting?.home?.coupon_status ? (
              <div className="w-full group">
                <div className="bg-gray-50 h-full border-2 border-orange-500 transition duration-150 ease-linear transform group-hover:border-emerald-500 rounded shadow">
                  <div className="bg-orange-100 text-gray-900 px-6 py-2 rounded-t border-b flex items-center justify-center">
                    <h3 className="text-base font-serif font-medium ">
                      {showingTranslateValue(
                        storeCustomizationSetting?.home?.discount_title
                      )}
                    </h3>
                  </div>

                  <div
                    className={`${
                      couponInHome
                        ? "overflow-hidden"
                        : "grid grid-cols-2 gap-6"
                    }`}
                  >
                    <Coupon
                      couponInHome={couponInHome}
                      globalSetting={globalSetting}
                      enterCouponCodeList={enterCouponCodeList}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-h-full">
                <Image
                  width={580}
                  height={358}
                  className="w-full h-fit"
                  src={
                    storeCustomizationSetting?.home?.place_holder_img ||
                    "/place-holder/place-holder.png"
                  }
                  alt="place-holder"
                />
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default OfferCard;
