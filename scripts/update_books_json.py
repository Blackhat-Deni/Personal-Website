import json
import os

books_path = r'c:\Users\PC\Desktop\Website\data\books.json'
with open(books_path, 'r', encoding='utf-8') as f:
    books = json.load(f)

for book in books:
    if book.get('cover', '').endswith('.webp'):
        book['cover'] = book['cover'][:-5] + '.jpg'

with open(books_path, 'w', encoding='utf-8') as f:
    json.dump(books, f, indent=4)
print("Updated books.json")
