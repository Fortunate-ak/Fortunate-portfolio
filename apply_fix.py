
import os

path = 'app/page.tsx'
with open(path, 'rb') as f:
    content_bin = f.read()

# Try to decode with utf-8 first, fallback to latin-1
try:
    content = content_bin.decode('utf-8')
    encoding_used = 'utf-8'
except UnicodeDecodeError:
    content = content_bin.decode('latin-1')
    encoding_used = 'latin-1'

print(f"Read with {encoding_used}")

fixed_content = content.replace('function useScrollReveal(margin = "-80px") {', 'function useScrollReveal(margin: UseInViewOptions["margin"] = "-80px") {')
fixed_content = fixed_content.replace('const opts = { once: true, margin };', 'const opts: UseInViewOptions = { once: true, margin };')

if fixed_content == content:
    print("No changes made - strings might not match exactly.")
    # Try more generic replacement
    fixed_content = content.replace('function useScrollReveal(margin = "-80px")', 'function useScrollReveal(margin: UseInViewOptions["margin"] = "-80px")')

with open(path, 'wb') as f:
    f.write(fixed_content.encode('utf-8'))
print("Done")
