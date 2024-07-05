// internal imports
import { getCname } from "@lib/auth-server";
import Card from "@components/cta-card/Card";
import ProductList from "@components/product/ProductList";
import { getShowingAttributes } from "@services/AttributesServices";
import { getShowingCategory } from "@services/CategoryServices";
import { getShowingStoreProducts } from "@services/ProductServices";
import CategoryCarousel from "@components/carousel/CategoryCarousel";
import {
  getLocalizationSetting,
  getOnlineStoreSetting,
} from "@services/SettingServices";

const Search = async ({ searchParams }) => {
  const cname = getCname();

  const { storeSetting } = await getOnlineStoreSetting();
  const { localizationSettings } = await getLocalizationSetting();
  const { products } = await getShowingStoreProducts({
    category: searchParams?._id || "",
    title: searchParams?.title || "",
    sort: searchParams?.sort || "",
    limit: searchParams?.limit || 18,
  });
  const { attributes } = await getShowingAttributes({
    cname: cname,
  });
  const { categories, error } = await getShowingCategory({ cname });

  return (
    <>
      <section>
        <div className="container mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
            <Card />
          </div>

          <div className="relative">
            <CategoryCarousel
              error={error}
              categories={categories[0]?.children}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <ProductList
            products={products}
            attributes={attributes}
            storeSetting={storeSetting}
            localizationSettings={localizationSettings}
          />
        </div>
      </section>
    </>
  );
};

export default Search;
