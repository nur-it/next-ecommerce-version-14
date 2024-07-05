import { getOnlineStoreSecretKeys } from "@services/SettingServices";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
// internal imports

const useSecretKeys = () => {
  const cname = "alamgirh1";
  const [storeSettingKeys, setStoreSettingKeys] = useState(null);

  let stripePromise;

  useEffect(() => {
    const getStoreSetting = async () => {
      try {
        const { storeSetting } = await getOnlineStoreSecretKeys();

        setStoreSettingKeys(storeSetting);
      } catch (error) {
        console.log("error on getting store keys in useSecretKeys hook");
      }
    };
    getStoreSetting();
  }, [cname]);

  const stripePublicKey =
    storeSettingKeys?.stripe_public_key || process.env.NEXT_PUBLIC_STRIPE_KEY;

  if (!stripePromise) {
    stripePromise = loadStripe(`${stripePublicKey}`);
  }

  return { storeSettingKeys, stripePromise };
};

export default useSecretKeys;
