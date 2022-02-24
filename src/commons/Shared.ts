import { ICategory } from "./interface";

export const getCategoryName = (categoriesList: ICategory[], id: string) => {
  return categoriesList.length > 0
    ? categoriesList.find((x: ICategory) => x._id === id)?.item
    : "";
};
