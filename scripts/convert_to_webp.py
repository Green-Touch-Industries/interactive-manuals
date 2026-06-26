import os
from PIL import Image

def convert_png_to_webp(directory, quality=82, delete_original=False):
    print(f"Starting conversion in: {directory}")
    print(f"Target quality: {quality}%")
    print("-" * 60)
    
    converted_count = 0
    total_savings = 0
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.png') and not 'test' in file:
                png_path = os.path.join(root, file)
                webp_path = os.path.splitext(png_path)[0] + '.webp'
                
                orig_size = os.path.getsize(png_path)
                
                try:
                    with Image.open(png_path) as img:
                        # Convert RGBA to RGB if saving as WebP lossy and image has transparency
                        # But since these are black-background product photos, they are typically RGB
                        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                            # Create a black background for transparency (since these are black-theme manuals)
                            background = Image.new('RGB', img.size, (0, 0, 0))
                            background.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
                            background.save(webp_path, 'WEBP', quality=quality)
                        else:
                            img.save(webp_path, 'WEBP', quality=quality)
                            
                        webp_size = os.path.getsize(webp_path)
                        savings = orig_size - webp_size
                        savings_pct = (savings / orig_size) * 100
                        total_savings += savings
                        converted_count += 1
                        
                        relative_path = os.path.relpath(png_path, directory)
                        print(f"Converted: {relative_path} ({orig_size/1024:.1f}KB -> {webp_size/1024:.1f}KB, -{savings_pct:.1f}%)")
                        
                        if delete_original:
                            os.remove(png_path)
                            print(f"Deleted original: {relative_path}")
                except Exception as e:
                    print(f"Error converting {file}: {e}")
                    
    print("-" * 60)
    print(f"Conversion complete!")
    print(f"Total files converted: {converted_count}")
    print(f"Total disk space saved: {total_savings / (1024*1024):.2f} MB")

if __name__ == "__main__":
    assets_dir = "/Users/nicholaselia/Desktop/Clients/GTI_2026/interactive-manuals/public/assets/manuals"
    convert_png_to_webp(assets_dir, quality=82, delete_original=False)
