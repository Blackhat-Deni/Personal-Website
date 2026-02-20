import os

root = r'c:\Users\PC\Desktop\Website\assets\images'
print(f"Root exists: {os.path.exists(root)}")
print(f"Root is dir: {os.path.isdir(root)}")

count = 0
for dp, dn, fn in os.walk(root):
    for f in fn:
        count += 1
        if count <= 30:
            full = os.path.join(dp, f)
            size = os.path.getsize(full)
            print(f"  {full} ({size} bytes)")

print(f"\nTotal files found: {count}")

# Check specific directories
for subdir in ['music', 'movies', 'books', 'profile', 'thumbnails', 'misc']:
    p = os.path.join(root, subdir)
    if os.path.exists(p):
        files = []
        for dp2, dn2, fn2 in os.walk(p):
            files.extend(fn2)
        print(f"\n{subdir}/: {len(files)} files")
        for f in files[:5]:
            print(f"  - {f}")
        if len(files) > 5:
            print(f"  ... and {len(files)-5} more")
    else:
        print(f"\n{subdir}/: DOES NOT EXIST")
