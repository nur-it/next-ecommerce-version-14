import Image from "next/image";
import { FiBell, FiMail, FiMapPin } from "react-icons/fi";

// internal imports

import PageHeader from "@components/header/PageHeader";
import { showingTranslateValue } from "@lib/translate";
import ContactForm from "@components/contact-us/ContactForm";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const ContactUs = async () => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <section className="lg:pb-20 pb-10">
        {storeCustomizationSetting?.contact_us?.header_status && (
          <PageHeader
            headerBg={storeCustomizationSetting?.contact_us?.header_bg}
            title={showingTranslateValue(
              storeCustomizationSetting?.contact_us?.title
            )}
          />
        )}
      </section>

      <section className="bg-white">
        <div className="container max-w-screen-2xl mx-auto px-3 sm:px-10">
          {/* contact promo */}
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 font-serif">
            <div className="border p-10 rounded-lg text-center">
              <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                <FiMail />
              </span>
              <h5 className="text-xl mb-2 font-bold">
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us?.email_box_title
                )}
              </h5>
              <p className="mb-0 text-base opacity-90 leading-7">
                <a
                  href={`mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`}
                  className="text-emerald-500"
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.email_box_email
                  )}
                </a>{" "}
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us?.email_box_text
                )}
              </p>
            </div>

            <div className="border p-10 rounded-lg text-center">
              <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                <FiBell />
              </span>
              <h5 className="text-xl mb-2 font-bold">
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us?.call_box_title
                )}
              </h5>
              <p className="mb-0 text-base opacity-90 leading-7">
                <a
                  href={`mailto:${storeCustomizationSetting?.contact_us?.call_box_phone}`}
                  className="text-emerald-500"
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.call_box_phone
                  )}
                </a>{" "}
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us?.call_box_text
                )}
              </p>
            </div>

            <div className="border p-10 rounded-lg text-center">
              <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                <FiMapPin />
              </span>
              <h5 className="text-xl mb-2 font-bold">
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us?.address_box_title
                )}
              </h5>
              <p className="mb-0 text-base opacity-90 leading-7">
                <span>
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us
                      ?.address_box_address_one
                  )}
                </span>{" "}
                <br />
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us?.address_box_address_two
                )}{" "}
                <br />
                {showingTranslateValue(
                  storeCustomizationSetting?.contact_us
                    ?.address_box_address_three
                )}
              </p>
            </div>
          </div>

          {/* contact form */}
          <div className="px-0 py-24 mx-auto items-center flex flex-col md:flex-row w-full justify-between">
            <div className="hidden md:w-full lg:w-5/12 lg:flex flex-col h-full">
              <Image
                width={874}
                height={874}
                src={
                  storeCustomizationSetting?.contact_us?.midLeft_col_img ||
                  "/contact-us.png"
                }
                alt="logo"
                className="block w-auto"
              />
            </div>

            <div className="px-0 pb-2 lg:w-5/12 flex flex-col md:flex-row">
              <ContactForm
                storeCustomizationSetting={storeCustomizationSetting}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
