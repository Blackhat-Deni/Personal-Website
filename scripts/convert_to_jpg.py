import os
from PIL import Image

def convert_webp_to_jpg(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.webp'):
                webp_path = os.path.join(root, file)
                jpg_path = os.path.splitext(webp_path)[0] + '.jpg'
                try:
                    with Image.open(webp_path) as img:
                        # Convert to RGB to avoid issues with alpha channel
                        img = img.convert('RGB')
                        img.save(jpg_path, 'JPEG')
                    os.remove(webp_path)
                    print(f"Converted {webp_path} -> {jpg_path}")
                except Exception as e:
                    print(f"Error converting {webp_path}: {e}")

convert_webp_to_jpg(r'c:\Users\PC\Desktop\Website\assets\images')
