import shutil
import os
import zipfile

def create_extension_zip():
    source_dir = 'clientflow-extension'
    zip_name = 'clientflow-extension-v1.0.0.zip'
    
    # Files to include
    include_files = [
        'manifest.json',
        'popup.html',
        'popup.js',
        'styles.css',
        'supabase-client.js',
    ]
    
    # Directories to include
    include_dirs = [
        'icons'
    ]
    
    # Create zip file
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add files
        for file in include_files:
            file_path = os.path.join(source_dir, file)
            if os.path.exists(file_path):
                zipf.write(file_path, file)
                print(f"Added {file}")
            else:
                print(f"Warning: {file} not found!")

        # Add directories
        for dir_name in include_dirs:
            dir_path = os.path.join(source_dir, dir_name)
            if os.path.exists(dir_path):
                for root, dirs, files in os.walk(dir_path):
                    for file in files:
                        # Skip placeholder files if any
                        if file == 'placeholder.txt':
                            continue
                            
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, source_dir)
                        zipf.write(file_path, arcname)
                        print(f"Added {arcname}")

    print(f"\nSuccessfully created {zip_name}")
    print(f"Location: {os.path.abspath(zip_name)}")

if __name__ == '__main__':
    create_extension_zip()
