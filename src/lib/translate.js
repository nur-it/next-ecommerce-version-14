"use server";

import { cookies } from "next/headers";

const showingTranslateValue = async (data) => {
  const lang = cookies().get("_lang")?.value || "en";

  const updatedData =
    data !== undefined && Object?.keys(data).includes(lang)
      ? data[lang]
      : data?.en;

  return updatedData;
};

export { showingTranslateValue };
