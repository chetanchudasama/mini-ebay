import Item from "../models/Item";
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
  const response = [
    {
      category: "62165c9bf70193fd06629315",
      country: "245",
      state: "4110",
      title: "Iphone 11",
      description: "this is bcd",
      price: 5555,
      name: "chetan",
      email: "chetan@gmail.com",
      mobile: "7878787878",
      isPublic: true,
      comments: ["bbbb", "cccc"],
      _id: "12312",
    },
    {
      category: "62166360f70193fd06629316",
      country: "245",
      state: "4110",
      title: "Iphone 12",
      description: "this is bcd",
      price: 5555,
      name: "chetan",
      email: "chetan@gmail.com",
      mobile: "7878787878",
      isPublic: true,
      comments: ["bbbb", "cccc"],
      _id: "234",
    },
  ];
  return response;
  // return axiosPlugin.get(`product/list`);
};

export const GetPostDetail = (postId: string) => {
  return {
    category: "62165c9bf70193fd06629315",
    country: "245",
    state: "4110",
    title: "Iphone 11",
    description: "this is bcd",
    price: 5555,
    name: "chetan",
    email: "chetan@gmail.com",
    mobile: "7878787878",
    isPublic: true,
    comments: ["bbbb", "cccc"],
    _id: "12312",
    imageURL: "https://m.media-amazon.com/images/I/51+Uw6N7BnL._AC_SX466_.jpg",
  };
  // return axiosPlugin.get(`product/details/${postId}`);
};

// add new post detail
export const AddNewPost = (post: any) => {
  return axiosPlugin.post("product/add", post);
};
