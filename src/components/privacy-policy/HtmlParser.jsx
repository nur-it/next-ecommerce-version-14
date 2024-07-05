"use client";
import useUtilsFunction from "@hooks/useUtilsFunction";
import parse from "html-react-parser";

const HtmlParser = ({ data }) => {
  const { showingTranslateValue } = useUtilsFunction();

  return <>{parse(showingTranslateValue(data))}</>;
};

export default HtmlParser;
