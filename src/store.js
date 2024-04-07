import { Store } from "@tauri-apps/plugin-store";
import { stat, readDir } from "@tauri-apps/plugin-fs";
import { path as Path } from "@tauri-apps/api";

const selectedFilesStore = new Store("./selectedFiles.json");

// TODO: make recursive
async function calculateDirectorySize(path) {
  let sum = 0;
  let entries = await readDir(path);
  for (const entry of entries) {
    let entryPath = await Path.join(path, entry.name);
    let fileInfo = await stat(entryPath);
    sum += fileInfo.size;
  }
  return sum;
}

async function getMetadata(paths) {
  let metadata = paths.map(async (path) => {
    let fileInfo = await stat(path); // stat() returns FileInfo object
    if (fileInfo.isDirectory) {
      fileInfo.size = await calculateDirectorySize(path);
    }
    return { path, ...fileInfo }; // construct metadata object
  });
  return await Promise.all(metadata);
}

async function handleNewFiles(paths) {
  try {
    let selectedFiles = await selectedFilesStore.get("selectedFiles");
    let filteredPaths = paths.filter( path => 
      !selectedFiles.some( 
        selectedFile => selectedFile.path === path
    )); // filter out paths already in Bag
    if (filteredPaths.length) {
      selectedFiles = [...selectedFiles, ...await getMetadata(filteredPaths)];
      selectedFilesStore.set("selectedFiles", selectedFiles);
    } else {
      throw Error("Path(s) already in Bag.");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

// FIX: removing all files when called
async function removeFile(path) {
  try {
    console.log(path);
    let selectedFiles = await selectedFilesStore.get("selectedFiles");
    selectedFiles = selectedFiles.filter(selectedFile => selectedFile.path != path);
    selectedFilesStore.set("selectedFiles", selectedFiles);
  } catch (error) {
    return Promise.reject(error);
  }
}

selectedFilesStore.set("selectedFiles", [])

export { selectedFilesStore, handleNewFiles, removeFile };