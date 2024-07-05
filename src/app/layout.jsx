// internal imports
import FeatureCard from "@components/feature-card/FeatureCard";
import MaintenanceLoading from "@components/preloader/MaintenanceLoading";
import Footer from "@layout/footer/Footer";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import NavBarTop from "@layout/navbar/NavBarTop";
import Navbar from "@layout/navbar/Navbar";
import { getOnlineStoreSecretKeys } from "@services/SettingServices";
import { getStoreDetails } from "@services/SiteServices";
import "@styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Providers from "./providers";

export const metadata = {
  title: "Kachabazar - React Grocery & Organic Food Store e-commerce Template",
  description: "React Grocery & Organic Food Store e-commerce Template",
  keywords: "ecommerce online store",
  url: "https://kachabazar-store.vercel.app/",
  image:
    "https://res.cloudinary.com/ahossain/image/upload/v1700383437/CloudClever_l6mkvi.png",
};

export default async function RootLayout({ children }) {
  const { siteDetails } = await getStoreDetails();
  const { storeSetting } = await getOnlineStoreSecretKeys();

  if (
    siteDetails?.userstatus === "Active" &&
    siteDetails?.shop_status === "Active"
  ) {
    return (
      <html lang="en">
        <body>
          <Providers storeSetting={storeSetting}>
            <div className="font-sans">
              <NavBarTop />
              <Navbar />

              <main className="bg-gray-50">{children}</main>

              <MobileFooter />

              <div className="w-full">
                {/* {storeCustomizationSetting?.home?.daily_needs_status && ( */}
                <FooterTop />
                {/* )} */}

                {/* {storeCustomizationSetting?.home?.feature_promo_status && ( */}
                <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
                  <FeatureCard />
                </div>
                {/* )} */}

                <hr className="hr-line"></hr>
                <div className="border-t border-gray-100 w-full">
                  <Footer />
                </div>
              </div>
            </div>
          </Providers>
        </body>
      </html>
    );
  } else if (siteDetails?.userstatus === "Inactive") {
    <html lang="en">
      <body>
        <Providers storeSetting={storeSetting}>
          <div className="font-sans">
            <MaintenanceLoading />
          </div>
        </Providers>
      </body>
    </html>;
  } else {
    return (
      <html lang="en">
        <body>
          <Providers storeSetting={storeSetting}>
            <div className="font-sans">
              <h2 className="text-center text-2xl text-emerald-500">
                Please Check check your{" "}
                <span className="text-red-500">sub-domain</span> name!
              </h2>
            </div>
          </Providers>
        </body>
      </html>
    );
  }
}
