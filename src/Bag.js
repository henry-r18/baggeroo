import { ref } from "vue";

export default class Bag {
  constructor(bagEntries, bagInfo, digestAlgorithms, targetDirectory) {
    this.bagEntries = bagEntries || ref([]);
    this.bagInfo = bagInfo || {};
    this.digestAlgorithms = digestAlgorithms;
    this.targetDirectory = targetDirectory;
  }

  get totalBytes() {
    return this._calculateTotalBytes();
  }

  get fileCount() {
    return this._calculateFileCount();
  }

  _calculateTotalBytes = () => {
    let bagEntries = this.bagEntries.value;
    let sizeSum = 0;

    function traverseBagEntries(bagEntries) {
      bagEntries.forEach((bagEntry) => {
        if (bagEntry.fileInfo) {
          sizeSum += bagEntry.fileInfo.size;
        }

        if (bagEntry.children) {
          traverseBagEntries(bagEntry.children);
        }
      });
    }

    traverseBagEntries(bagEntries);
    return sizeSum;
  };

  _calculateFileCount = () => {
    let bagEntries = this.bagEntries.value;
    let fileCount = 0;

    function traverseBagEntries(bagEntries) {
      bagEntries.forEach((bagEntry) => {
        if (bagEntry.fileInfo && !bagEntry.isDotfile) {
          fileCount++;
        }

        if (bagEntry.children) {
          traverseBagEntries(bagEntry.children);
        }
      });
    }

    traverseBagEntries(bagEntries);
    return fileCount;
  };
}
