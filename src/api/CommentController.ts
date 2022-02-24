import axiosPlugin from "./AxiosPlugin";

// get categories list detail
export const GetComment = (postId: string) => {
  return axiosPlugin.get(`comments/details?productId=${postId}`);
};

// add new post detail
export const AddNewComments = (comment: any) => {
  return axiosPlugin.post("comments/add", comment);
};
