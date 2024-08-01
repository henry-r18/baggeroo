// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{io::Error, path::Path};
use bagr::bagit::{ create_bag, BagInfo, DigestAlgorithm, TagList };
use tempfile::TempDir;

fn create_symlinks(paths: Vec<&str>) -> Result<TempDir, Error> {
    let temp_dir = tempfile::Builder::new()
        .prefix("bagr-").tempdir().expect("Problem creating temp dir.");

    for path in paths {
        let target_path = Path::new(path);
        let target_basename = target_path.file_name().expect("Problem parsing supplied path.");
        let symlink_path = &temp_dir.path().join(target_basename);

        if target_path.is_dir() {
            symlink::symlink_dir(target_path, symlink_path).expect("Problem creating a directory symlink.");
        };
        
        if target_path.is_file() {
            symlink::symlink_file(target_path, symlink_path).expect("Problem creating a file symlink.");
        }
    }
    Ok(temp_dir)
}

#[tauri::command]
fn run_bagr(selected_paths: Vec<&str>, target_directory:&str, tags_list: TagList, algorithm_strings: Vec<&str>) {

    println!("Preparing Bag...");
    
    let payload_path: TempDir = create_symlinks(selected_paths).expect("Problem creating symlinks for selected paths.");

    let bag_info: BagInfo = BagInfo::with_tags(tags_list);

    let mut digest_algorithms = Vec::new();

    for algorithm_string in algorithm_strings {
        match algorithm_string.parse::<DigestAlgorithm>() {
            Ok(algorithm) => digest_algorithms.push(algorithm),
            Err(err) => println!("Invalid algorithm string: {}", err),
        }
    }

    match create_bag(payload_path, target_directory, bag_info, &digest_algorithms, false) {
        Ok(_bag) => {
            println!("Bag created successfully!");
            // Further operations with the created bag...
        }
        Err(err) => {
            eprintln!("Error creating bag: {}", err);
            // Handle the error...
        }
    }

    return;
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![run_bagr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
