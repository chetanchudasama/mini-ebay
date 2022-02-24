export default class FileModel {
  fileName: string;
  fileSrc: string;
  file: File | null;

  constructor() {
    this.fileName = "";
    this.fileSrc = "";
    this.file = null;
  }
}
