// "use client";
// import { useRouter } from "next/navigation";
// import { useContext } from "react";

//internal import
// import { SidebarContext } from "@context/SidebarContext";
// import useGetSetting from "@hooks/useGetSetting";
// import useUtilsFunction from "@hooks/useUtilsFunction";
// import CategoryServices from "@services/CategoryServices";
// import CMSkeleton from "@components/preloader/CMSkeleton";
import { getShowingCategory } from "@services/CategoryServices";
import FeatureCatCard from "./FeatureCatCard";

const FeatureCategory = async ({ cname, storeCustomizationSetting }) => {
  // const router = useRouter();

  // const { isLoading, setIsLoading } = useContext(SidebarContext);
  // const { storeCustomizationSetting, loading } = useGetSetting();
  // const { showingTranslateValue } = useUtilsFunction();

  // const { data, error } = useAsync(CategoryServices.getShowingCategory);

  const { categories } = await getShowingCategory({ cname });

  const handleCategoryClick = (id, categoryName) => {
    // const nameConvert = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    // const url = `/search?category=${nameConvert}&_id=${id}`;
    // router.push(url);
    // setIsLoading(!isLoading);
  };

  return (
    <>
      <ul className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center -mx-1 gap-3">
        {categories[0]?.children
          ?.slice(0, storeCustomizationSetting?.home?.feature_product_limit)
          ?.map((category, index) => (
            <li className="shrink-0 p-2 bg-white rounded-md" key={index + 1}>
              <FeatureCatCard category={category} />
            </li>
          ))}
      </ul>

      {/* {loading ? (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      ) : (
        <></>
      )} */}
    </>
  );
};

export default FeatureCategory;
