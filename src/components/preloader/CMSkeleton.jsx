"use client";
import useUtilsFunction from "@hooks/useUtilsFunction";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CMSkeleton = ({
  html,
  count,
  height,
  color,
  loading,
  error,
  data,
  highlightColor,
}) => {
  const { showingTranslateValue } = useUtilsFunction();
  return (
    <>
      {loading ? (
        <Skeleton
          count={count || 6}
          height={height || 25}
          baseColor={color || "#f1f5f9"}
          highlightColor={highlightColor || "#cbd5e1"}
        />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data ? (
        html ? (
          parse(showingTranslateValue(data))
        ) : (
          showingTranslateValue(data)
        )
      ) : null}
    </>
  );
};

export default CMSkeleton;
