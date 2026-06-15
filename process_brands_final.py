from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import os

def process_logo(input_path, output_path, scale_factor=4):
    # 1. Load and upscale with high quality
    img = Image.open(input_path).convert('RGBA')
    w, h = img.size
    
    # Upscale for better processing
    img_big = img.resize((w * scale_factor, h * scale_factor), Image.LANCZOS)
    pixels = img_big.load()
    bw, bh = img_big.size
    
    # 2. Determine background color from corners
    corner_samples = []
    for cx, cy in [(3, 3), (bw - 3, 3), (3, bh - 3), (bw - 3, bh - 3)]:
        corner_samples.append(pixels[cx, cy][:3])
    
    bg_r = sum(s[0] for s in corner_samples) // len(corner_samples)
    bg_g = sum(s[1] for s in corner_samples) // len(corner_samples)
    bg_b = sum(s[2] for s in corner_samples) // len(corner_samples)
    
    threshold = 30  # Background detection threshold
    edge_zone = threshold * 0.5  # Smooth edge transition
    
    # 3. Process pixels with smooth edge handling
    alpha_channel = img_big.split()[3]
    gray = img_big.convert('L')
    
    # 4. Gentle but effective contrast enhancement
    enhancer = ImageEnhance.Contrast(gray)
    gray = enhancer.enhance(1.5)  # More than before (1.2), but not harsh
    
    # Apply subtle auto-contrast
    gray = ImageOps.autocontrast(gray, cutoff=0.5)
    
    # 5. Merge grayscale with alpha
    result_big = Image.merge('RGBA', (gray, gray, gray, alpha_channel))
    
    # 6. Downscale back with LANCZOS - preserves anti-aliasing
    result = result_big.resize((w, h), Image.LANCZOS)
    
    # Save as PNG with high quality
    result.save(output_path, 'PNG', quality=95)
    return (w, h)

# Process all 15 brand logos
src_dir = r'.\jkess-website\public\images\brands'
dst_dir = r'.\jkess-website\public\images\brands-processed'
os.makedirs(dst_dir, exist_ok=True)

# Clean old processed files
for f in os.listdir(dst_dir):
    os.remove(os.path.join(dst_dir, f))

for i in range(1, 16):
    src = os.path.join(src_dir, f'brand-{i}.jpg')
    dst = os.path.join(dst_dir, f'brand-{i}.png')
    if os.path.exists(src):
        size = process_logo(src, dst, scale_factor=4)
        print(f'OK brand-{i}.png  ({size[0]}x{size[1]})')
    else:
        print(f'MISSING brand-{i}.jpg')

print('\nProcessing complete!')
