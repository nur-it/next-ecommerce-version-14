import Image from "next/image";
// internal imports
import DisclosureFAQ from "@components/faq/DisclosureFAQ";
import PageHeader from "@components/header/PageHeader";
import { showingTranslateValue } from "@lib/translate";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const FAQ = async () => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <section className="lg:pb-20 pb-10">
        <PageHeader
          headerBg={storeCustomizationSetting?.faq?.header_bg}
          title={showingTranslateValue(storeCustomizationSetting?.faq?.title)}
        />
      </section>

      <section className="bg-white">
        <div className="container max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="grid gap-4 lg:mb-8 items-center md:grid-cols-2 xl:grid-cols-2">
            <div className="pr-16">
              <Image
                width={720}
                height={550}
                src={storeCustomizationSetting?.faq?.left_img || "/faq.svg"}
                alt="logo"
              />
            </div>

            <div className="">
              <DisclosureFAQ
                storeCustomizationSetting={storeCustomizationSetting}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
