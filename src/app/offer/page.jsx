import PageHeader from "@components/header/PageHeader";
import OfferCard from "@components/offer/OfferCard";
import { getCname } from "@lib/auth-server";
import { showingTranslateValue } from "@lib/translate";
import {
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";

const page = async () => {
  const cname = getCname();
  // api calling
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();
  const { globalSetting } = await getGlobalSetting();

  return (
    <>
      {storeCustomizationSetting?.offers?.header_status && (
        <PageHeader
          headerBg={storeCustomizationSetting?.offers?.header_bg}
          title={showingTranslateValue(
            storeCustomizationSetting?.offers?.title
          )}
        />
      )}

      <section className="bg-white py-10 lg:py-20">
        <div className="container max-w-screen-2xl mx-auto px-3 sm:px-10">
          {/* <div className="grid gap-6 grid-cols-1 xl:grid-cols-2"> */}
          <OfferCard
            cname={cname}
            couponInHome={false}
            globalSetting={globalSetting}
            storeCustomizationSetting={storeCustomizationSetting}
          />
          {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default page;
