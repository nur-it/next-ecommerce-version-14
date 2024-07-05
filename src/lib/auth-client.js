import { useSession } from "next-auth/react";

const getUserSession = () => {
  const { data } = useSession();

  const userInfo = data?.user || null;
  return userInfo;
};

const getClientCname = () => {
  const host = window.location.host;
  const cname = host.split(".")[0]; // get the subdomain from the domain
  return cname;
};

export { getUserSession, getClientCname };
