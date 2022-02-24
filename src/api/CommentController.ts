import { IComment } from "../commons/interface";
import axiosPlugin from "./AxiosPlugin";

// get categories list detail
export const GetComment = (postId: string) => {
  return axiosPlugin.get(`comments/details/${postId}`);
};

// add new post detail
export const AddNewComments = (commentDetail: IComment) => {
  return axiosPlugin.post("comments/add", commentDetail);
};
