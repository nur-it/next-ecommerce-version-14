"use client";
// internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import Link from "next/link";

const FeatureCatCard = ({ category }) => {
  //   const router = useRouter();

  const { showingTranslateValue } = useUtilsFunction();

  const nameConvert = showingTranslateValue(category?.name)
    .toLowerCase()
    .replace(/[^A-Z0-9]+/gi, "-");

  // handle category
  const handleCategoryClick = (id, categoryName) => {
    const nameConvert = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    const url = `/search?category=${nameConvert}&_id=${id}`;

    router.push(url);
    // setIsLoading(!isLoading);
  };

  return (
    <Link
      href={`/search?category=${nameConvert}&_id=${category._id}`}
      //   onClick={() =>
      //     handleCategoryClick(category._id, showingTranslateValue(category?.name))
      //   }
      className="group flex transition py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3 justify-between items-center px-3.5 2xl:px-4 text-brand-light shadow-category"
      role="button"
    >
      <div className="flex items-center">
        <div className="2xl:w-12 3xl:w-auto 2xl:h-12 3xl:h-auto w-9 h-9 inline-flex shrink-0">
          {category.icon ? (
            <img
              src={category?.icon}
              alt={showingTranslateValue(category?.name)}
              className="w-full h-full"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
              alt={showingTranslateValue(category?.name)}
              className="w-full h-full"
            />
          )}
        </div>

        <h3 className="text-15px text-brand-dark capitalize pl-3">
          {showingTranslateValue(category?.name)}
        </h3>
      </div>

      <div className="flex items-center transition-all transform group-hover:translate-x-1">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-base text-brand-dark text-opacity-40"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
        </svg>
      </div>
    </Link>
  );
};

export default FeatureCatCard;
