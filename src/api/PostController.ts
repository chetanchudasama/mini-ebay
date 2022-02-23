import Item from "../models/Item";
import axiosPlugin from "./AxiosPlugin";

// get categories list detail
export const GetCategories = () => {
  return axiosPlugin.get("categories");
};

// get categories list detail
export const GetCountries = () => {
  return axiosPlugin.get("countries");
};

export const GetState = (countryId: number) => {
  // TODO update url
  return axiosPlugin.get("state");
};

// add new post detail
export const AddNewPost = (post: Item) => {
  return axiosPlugin.post("add-post", post);
};
