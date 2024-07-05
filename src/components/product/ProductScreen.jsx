"use client";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

// internal imports
import ImageCarousel from "@components/carousel/ImageCarousel";
import RelatedCategory from "@components/category/RelatedCategory";
import Discount from "@components/common/Discount";
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import TagInput from "@components/common/TagInput";
import Tags from "@components/common/Tags";
import Card from "@components/slug-card/Card";
import ExtrasList from "@components/variants/ExtrasList";
import VariantList from "@components/variants/VariantList";
import useAddToCart from "@hooks/useAddToCart";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getRelatedProducts } from "@services/ProductServices";
import { notifyError } from "@utils/toast";
import { IoStar } from "react-icons/io5";
import ProductCard from "./ProductCard";

const ProductScreen = ({
  slug,
  cname,
  reviews,
  product,
  attributes,
  storeSetting,
  globalSetting,
  averageRating,
  percentageStar,
  storeCustomizationSetting,
}) => {
  console.log("dd >><<", reviews?.length, reviews?.totalDoc);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // redux store call
  const extraCart = useSelector((state) => state.extraCart.extraCartItem);

  const roundedRating = Math.round(averageRating * 10) / 10;
  const starRating = roundedRating?.toString().split(".")[0];
  const halfStarRating = roundedRating - starRating;
  const emptyStarArrLength = halfStarRating === 0 ? 5 : 4;

  let fillStarArr = Array.from(
    { length: starRating || 0 },
    (_, index) => index
  );
  let emptyStarArr = Array.from(
    { length: emptyStarArrLength - starRating },
    (_, index) => index
  );

  // custom hook
  const { showingTranslateValue, getNumber } = useUtilsFunction();
  const { handleAddItem, item, setItem } = useAddToCart();

  // category name slug
  const category_name =
    product?.category &&
    showingTranslateValue(product?.category?.name)
      ?.toLowerCase()
      ?.replace(/[^A-Z0-9]+/gi, "-");

  // react hook
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState("");
  const [volume, setVolume] = useState(0);
  const [unit, setUnit] = useState("ml");
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [extras, setExtras] = useState([]);
  const [variants, setVariants] = useState([]);
  const [rProducts, setRProducts] = useState([]);
  const [selectEx, setSelectEx] = useState([]);
  const [selectVa, setSelectVa] = useState({});
  const [photoIndex, setPhotoIndex] = useState(-1);
  const [discount, setDiscount] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [tabs, setTabs] = useState("description");
  const [extrasPrice, setExtrasPrice] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [extrasTitle, setExtrasTitle] = useState([]);
  const [selectExtra, setSelectExtra] = useState([]);
  const [variantTitle, setVariantTitle] = useState([]);
  const [visibleReview, setVisibleReview] = useState(5);
  const [selectVariant, setSelectVariant] = useState({});
  const [visibleProduct, setVisibleProduct] = useState(12);
  const [originalPriceWithTax, setOriginalPriceWithTax] = useState(0);
  const [originalPriceWithoutTax, setOriginalPriceWithoutTax] = useState(0);
  const [isShowCustomerReviewList, setIsShowCustomerReviewList] =
    useState(false);

  // handle add to cart
  const handleAddToCart = (p) => {
    if (p.variants.length === 1 && p.variants[0].quantity < 1)
      return notifyError("Insufficient stock");
    // if (notAvailable) return notifyError('This Variation Not Available Now!');
    if (stock <= 0) return notifyError("Insufficient stock");
    // console.log('selectVariant', selectVariant);

    if (
      product?.variants.map(
        (variant) =>
          Object.entries(variant).sort().toString() ===
          Object.entries(selectVariant).sort().toString()
      )
    ) {
      const newItem = {
        ...p,
        id: `${
          p.variants.length <= 1 &&
          p?.extras?.length < 1 &&
          p?.productType?.includes("others")
            ? p._id
            : p._id +
              variantTitle?.map((att) => selectVariant[att._id]).join("-") +
              selectEx +
              notes
        }`,

        title: `${
          p.variants.length <= 1 && product?.extras?.length < 1
            ? showingTranslateValue(product?.title)
            : showingTranslateValue(product?.title) +
              "-" +
              variantTitle
                ?.map((att) =>
                  att.variants?.find((v) => v._id === selectVariant[att._id])
                )
                .map((el) => showingTranslateValue(el?.name))
        }`,
        variant: selectVariant,
        price: getNumber(price),
        originalPriceWithTax: getNumber(originalPriceWithTax),
        originalPriceWithoutTax: getNumber(originalPriceWithoutTax),
        costPrice: getNumber(costPrice),
        notes: notes,
        extras: extraCart,
      };
      handleAddItem(newItem);
    } else {
      return notifyError("Please select all variant first!");
    }
  };

  // handle image change
  const handleChangeImage = (img) => {
    setImage(img);
  };

  // tag input
  const removeNote = (indexToRemove) => {
    setNotes([...notes.filter((_, index) => index !== indexToRemove)]);
  };

  useEffect(() => {
    if (value) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      const res = result?.map(
        ({
          originalPrice,
          impactOnPriceWithTax,
          impactOnPriceWithoutTax,
          originalPriceWithTax,
          originalPriceWithoutTax,
          price,
          costPrice,
          salePrice,
          discount,
          quantity,
          barcode,
          totalVolume,
          sku,
          inUse,
          inUseOrder,
          volume,
          unit,
          id,
          productId,
          image,
          ...rest
        }) => ({ ...rest })
      );

      const filterKey = Object.keys(Object.assign({}, ...res));
      const selectVar = filterKey?.reduce(
        (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
        {}
      );
      const newObj = Object.entries(selectVar).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );

      const result2 = result?.find((v) =>
        Object.keys(newObj).every((k) => newObj[k] === v[k])
      );

      if (result.length <= 0 || result2 === undefined) return setStock(0);

      setVariants(result);
      setSelectVariant(result2);
      setSelectVa(result2);
      setPrice(extrasPrice + Number(result2?.price));
      setOriginalPriceWithTax(
        extrasPrice + Number(result2?.originalPriceWithTax)
      );
      setOriginalPriceWithoutTax(
        extrasPrice + Number(result2?.originalPriceWithoutTax)
      );
      setCostPrice(result2.costPrice);
      setStock(result2?.quantity);
      setVolume(result2?.volume);
      setTotalVolume(result2?.totalVolume);
      setUnit(result2?.unit);
      setDiscount(getNumber(result2?.discount));
    } else if (product?.variants?.length > 0) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );
      setVariants(result);
      setExtras(product?.extras);
      setPrice(getNumber(product.variants[0]?.price) + extrasPrice);
      setOriginalPriceWithTax(
        getNumber(product.variants[0]?.originalPriceWithTax) + extrasPrice
      );
      setOriginalPriceWithoutTax(
        getNumber(product.variants[0]?.originalPriceWithoutTax) + extrasPrice
      );
      setCostPrice(getNumber(product.variants[0]?.costPrice));
      setStock(product.variants[0]?.quantity);
      setVolume(product?.variants[0]?.volume);
      setTotalVolume(product?.variants[0]?.totalVolume);
      setUnit(product?.variants[0]?.unit);
      setDiscount(getNumber(product.variants[0]?.discount));
      setSelectVariant(product.variants[0]);
      setSelectVa(product.variants[0]);
    } else {
      setExtras(product?.extras);
      setPrice(getNumber(product?.prices?.price) + extrasPrice);
      setOriginalPriceWithTax(
        getNumber(product?.prices?.originalPriceWithTax) + extrasPrice
      );
      setOriginalPriceWithoutTax(
        getNumber(product?.prices?.originalPriceWithoutTax) + extrasPrice
      );
      setCostPrice(product?.prices?.costPrice);
      setStock(product?.stock);
      setVolume(product?.measurement?.volume);
      setTotalVolume(product?.measurement?.totalVolume);
      setUnit(product?.measurement?.unit);
      setDiscount(getNumber(product?.prices?.discount));
    }
  }, [
    extrasPrice,
    product?.extras,
    product?.measurement?.totalVolume,
    product?.measurement?.volume,
    product?.prices?.discount,
    product?.prices?.originalPriceWithTax,
    product?.prices?.originalPriceWithoutTax,
    product?.prices?.price,
    product?.stock,
    product?.variants,
    product?.totalVolume,
    product?.unit,
    selectVa,
    selectVariant,
    value,
  ]);

  useEffect(() => {
    setError(null);
  }, [product?.image[0]]);

  useEffect(() => {
    if (globalSetting?.pos_view === "restaurant") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [globalSetting]);

  useEffect(() => {
    if (product) {
      const res = Object.keys(Object.assign({}, ...product?.variants));
      const res2 = Object.keys(Object.assign({}, ...(extras ? extras : [])));
      const varTitle = attributes?.filter((att) => res.includes(att?._id));
      const extraTitle = attributes?.filter((att) => res2?.includes(att?._id));
      setVariantTitle(varTitle?.sort());
      setExtrasTitle(extraTitle);
    }
  }, [variants, attributes, extras]);

  useEffect(() => {
    const handleGetRelatedProducts = async () => {
      try {
        const products = await getRelatedProducts({
          cname: cname,
          ids: product?.relatedProducts,
          catIds: product?.relatedCategories,
          option: "product-category",
        });

        setRProducts(products?.relatedProducts);
      } catch (error) {
        console.log("error", error);
      }
    };

    handleGetRelatedProducts();

    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [cname]);

  return (
    <>
      <div className="w-full rounded-lg p-3 lg:p-12 lg:pb-0 bg-white">
        <div className="flex flex-col xl:flex-row">
          <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
            <Discount product={product} discount={discount} slug={true} />

            <div>
              {product?.image[0] && !error ? (
                <Image
                  onError={setError}
                  src={
                    image
                      ? image
                      : product?.variants?.length > 0
                      ? selectVariant?.image
                      : product?.image[0]
                  }
                  alt="product"
                  width={window.screen.width >= 768 ? 300 : 650}
                  height={window.screen.width >= 768 ? 300 : 650}
                  className="max-[767px]:w-1/3 w-1/2 mx-auto"
                />
              ) : (
                <Image
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  width={650}
                  height={650}
                  alt="product Image"
                />
              )}
            </div>

            {product?.image?.length > 4 ? (
              <div className="flex flex-row flex-wrap mt-4">
                <ImageCarousel
                  images={product?.image}
                  handleChangeImage={handleChangeImage}
                  prevRef={prevRef}
                  nextRef={nextRef}
                />
              </div>
            ) : (
              <div className="flex flex-wrap mt-4">
                {product?.image?.map((img, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handleChangeImage(img)}
                  >
                    <Image
                      className="inline-flex items-center justify-center px-3 py-1 mt-2 object-cover transition duration-150 ease-linear transform hover:scale-110 max-[767px]:w-1/4 w-1/2 border mx-2 rounded-md"
                      src={img}
                      alt="product"
                      width={100}
                      height={100}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
              <div
                className={`${
                  storeCustomizationSetting?.slug?.right_box_status
                    ? "w-3/5 xl:pr-6 md:pr-6  md:w-2/3 mob-w-full"
                    : "w-full"
                } `}
              >
                <div className="mb-6">
                  <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                    {showingTranslateValue(product?.title)}
                  </h1>
                  {product?.sku && (
                    <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                      SKU :{" "}
                      <span className="font-bold text-gray-600">
                        {product.sku}
                      </span>
                    </p>
                  )}
                  <div className="relative">
                    <Stock
                      unit={unit}
                      stock={stock}
                      volume={volume}
                      totalVolume={totalVolume}
                    />
                  </div>
                </div>

                <Price price={price} product={product} />

                <div className="mb-1">
                  {extrasTitle?.map((a, i) => (
                    <span key={i + 1}>
                      <h4 className="text-base font-semibold text-gray-700 py-1">
                        {showingTranslateValue(a?.name)}:
                      </h4>
                      <div className="flex flex-row mb-3">
                        <ExtrasList
                          slug
                          att={a._id}
                          product={product}
                          selectEx={selectEx}
                          dispatch={dispatch}
                          extraTitle={extrasTitle}
                          extra={product?.extras}
                          setSelectEx={setSelectEx}
                          selectExtra={selectExtra}
                          setSelectExtra={setSelectExtra}
                          setExtrasPrice={setExtrasPrice}
                          storeSetting={storeSetting}
                        />
                      </div>
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  {variantTitle?.map((a, i) => (
                    <span key={i + 1}>
                      <h4 className="text-base font-semibold text-gray-700 py-1">
                        {showingTranslateValue(a?.name)}:
                      </h4>
                      <div className="flex flex-row mb-3">
                        <VariantList
                          att={a._id}
                          option={a.option}
                          setImage={setImage}
                          setValue={setValue}
                          varTitle={variantTitle}
                          setSelectVa={setSelectVa}
                          variants={product.variants}
                          selectVariant={selectVariant}
                          setSelectVariant={setSelectVariant}
                        />
                      </div>
                    </span>
                  ))}
                </div>

                <div>
                  {product?.allowNotesOnCheckout?.includes("store") && (
                    <div className="my-2">
                      {show && (
                        <TagInput
                          notes={notes}
                          addNote={addNote}
                          removeNote={removeNote}
                          tags={["Drink"]}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex items-center mt-4">
                    <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                      <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                        <button
                          onClick={() => setItem(item - 1)}
                          disabled={item === 1}
                          className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                        >
                          <span className="text-dark text-base">
                            <FiMinus />
                          </span>
                        </button>
                        <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                          {item}
                        </p>
                        <button
                          onClick={() => setItem(item + 1)}
                          disabled={selectVariant.quantity <= item}
                          className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                        >
                          <span className="text-dark text-base">
                            <FiPlus />
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          backgroundColor:
                            storeCustomizationSetting?.color?.bg_button?.hex,
                        }}
                        className={`bg-gray-800 hover:text-white hover:bg-gray-900 text-white text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full h-12`}
                      >
                        {t("common:addToCart")}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <span className="font-serif font-semibold py-1 text-sm d-block">
                      <span className="text-gray-800">
                        {t("common:category")}:
                      </span>{" "}
                      <Link
                        href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                      >
                        <button
                          type="button"
                          className="text-gray-600 font-serif font-medium underline ml-2 hover:text-teal-600"
                          onClick={() => setIsLoading(!isLoading)}
                        >
                          {category_name}
                        </button>
                      </Link>
                    </span>
                    <Tags product={product} />
                  </div>

                  {/* social share */}
                  <div className="mt-8">
                    <h3 className="text-base font-semibold mb-1 font-serif">
                      {t("common:shareYourSocial")}
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      {t("common:shareYourSocialText")}
                    </p>

                    <ul className="flex mt-4">
                      <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-gray-800  mr-2 transition ease-in-out duration-500">
                        <FacebookShareButton
                          url={`https://supermarket-plum.vercel.app/product/${slug}`}
                          quote=""
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </li>
                      <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-gray-800  mr-2 transition ease-in-out duration-500">
                        <TwitterShareButton
                          url={`https://supermarket-plum.vercel.app/product/${slug}`}
                          quote=""
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                      </li>
                      <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-gray-800  mr-2 transition ease-in-out duration-500">
                        <RedditShareButton
                          url={`https://supermarket-plum.vercel.app/product/${slug}`}
                          quote=""
                        >
                          <RedditIcon size={32} round />
                        </RedditShareButton>
                      </li>
                      <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-gray-800  mr-2 transition ease-in-out duration-500">
                        <WhatsappShareButton
                          url={`https://supermarket-plum.vercel.app/product/${slug}`}
                          quote=""
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                      </li>
                      <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-gray-800  mr-2 transition ease-in-out duration-500">
                        <LinkedinShareButton
                          url={`https://supermarket-plum.vercel.app/product/${slug}`}
                          quote=""
                        >
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* shipping description card */}
              {storeCustomizationSetting?.slug?.right_box_status && (
                <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                  <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                    <Card
                      storeCustomizationSetting={storeCustomizationSetting}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                type="button"
                onClick={() => setTabs("description")}
                className={`inline-block py-2 px-3 border-b-2 rounded-t-lg ${
                  tabs === "description"
                    ? "text-green-600 border-green-600"
                    : "border-transparent"
                } hover:text-green-600 hover:border-green-600 text-sm font-semibold`}
              >
                Description
              </button>
            </li>

            <li className="me-2">
              <button
                type="button"
                onClick={() => setTabs("review")}
                className={`inline-block py-2 px-3 border-b-2 rounded-t-lg ${
                  tabs === "review"
                    ? "text-green-600 border-green-600"
                    : "border-transparent"
                } hover:text-green-600 hover:border-green-600 text-sm font-semibold`}
              >
                Customer Review
              </button>
            </li>
          </ul>
        </div>
      </div>

      {tabs === "description" ? (
        <div className="mx-auto max-w-screen-2xl">
          <div className="w-full text-sm text-gray-700 rounded-lg p-3 lg:p-6">
            <p>{showingTranslateValue(product?.description)}</p>
          </div>
        </div>
      ) : (
        <>
          {(reviews?.totalDoc || reviews?.length) !== 0 ? (
            <div className="mx-auto max-w-screen-2xl">
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="flex md:flex-row flex-col md:items-center gap-10">
                  {/* star text */}
                  <div className="flex flex-col md:justify-center md:items-center">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl text-gray-900 font-semibold leading-5">
                        {parseFloat(averageRating || 0).toFixed(1)}
                      </h3>

                      <div className="flex items-center gap-2 bg-yellow-500 rounded px-2 py-1.5">
                        <div>
                          <Image
                            width={12}
                            height={12}
                            className="w-3 h-3"
                            alt="starWhiteColor"
                            src={"/product-details/white-color-star.png"}
                          />
                        </div>

                        <div className="text-xs font-normal text-white">
                          {averageRating <= 1.9
                            ? "Terrible"
                            : averageRating <= 2.9
                            ? "Poor"
                            : averageRating <= 3.9
                            ? "Fair"
                            : averageRating <= 4.9
                            ? "Top"
                            : averageRating === 5
                            ? "Excellent"
                            : ""}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6">
                      <div className="flex items-center gap-1">
                        {fillStarArr?.map((item) => (
                          <Image
                            alt="star"
                            width={12}
                            height={12}
                            key={item + 1}
                            className="w-3 h-3"
                            src={"/product-details/star.png"}
                          />
                        ))}

                        {halfStarRating !== 0 && (
                          <Image
                            width={12}
                            height={12}
                            alt="half-star"
                            className="w-3 h-3"
                            src={"/product-details/half-star.png"}
                          />
                        )}

                        {emptyStarArr?.map((item) => (
                          <Image
                            width={12}
                            height={12}
                            key={item + 1}
                            alt="emptyStar"
                            className="w-3 h-3"
                            src={"/product-details/empty-star.png"}
                          />
                        ))}
                      </div>

                      <p className="text-xs font-medium mt-2 text-center">
                        {reviews?.totalDoc || 0} ratings
                      </p>
                    </div>
                  </div>

                  {/* star ratting */}
                  <div>
                    {percentageStar
                      ?.sort((a, b) => b.star - a.star)
                      ?.map((percentage, index) => {
                        const filledStars = percentage.star;
                        const emptyStars = 5 - filledStars;

                        let fillStarArr = Array.from(
                          { length: filledStars },
                          (_, index) => index
                        );
                        let emptyStarArr = Array.from(
                          { length: emptyStars },
                          (_, index) => index
                        );

                        return (
                          <div
                            className="flex items-center gap-5"
                            key={index + 1}
                          >
                            <div className="flex items-center gap-3">
                              {fillStarArr?.map((item) => (
                                <Image
                                  alt="star"
                                  width={16}
                                  height={16}
                                  key={item + 1}
                                  className="w-4 h-4"
                                  src={"/product-details/star.png"}
                                />
                              ))}

                              {emptyStarArr?.map((item) => (
                                <Image
                                  alt="star"
                                  width={16}
                                  height={16}
                                  key={item + 1}
                                  className="w-4 h-4"
                                  src={"/product-details/empty-star.png"}
                                />
                              ))}
                            </div>

                            <div className="w-[200px] bg-[#DBDEDF] rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-[#FFB340] h-2.5 rounded-full"
                                style={{
                                  width: `${percentage?.percentage}%`,
                                }}
                              ></div>
                            </div>
                            <span>{percentage?.count}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* review list */}
                <div>
                  <div className="border-b-2 border-gray-200 my-4 py-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setIsShowCustomerReviewList(!isShowCustomerReviewList)
                      }
                      className="font-semibold text-base tracking-wide"
                    >
                      Reviews ({reviews?.totalDoc || 0})
                    </button>

                    <div className="flex justify-center items-center gap-2">
                      <h5 className="text-sm font-medium">Sort By :</h5>

                      <div>
                        <select
                          onChange={(e) => handleReviewSorting(e.target.value)}
                          className="py-0 text-sm font-serif font-medium block w-full rounded border border-gray-500 bg-white pr-10 cursor-pointer focus:ring-0 focus:ring-gray-600"
                        >
                          <option className="px-3" value="recent">
                            {t("common:recent")}
                          </option>
                          <option className="px-3" value="low-to-high">
                            {t("common:lowRating")}
                          </option>
                          <option className="px-3" value="high-to-low">
                            {t("common:highRating")}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* customer review list */}
                  <div
                    className="flex flex-col gap-5"
                    style={{
                      height: isShowCustomerReviewList ? "auto" : 0,
                      transition: "all 0.6s",
                      visibility: !isShowCustomerReviewList
                        ? "hidden"
                        : "visible",
                      opacity: !isShowCustomerReviewList ? "0" : "1",
                    }}
                  >
                    {reviews?.reviews?.map((review) => {
                      const filledStars = review.star;
                      const emptyStars = 5 - filledStars;

                      let fillStarArr = Array.from(
                        { length: filledStars },
                        (_, index) => index
                      );
                      let emptyStarArr = Array.from(
                        { length: emptyStars },
                        (_, index) => index
                      );
                      const timeAgo = dayjs(review?.createdAt).fromNow();

                      return (
                        <div className="flex flex-col gap-4" key={review._id}>
                          <div className="flex items-center gap-3">
                            <div className="w-[56px] h-[56px] flex items-center">
                              <Image
                                alt="customer"
                                src={
                                  "/place-holder/place-holder.png" ||
                                  review.customer[0]?.image
                                }
                                className="w-full h-auto"
                              />
                            </div>

                            <div className="">
                              <span className="text-base">
                                {review.customer[0]?.name}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-sm">
                                  {review?.star}.0
                                </span>

                                <div className="flex items-center gap-1">
                                  {fillStarArr?.map((item) => (
                                    <Image
                                      alt="star"
                                      width={12}
                                      height={12}
                                      key={item + 1}
                                      className="w-3 h-3"
                                      src={"/product-details/star.png"}
                                    />
                                  ))}

                                  {emptyStarArr?.map((item) => (
                                    <Image
                                      width={12}
                                      height={12}
                                      key={item}
                                      alt="star"
                                      className="w-3 h-3"
                                      src={"/product-details/empty-star.png"}
                                    />
                                  ))}
                                </div>

                                <span className="text-gray-400 text-xs">
                                  {timeAgo}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-normal text-gray-700 mb-2">
                              {review.comment}
                            </p>
                            <div className="flex gap-3">
                              {review?.image?.map((img, index) => (
                                <div
                                  role="button"
                                  onClick={() => handleImageOpen(index)}
                                  className="w-16 h-16 border border-gray-100 rounded p-1"
                                  key={index + 1}
                                >
                                  <Image
                                    src={img}
                                    alt="review"
                                    width={60}
                                    height={60}
                                    key={index + 1}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* light box */}
                            <Lightbox
                              index={photoIndex}
                              open={photoIndex >= 0}
                              slides={review?.image?.map((img) => {
                                return {
                                  src: img,
                                };
                              })}
                              close={() => handleImageOpen(-1)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {isShowCustomerReviewList && (
                  <>
                    {reviews?.totalDoc > visibleReview && (
                      <button
                        onClick={handleLoadMoreComment}
                        className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-gray-900 h-12 mt-6 text-sm lg:text-sm"
                      >
                        {t("common:loadMoreBtn")}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-screen-2xl">
              <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                <div className="text-center">
                  <span className="flex justify-center my-30 pt-16 text-yellow-500 font-semibold text-6xl">
                    <IoStar />
                  </span>
                  <h2 className="font-medium text-md my-4 text-gray-600">
                    No Review Yet!
                  </h2>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {product?.allowRelatedProductsAndCategories?.includes("store") && (
        <>
          {/* related products */}
          {rProducts?.length > 0 && (
            <div className="pt-10 lg:pt-20 lg:pb-0">
              <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-serif hover:text-gray-600">
                {t("common:relatedProducts")}
              </h3>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {rProducts?.slice(0, visibleProduct)?.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        attributes={attributes}
                        storeSetting={storeSetting}
                      />
                    ))}
                  </div>

                  {rProducts?.length > visibleProduct && (
                    <button
                      onClick={() => setVisibleProduct((pre) => pre + 12)}
                      className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-gray-900 h-12 mt-6 text-sm lg:text-sm"
                    >
                      {t("common:loadMoreBtn")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* related categories */}
          {product?.relatedCategories?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-left font-bold mb-3 text-lg">
                Related Categories
              </h3>

              <RelatedCategory categories={product?.relatedCategories} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
