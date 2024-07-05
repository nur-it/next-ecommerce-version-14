import Image from "next/image";
import Link from "next/link";

// internal import
import { showingTranslateValue } from "@lib/translate";
import { getStoreCustomizationSetting } from "@services/SettingServices";

const FooterTop = async () => {
  const { storeCustomizationSetting } = await getStoreCustomizationSetting();

  return (
    <div
      id="downloadApp"
      style={{
        backgroundColor: storeCustomizationSetting?.color?.bg_daily_need?.hex,
      }}
      className={`bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
          <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
            <Image
              src={
                storeCustomizationSetting?.home?.daily_need_img_left ||
                "/app-download-img-left.png"
              }
              alt="app download"
              width={500}
              height={394}
              className="block w-auto"
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
              {showingTranslateValue(
                storeCustomizationSetting?.footer?.daily_need_title
              )}
            </h3>

            <p className="text-base opacity-90 leading-7">
              {showingTranslateValue(
                storeCustomizationSetting?.home?.daily_need_description
              )}
            </p>

            <div className="mt-8 items-center mx-auto flex justify-center">
              <Link
                href={`${storeCustomizationSetting?.home?.daily_need_app_link}`}
                className="mx-2"
                target="_blank"
                rel="noreferrer"
              >
                <div className="relative h-10 w-32 sm:h-16 sm:w-44">
                  <Image
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    sizes="100%"
                    className="mr-2 rounded"
                    src={
                      storeCustomizationSetting?.home?.button1_img ||
                      "/app/app-store.svg"
                    }
                    alt="app store"
                  />
                </div>
              </Link>

              <Link
                href={`${storeCustomizationSetting?.home?.daily_need_google_link}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="relative h-10 w-32 sm:h-16 sm:w-44">
                  <Image
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    sizes="100%"
                    src={
                      storeCustomizationSetting?.home?.button2_img ||
                      "/app/play-store.svg"
                    }
                    alt=""
                    className="block w-auto object-contain"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className="md:hidden lg:block">
            <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
              <Image
                src={
                  storeCustomizationSetting?.home?.daily_need_img_right ||
                  "/app-download-img.png"
                }
                width={500}
                height={394}
                alt="app download"
                className="block w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
