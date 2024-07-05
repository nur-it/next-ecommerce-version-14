import { getClientCname } from "@lib/auth-client";
import { getCname } from "@lib/auth-server";
import { baseURL, handleResponse } from "./CommonServices";

const getOnlineStoreSetting = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/store/all/?cname=${cname}`
    );

    const storeSetting = await handleResponse(response);

    return {
      storeSetting,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getOnlineStoreSecretKeys = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/store/keys?cname=${cname}`
    );

    const storeSetting = await handleResponse(response);

    return {
      storeSetting,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getOnlineStoreSettingSelectedValues = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/store/selected-values?cname=${cname}`
    );

    const storeSetting = await handleResponse(response);

    return {
      storeSetting,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getStoreCustomizationSetting = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/store/customization/all/?cname=${cname}`
    );

    const storeCustomizationSetting = await handleResponse(response);

    return {
      storeCustomizationSetting: storeCustomizationSetting,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getStoreSeoSetting = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/store/customization/seo-setting?cname=${cname}`
    );

    const storeCustomizationSeo = await handleResponse(response);

    return {
      storeCustomizationSeo,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getGlobalSetting = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/global/all?cname=${cname}`
    );

    const globalSetting = await handleResponse(response);

    return {
      globalSetting,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getLocalizationSetting = async () => {
  try {
    const cname = getCname();
    const response = await fetch(
      `${baseURL}/setting/localization/all?cname=${cname}`
    );

    const localizationSettings = await handleResponse(response);

    return {
      localizationSettings,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getPosSetting = async () => {
  try {
    const cname = getCname();
    const response = await fetch(`${baseURL}/setting/pos/all?cname=${cname}`);

    const posSettings = await handleResponse(response);

    return {
      posSettings,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getAllLanguages = async () => {
  try {
    const cname = getCname();
    const response = await fetch(`${baseURL}/language/show?cname=${cname}`);

    const languages = await handleResponse(response);

    return {
      languages,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const getShowingLanguage = async () => {
  try {
    // const cname = getCname();
    const cname = getClientCname();
    const response = await fetch(`${baseURL}/language/show?cname=${cname}`);

    const languages = await handleResponse(response);
    // console.log("languages", languages);
    return {
      languages,
    };
  } catch (error) {
    // console.log("error", error);
    return {
      error: error.message,
    };
  }
};

const getShowingShipping = async () => {
  try {
    const cname = getCname();
    const response = await fetch(`${baseURL}/shipping/show?cname=${cname}`);

    const shippingData = await handleResponse(response);

    return {
      shippingData,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export {
  getAllLanguages,
  getGlobalSetting,
  getLocalizationSetting,
  getOnlineStoreSecretKeys,
  getOnlineStoreSetting,
  getOnlineStoreSettingSelectedValues,
  getPosSetting,
  getShowingLanguage,
  getShowingShipping,
  getStoreCustomizationSetting,
  getStoreSeoSetting,
};
