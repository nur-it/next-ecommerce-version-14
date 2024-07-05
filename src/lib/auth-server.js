"use server";
import { getServerSession } from "next-auth";
import { getDynamicAuthOptions } from "./next-auth-options";

const { cookies, headers } = require("next/headers");

const getUserToken = async () => {
  const userInfo = cookies().get("_userInfo")?.value;
  if (!userInfo) return null;
  return JSON.parse(userInfo);
};

const getCname = () => {
  const cname = headers().get("host").split(".")[0];
  return cname;
};

const getHeaders = async () => {
  const authOptions = await getDynamicAuthOptions();
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : null,
  };
  return header;
};

const getUserServerSession = async () => {
  const authOptions = await getDynamicAuthOptions();
  const session = await getServerSession(authOptions);
  const userInfo = session?.user || null;

  return userInfo;
};

export { getCname, getHeaders, getUserServerSession, getUserToken };
