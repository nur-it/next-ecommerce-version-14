"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
// internal imports
import { getOnlineStoreSecretKeys } from "@services/SettingServices";

let stripePromise;

const getStripe = () => {
  const cname = "nurit";
  const [storeSetting, setStoreSetting] = useState(null);

  useEffect(() => {
    getOnlineStoreSecretKeys({ cname })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, [cname]);

  const stripePublicKey =
    storeSetting?.stripe_public_key || process.env.NEXT_PUBLIC_STRIPE_KEY;

  if (!stripePromise) {
    stripePromise = loadStripe(`${stripePublicKey}`);
  }

  return { stripePromise, storeSetting };
};

export default getStripe;
