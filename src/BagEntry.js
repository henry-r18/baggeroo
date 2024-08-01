export default class BagEntry {
    constructor(path, basename, fileInfo, children) {
      this.path = path;
      this.basename = basename;
      this.fileInfo = fileInfo;
      this.children = children;
      this.isDotfile = this.basename.startsWith(".");
    }
  }