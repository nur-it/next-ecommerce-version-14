"use client";
import store from "@redux/index";
import { ToastContainer } from "react-toastify";
// import "@styles/custom.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Provider } from "react-redux";
import { CartProvider } from "react-use-cart";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
//internal import
import DefaultSeo from "@components/common/DefaultSeo";
import { SidebarProvider } from "@context/SidebarContext";
import { UserProvider } from "@context/UserContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";

let persistor = persistStore(store);
let stripePromise;

const Providers = ({ children, storeSetting }) => {
  const stripePublicKey =
    storeSetting?.stripe_public_key || process.env.NEXT_PUBLIC_STRIPE_KEY;

  if (!stripePromise) {
    stripePromise = loadStripe(`${stripePublicKey}`);
  }

  // console.log("stripePromise", stripePromise);
  // paypal stripe id
  const initialOptions = {
    "client-id": `${
      storeSetting?.paypal_public_key ||
      "AZlKmZhXurK5lIHj8kZvl1Z9xaUCkBv0zx4scws2xkZlh3bHfNovOyggvTQCp-Jx5HDwzSmaMcH5at4J"
    }`,
    // 'client-id': `${paypalPublicKey}`,
    currency: "USD",
    // intent: 'capture',
    // 'data-client-token ': 'abc123xyz==',
  };

  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <SidebarProvider>
          <UserProvider>
            <PayPalScriptProvider options={initialOptions}>
              {/* <ThemeProvider> */}
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <Elements stripe={stripePromise}>
                    <CartProvider>
                      <DefaultSeo />
                      {children}
                    </CartProvider>
                  </Elements>
                </PersistGate>
              </Provider>
              {/* </ThemeProvider> */}
            </PayPalScriptProvider>
          </UserProvider>
        </SidebarProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
