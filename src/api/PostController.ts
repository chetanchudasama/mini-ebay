import axiosPlugin from "./AxiosPlugin";

// get categories list detail
export const GetCategories = () => {
  return axiosPlugin.get("category/list");
};

// get categories list detail
export const GetCountries = () => {
  return axiosPlugin.get("country/list");
};

export const GetState = (countryId: number) => {
  // TODO update url
  return axiosPlugin.get(`country/state/list?country=${countryId}`);
};

export const GetPostList = () => {
  return axiosPlugin.get(`post/list`);
};

export const GetPostDetail = (postId: string) => {
  return axiosPlugin.get(`post/details/${postId}`);
};

// add new post detail
export const AddNewPost = (post: FormData) => {
  return axiosPlugin.post("post/add", post);
};
