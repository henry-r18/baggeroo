import { Store } from "@tauri-apps/plugin-store";
import { stat } from "@tauri-apps/plugin-fs";

const selectedFilesStore = new Store("./selectedFiles.json");

async function getMetadata(paths) {
  let metadata = paths.map(async (path) => {
    let fileInfo = await stat(path); // stat() returns FileInfo object
    return { path, ...fileInfo }; // construct metadata object
  });
  return await Promise.all(metadata);
}

async function appendSelectedFiles(newSelectedFiles) {
  let currentSelectedFiles = await selectedFilesStore.get("selectedFiles");
  if (currentSelectedFiles) {
    newSelectedFiles = [...currentSelectedFiles, ...newSelectedFiles];
  }
  selectedFilesStore.set("selectedFiles", newSelectedFiles);
}

// FIX: troubleshoot getting currentSelectedFiles
async function filterAlreadySelected(paths) {
  let currentSelectedFiles = await selectedFilesStore.get("selectedFiles");
  return paths.filter((path) => {
    let isAlreadySelected = currentSelectedFiles.some(
      (file) => file.path == path
    );
    return !isAlreadySelected;
  });
}

async function handleNewFiles(paths) {
  try {
    let filteredPaths = await filterAlreadySelected(paths);
    if (filteredPaths.length) {
      let newFilesMetadata = await getMetadata(filteredPaths);
      appendSelectedFiles(newFilesMetadata);
    } else {
      throw Error("Path(s) already in Bag.");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export { selectedFilesStore, handleNewFiles };