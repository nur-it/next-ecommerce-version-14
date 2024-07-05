//internal import
import Banner from "@components/banner/Banner";
import MainCarousel from "@components/carousel/MainCarousel";
import StickyCart from "@components/cart/StickyCart";
import FeatureCategory from "@components/category/FeatureCategory";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import FutureProducts from "@components/product/FutureProducts";
import ProductCard from "@components/product/ProductCard";
import { getCname } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import { getShowingAttributes } from "@services/AttributesServices";
import { getShowingStoreProducts } from "@services/ProductServices";
import {
  getGlobalSetting,
  getOnlineStoreSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

const Home = async () => {
  const cname = getCname();

  // api calling
  const { globalSetting } = await getGlobalSetting();

  const { storeSetting } = await getOnlineStoreSetting();
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  const currency = globalSetting?.default_currency || "$";

  const { featureProducts, popularProducts, discountedProducts } =
    await getShowingStoreProducts({
      category: "",
      title: "",
      limit: 18,
      sort: "",
    });

  const { attributes } = await getShowingAttributes({
    cname: cname,
  });

  return (
    <>
      <div className="min-h-screen">
        {/* sticky cart section */}
        <StickyCart currency={currency} />
        <div
          style={{
            backgroundColor: storeCustomizationSetting?.color?.bg_slider?.hex,
          }}
          className="bg-white"
        >
          <div className="container mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
            <div className="flex w-full">
              <div
                className={`${
                  storeCustomizationSetting?.home?.slider_width_status
                    ? "w-full flex"
                    : "w-3/5 xl:pr-6 md:pr-6 mob-w-full"
                } `}
              >
                <MainCarousel />
              </div>

              <OfferCard
                cname={cname}
                couponInHome={true}
                globalSetting={globalSetting}
                storeCustomizationSetting={storeCustomizationSetting}
              />
            </div>

            {storeCustomizationSetting?.home?.promotion_banner_status && (
              <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6">
                <Banner storeCustomizationSetting={storeCustomizationSetting} />
              </div>
            )}
          </div>
        </div>

        {/* feature category's */}
        {storeCustomizationSetting?.home?.featured_status && (
          <div
            style={{
              backgroundColor:
                storeCustomizationSetting?.color?.bg_feature_category?.hex,
            }}
            className={`bg-gray-100 lg:py-16 py-10`}
          >
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    {showingTranslateValue(
                      storeCustomizationSetting?.home?.feature_title
                    )}
                  </h2>

                  <p className="text-base font-sans text-gray-600 leading-6">
                    {showingTranslateValue(
                      storeCustomizationSetting?.home?.feature_description
                    )}
                  </p>
                </div>
              </div>

              <FeatureCategory
                cname={cname}
                storeCustomizationSetting={storeCustomizationSetting}
              />
            </div>
          </div>
        )}

        {/* future products */}
        {featureProducts?.length !== 0 && (
          <div
            style={{
              background:
                storeCustomizationSetting?.color?.bg_popular_product?.hex,
            }}
            className={`bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10`}
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  Future Products for Daily Shopping
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  See all our Future products in this week. You can choose your
                  daily needs products from this list and get some special offer
                  with free shipping.
                </p>
              </div>
            </div>

            <FutureProducts
              fProducts={featureProducts}
              attributes={attributes}
              storeSetting={storeSetting}
              globalSetting={globalSetting}
              storeCustomizationSetting={storeCustomizationSetting}
            />
          </div>
        )}

        {/* popular products */}
        {storeCustomizationSetting?.home?.popular_products_status && (
          <div
            style={{
              background:
                storeCustomizationSetting?.color?.bg_popular_product?.hex,
            }}
            className={`bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10`}
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  {showingTranslateValue(
                    storeCustomizationSetting?.home?.popular_title
                  )}
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  {showingTranslateValue(
                    storeCustomizationSetting?.home?.popular_description
                  )}
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {popularProducts
                    ?.slice(
                      0,
                      storeCustomizationSetting?.home?.popular_product_limit
                    )
                    .map((product) => (
                      <ProductCard
                        cname={cname}
                        key={product._id}
                        product={product}
                        attributes={attributes}
                        storeSetting={storeSetting}
                        globalSetting={globalSetting}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* promotional banner card */}
        {storeCustomizationSetting?.home?.delivery_status && (
          <div className="block mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
              <div
                style={{
                  backgroundColor:
                    storeCustomizationSetting?.color?.bg_quick_delivery?.hex,
                }}
                className="bg-gray-800 lg:p-16 p-6 shadow-sm border rounded-lg"
              >
                <CardTwo
                  storeCustomizationSetting={storeCustomizationSetting}
                />
              </div>
            </div>
          </div>
        )}

        {/* discounted products */}
        {storeCustomizationSetting?.home?.discount_product_status && (
          <div
            id="discount"
            style={{
              backgroundColor:
                storeCustomizationSetting?.color?.bg_discount_product?.hex,
            }}
            className={`gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10`}
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  {showingTranslateValue(
                    storeCustomizationSetting?.home?.latest_discount_title
                  )}
                </h2>

                <p className="text-base font-sans text-gray-600 leading-6">
                  {showingTranslateValue(
                    storeCustomizationSetting?.home?.latest_discount_description
                  )}
                </p>
              </div>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                {discountedProducts
                  ?.slice(
                    0,
                    storeCustomizationSetting?.home
                      ?.latest_discount_product_limit
                  )
                  .map((product) => (
                    <ProductCard
                      cname={cname}
                      key={product._id}
                      product={product}
                      attributes={attributes}
                      storeSetting={storeSetting}
                      globalSetting={globalSetting}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
