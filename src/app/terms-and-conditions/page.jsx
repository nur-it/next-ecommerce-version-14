// internal imports
import { showingTranslateValue } from "@lib/translate";
import PageHeader from "@components/header/PageHeader";
import HtmlParser from "@components/privacy-policy/HtmlParser";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const TermsAndConditions = async () => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <section className="lg:pb-20 pb-10">
        {storeCustomizationSetting?.term_and_condition?.status && (
          <PageHeader
            headerBg={storeCustomizationSetting?.term_and_condition?.header_bg}
            title={showingTranslateValue(
              storeCustomizationSetting?.term_and_condition?.title
            )}
          />
        )}
      </section>

      <section className="bg-white">
        <div className="container max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="mb-8 lg:mb-12">
            <HtmlParser
              data={storeCustomizationSetting?.term_and_condition?.description}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
