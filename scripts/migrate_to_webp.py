from PIL import Image
import os

root_dir = r'c:\Users\PC\Desktop\Website\assets\images'

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg')):
                source_path = os.path.join(root, file)
                # Keep same basename, change extension to .webp
                basename = os.path.splitext(file)[0]
                dest_path = os.path.join(root, f"{basename}.webp")
                
                try:
                    with Image.open(source_path) as img:
                        # Use lossless=True as requested for "lossless compression" efficiency
                        img.save(dest_path, 'webp', lossless=True)
                    print(f"Converted: {source_path} -> {dest_path}")
                    # Delete original after successful conversion
                    os.remove(source_path)
                    print(f"Deleted original: {source_path}")
                except Exception as e:
                    print(f"Failed to convert {source_path}: {e}")

if __name__ == "__main__":
    print(f"Starting batch conversion in {root_dir}...")
    convert_to_webp(root_dir)
    print("Batch conversion completed.")
