import os
import glob
from PIL import Image, ImageOps
import numpy as np

def process_image(src, dst, target_size, factor):
    img = Image.open(src).convert('RGB')
    
    # Scale and center crop to target size
    img_ratio = img.width / img.height
    target_ratio = target_size[0] / target_size[1]
    
    if img_ratio > target_ratio:
        # Image is wider than target
        new_height = target_size[1]
        new_width = int(new_height * img_ratio)
    else:
        new_width = target_size[0]
        new_height = int(new_width / img_ratio)
        
    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    left = (new_width - target_size[0]) // 2
    top = (new_height - target_size[1]) // 2
    right = left + target_size[0]
    bottom = top + target_size[1]
    
    img = img.crop((left, top, right, bottom))
    
    # Convert to numpy array for fast manipulation
    arr = np.array(img).astype(float)
    
    # Calculate luminance
    # standard weights: R=0.299, G=0.587, B=0.114
    luminance = arr[:, :, 0]*0.299 + arr[:, :, 1]*0.587 + arr[:, :, 2]*0.114
    luminance = luminance / 255.0  # 0 to 1
    
    shadow = np.array([4, 20, 44])
    highlight = np.array([124, 196, 245])
    
    # Map to duotone ramp
    # Shape of luminance is (H, W). Expand to (H, W, 1)
    L = luminance[:, :, np.newaxis]
    duotone = shadow + L * (highlight - shadow)
    
    # Multiply by factor
    duotone = duotone * factor
    
    # Clip and convert back
    duotone = np.clip(duotone, 0, 255).astype(np.uint8)
    
    out_img = Image.fromarray(duotone)
    out_img.save(dst, 'JPEG', quality=68)

base_dir = r"C:\Users\victo\.gemini\antigravity\brain\112e13f7-75d1-4ce1-b463-fb34b6cd4385"

mapping = {
    'hero_1_*.jpg': ('public/img/hero/01.jpg', (2400, 1350), 0.85),
    'hero_2_*.jpg': ('public/img/hero/02.jpg', (2400, 1350), 0.85),
    'hero_3_v2_*.jpg': ('public/img/hero/03.jpg', (2400, 1350), 0.85),
    'hero_4_*.jpg': ('public/img/hero/04.jpg', (2400, 1350), 0.85),
    'hero_5_v2_*.jpg': ('public/img/hero/05.jpg', (2400, 1350), 0.85),
    'banner_training_*.jpg': ('public/img/training.jpg', (2400, 1000), 0.78),
    'banner_projects_*.jpg': ('public/img/projects.jpg', (2400, 1000), 0.78),
    'banner_consultancy_*.jpg': ('public/img/consultancy.jpg', (2400, 1000), 0.78),
    'banner_about_v2_*.jpg': ('public/img/about.jpg', (2400, 1000), 0.78),
}

for pattern, (dst_rel, size, factor) in mapping.items():
    matches = glob.glob(os.path.join(base_dir, pattern))
    if matches:
        src = matches[0]
        dst = os.path.join('c:\\dev\\bmg', dst_rel)
        print(f"Processing {src} -> {dst}")
        process_image(src, dst, size, factor)
    else:
        print(f"No match for {pattern}")
