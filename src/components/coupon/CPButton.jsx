"use client";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const CPButton = ({ couponCode }) => {
  // react hook
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");

  // handle copy
  const handleCopied = (code) => {
    setCopiedCode(code);
    setCopied(true);
  };

  return (
    <CopyToClipboard text={couponCode} onCopy={() => handleCopied(couponCode)}>
      <button className="block w-full">
        {copied && couponCode === copiedCode ? (
          <span className="text-emerald-600 text-base leading-7 font-semibold">
            Copied!
          </span>
        ) : (
          <span className="uppercase font-serif font-semibold text-base leading-7 text-emerald-600">
            {couponCode}
          </span>
        )}
      </button>
    </CopyToClipboard>
  );
};

export default CPButton;
