import store from "@/store";

const baseUrl = "https://api.github.com/search/users?";

export const request = async (url) => {
  return await fetch(url);
};
const sendRequest = async (url, useBaseUrl = true) => {
  if (useBaseUrl) url = baseUrl + url;

  const response = await fetch(url);

  if (response.ok) {
    const links = response.headers.get("link");
    if (links) parseLinks(links);

    return await response.json();
  } else {
    console.error(response.status, response);
    return null;
  }
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

export default sendRequest;
