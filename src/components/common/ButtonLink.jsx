"use client";
import Link from "next/link";

const ButtonLink = ({ url, title }) => {
  return (
    <Link
      href={url}
      className="text-end text-sm text-heading ps-3 underline focus:outline-none hover:bg-white"
    >
      {title}
    </Link>
  );
};

export default ButtonLink;
