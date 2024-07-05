import { headers } from "next/headers";

// internal imports
import Breadcrumbs from "@components/product/Breadcrumbs";
import ProductScreen from "@components/product/ProductScreen";
import { getCname } from "@lib/auth-server";
import { getShowingAttributes } from "@services/AttributesServices";
import { getProductBySlug } from "@services/ProductServices";
import { getAllReviews } from "@services/ReviewServices";
import {
  getGlobalSetting,
  getOnlineStoreSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

const ProductDetails = async ({ params }) => {
  const header = headers();
  const query = header.get("referer")?.split("?")[1];
  // product id
  const _id = query?.split("=")[1];
  // cname
  const cname = getCname();

  // api calling
  const { storeSetting } = await getOnlineStoreSetting();
  const { globalSetting } = await getGlobalSetting();
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { product } = await getProductBySlug({ cname, slug: params.slug });
  const { attributes } = await getShowingAttributes({
    cname: cname,
  });
  const { reviews } = await getAllReviews({ cname, id: _id });

  return (
    <>
      <section>
        <div className="container mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <div className="flex items-center pb-4">
            <Breadcrumbs product={product} />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <ProductScreen
            cname={cname}
            product={product}
            reviews={reviews}
            slug={params.slug}
            attributes={attributes}
            storeSetting={storeSetting}
            globalSetting={globalSetting}
            averageRating={reviews?.averageRating || 0}
            percentageStar={reviews?.percentageStar || []}
            storeCustomizationSetting={storeCustomizationSetting}
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
