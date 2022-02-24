export interface ILocation {
  _id: number;
  name: string;
}

export interface ICategory {
  _id: string;
  item: string;
}

export interface IResponseObject {
  data: {
    result: {
      data: any;
    };
  };
}

export interface IComment {
  postId: string;
  comment: string;
}
