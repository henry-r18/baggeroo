import { Store } from "@tauri-apps/plugin-store";

const selectedFilesStore = new Store("./selectedFiles.json");

export default selectedFilesStore;