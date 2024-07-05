import Cookies from "js-cookie";

const getToken = () => {
  const userInfo = Cookies.get("_userInfo");
  const token = userInfo?.token;
  return token;
};

export { getToken };
