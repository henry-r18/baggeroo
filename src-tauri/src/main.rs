// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use bagr::bagit::{ create_bag, DigestAlgorithm, BagInfo };

#[tauri::command]
fn run_bagr(payload_path: String, algorithm_strings: Vec<&str>) {
    println!("Preparing Bag for payload: {}", payload_path);
    let dst_dir = "/Users/henry/Development/rust-learning/bag-generator/.testing/test_bag";

    let mut digest_algorithms = Vec::new();

    for algorithm_string in algorithm_strings {
        match algorithm_string.parse::<DigestAlgorithm>() {
            Ok(algorithm) => digest_algorithms.push(algorithm),
            Err(err) => println!("Invalid algorithm string: {}", err),
        }
    }

    match create_bag(payload_path, dst_dir, BagInfo::new(), &digest_algorithms, false) {
        Ok(_bag) => {
            println!("Bag created successfully!");
            // Further operations with the created bag...
        }
        Err(err) => {
            eprintln!("Error creating bag: {}", err);
            // Handle the error...
        }
    }
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
