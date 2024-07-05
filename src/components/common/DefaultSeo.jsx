import { DefaultSeo as NextSeo } from "next-seo";

const DefaultSeo = () => {
  return (
    <NextSeo
      title="CloudClever : Point of Sale and E-Commerce Website all in one"
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: "https://shop-dev.cloudclever.com",
        site_name: "CloudClever : Point of Sale and E-Commerce Website all in one",
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "apple-touch-icon",
          href: "/icon-192x192.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ]}
    />
  );
};

export default DefaultSeo;
