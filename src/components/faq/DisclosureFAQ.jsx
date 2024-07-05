"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
// internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";

const DisclosureFAQ = ({ storeCustomizationSetting }) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>
                {showingTranslateValue(storeCustomizationSetting?.faq?.faq_one)}
              </span>

              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>

            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_one
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
              <span>
                {" "}
                {showingTranslateValue(storeCustomizationSetting?.faq?.faq_two)}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_two
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
              <span>
                {" "}
                {showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_three
                )}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_three
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
              <span>
                {" "}
                {showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_four
                )}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_four
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
              <span>
                {showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_five
                )}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_five
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
              <span>
                {showingTranslateValue(storeCustomizationSetting?.faq?.faq_six)}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_six
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>
                {" "}
                {showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_seven
                )}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_seven
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-gray-600 focus:text-emerald-500 bg-gray-50 hover:bg-emerald-50 rounded-lg focus:outline-none">
              <span>
                {showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_eight
                )}
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180 text-emerald-500" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.faq?.description_eight
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default DisclosureFAQ;
