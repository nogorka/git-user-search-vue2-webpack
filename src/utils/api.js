import request from "@/utils/request";

const api = "https://api.github.com/";

export const apiSearchUsersGet = async (params) => {
  return await request(`${api}search/users?${params}`);
};

export const apiUserGet = async (login) => {
  return await request(`${api}users/${login}`);
};
