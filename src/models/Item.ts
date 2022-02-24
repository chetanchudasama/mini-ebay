import FileModel from "./FileModel";

export default class Item {
  public title: string;
  public category: string;
  public mobileNumber: string;
  public name: string;
  public email: string;
  public description: string;
  public file: any;
  public price: number;
  public country: string;
  public state: string;
  public isVisiblePublicly: boolean;
  public image: FileModel;

  public constructor() {
    this.title = "";
    this.category = "";
    this.mobileNumber = "";
    this.name = "";
    this.email = "";
    this.description = "";
    this.price = 0;
    this.country = "";
    this.state = "";
    this.isVisiblePublicly = false;
    this.image = new FileModel();
  }
}
