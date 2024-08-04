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

/**
 * 
 * @param {Array<String>} path Path of file to remove
 */
async function removeFiles(paths) {

  const traverseBagEntries = (bagEntries) => {
    paths.forEach( path => {
      let foundBagEntryIndex = bagEntries.findIndex( bagEntry => {
        let pathMatch = bagEntry.path === path;
  
        if (!pathMatch && bagEntry.children && bagEntry.children.length) {
          traverseBagEntries(bagEntry.children);
        }
  
        return pathMatch;
      });
      console.log(foundBagEntryIndex)
      if (foundBagEntryIndex != -1) {
        bagEntries.splice(foundBagEntryIndex, 1);
      }
    });
    
    return bagEntries;
  };

  try {
    let selectedFiles = await selectedFilesStore.get("selectedFiles");
    selectedFiles = traverseBagEntries(selectedFiles);
    selectedFilesStore.set("selectedFiles", selectedFiles);
  } catch (error) {
    return Promise.reject(error);
  }
}

selectedFilesStore.set("selectedFiles", [])

export { selectedFilesStore, bagStore, handleNewFiles, removeFiles };