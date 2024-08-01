import { ref } from "vue";
import { Store } from "@tauri-apps/plugin-store";
import { stat, readDir } from "@tauri-apps/plugin-fs";
import { path as Path } from "@tauri-apps/api";
import BagEntry from "./BagEntry";

const appDataDir = ref('');
// Path.appDataDir().then( result => appDataDir.value = result);
const selectedFilesStore = new Store("./selectedFiles.json");
const bagStore = new Store(`${appDataDir}/bags.json`);

async function createBagEntry(path) {
  let basename = await Path.basename(path);
  let fileInfo = await stat(path).catch(reason => console.log(reason));
  let children = null;
  if (fileInfo && fileInfo.isDirectory) {
    let entries = await readDir(path);
    children = await Promise.all(
      entries.map( async entry => createBagEntry( await Path.join(path, entry.name) ))
    );
  }
  return new BagEntry(path, basename, fileInfo, children);
}

async function handleNewFiles(paths) {
  try {
    let selectedFiles = await selectedFilesStore.get("selectedFiles");

    const filteredPaths = paths.filter( path => 
      !selectedFiles.some( 
        selectedFile => selectedFile.path === path
    )); // filter out paths already in Bag

    if (!filteredPaths.length) {
      throw Error("Path(s) already in Bag.");
    }
    
    const newBagEntries = await Promise.all(
      filteredPaths.map( async filteredPath => await createBagEntry(filteredPath))
    );
    
    selectedFiles = [...selectedFiles, ...newBagEntries];

    selectedFilesStore.set("selectedFiles", selectedFiles);
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

export { selectedFilesStore, bagStore, handleNewFiles, removeFile };