import axiosPlugin from "./AxiosPlugin";

// get categories list detail
export const GetCategories = () => {
  return axiosPlugin.get("category/list");
};

// get categories list detail
export const GetCountries = () => {
  return axiosPlugin.get("country/list");
};

export const GetState = (countryId: any) => {
  // TODO update url
  return axiosPlugin.get(`country/state/list/${countryId}`);
};

export const GetPostList = () => {
  return axiosPlugin.get(`product/list`);
};

export const GetPostDetail = (postId: string) => {
  return axiosPlugin.get(`product/details/${postId}`);
};

// add new post detail
export const AddNewPost = (post: any) => {
  return axiosPlugin.post("product/add", post);
};
