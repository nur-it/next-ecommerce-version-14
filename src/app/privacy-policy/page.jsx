// internal imports
import { showingTranslateValue } from "@lib/translate";
import PageHeader from "@components/header/PageHeader";
import HtmlParser from "@components/privacy-policy/HtmlParser";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const PrivacyPolicy = async () => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <>
      <section className="lg:pb-20 pb-10">
        {storeCustomizationSetting?.privacy_policy?.status && (
          <PageHeader
            headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
            title={showingTranslateValue(
              storeCustomizationSetting?.privacy_policy?.title
            )}
          />
        )}
      </section>

      <section className="bg-white">
        <div className="container max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="mb-8 lg:mb-12">
            <HtmlParser
              data={storeCustomizationSetting?.privacy_policy?.description}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
