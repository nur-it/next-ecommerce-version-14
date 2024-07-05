"use server";
import { cookies } from "next/headers";

const getSession = () => {
  let userInfo;

  if (cookies().get("_userInfo")?.value) {
    userInfo = JSON.parse(cookies().get("_userInfo")?.value);
  }

  return userInfo;
};

export default getSession;
