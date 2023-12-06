import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const api = async (
  url: string,
  method: "get" | "post" | "put" | "delete",
  data?: { body?: Object; params?: Object }
) => {
  const completeUrl = REACT_APP_API_URL + url;
  const hasBody = ["post", "put"].includes(method);
  const config = {
    headers: {
      Authorization: `${sessionStorage.getItem("@cloneTwitter:token")}`,
    },
    params: data?.params ? data.params : {},
  };

  const response = await axios[method](
    completeUrl,
    hasBody ? data?.body : config,
    hasBody ? config : {}
  );
  return response.data;
};
