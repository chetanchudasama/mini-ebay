export default class PostDetailModel {
  public title: string;
  public category: string;
  public mobileNumber: string;
  public name: string;
  public email: string;
  public description: string;
  public price: number;
  public country?: number;
  public state?: number;
  public isPublic: boolean;
  public imageUrl: string;

  public constructor() {
    this.title = "";
    this.category = "";
    this.mobileNumber = "";
    this.name = "";
    this.email = "";
    this.description = "";
    this.price = 0;
    this.isPublic = true;
    this.imageUrl = "";
  }
}
