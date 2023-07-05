import store from "@/store";
import { Message } from "element-ui";

const baseUrl = "https://api.github.com/search/users?";

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

export const requestWithHeaders = async (url, useBaseUrl = true) => {
  if (useBaseUrl) url = baseUrl + url;

  const data = await request(url);
  const links = store.state.headers.get("link");
  if (links) parseLinks(links);
  return data;
};

const nextPattern = /<(\S*)>; rel="(\S*)"/i;

const parseLinks = (links) => {
  const list = links.split(",");
  list.forEach((link) => {
    link = link.trim();
    store.commit("setLink", {
      type: link.match(nextPattern)[2],
      url: link.match(nextPattern)[1],
    });
  });
};

export default request;
