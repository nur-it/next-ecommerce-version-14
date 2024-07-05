"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const getCookieData = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (Cookies.get("_userInfo")) {
      const user = JSON.parse(Cookies.get("_userInfo"));

      setUserInfo(user || {});
    }
  }, []);

  return { userInfo };
};

export default getCookieData;
