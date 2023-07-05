import store from "@/store";
import { Message } from "element-ui";

const request = async (url) => {
  const response = await fetch(url);
  const result = await response.json();

  if (response.ok) {
    store.commit("setHeaders", response.headers);
    return result;
  } else {
    console.error(response, result);
    Message.error(`${response.status}: ${result.message}`);
    return null;
  }
};

export default request;
