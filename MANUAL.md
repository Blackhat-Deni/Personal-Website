# Website Manual

Welcome to your new "Vibe Code" personal website.

## Getting Started

To view your website, simply double-click the **`OPEN_WEBSITE.bat`** file in your folder. This will automatically launch the site in your default web browser.

## customization

### Changing the Quote
1. Open `index.html` in a text editor.
2. Find the text inside the `<blockquote>` tag.
3. Replace it with your desired quote.

### Changing Colors & Vibe
1. Open `style.css`.
2. At the very top, inside the `:root` block, you will see a list of variables.
3. Change the hex codes for `--bg-color`, `--text-color`, or `--accent-color` to shift the mood.

### Adding New Pages
1. Duplicate `home.html` or `archive.html` and rename it.
2. Update the content and site navigation links.

### Managing Your Bookshelf
1. Open `bookshelf.html` in your text editor.
2. Find a `<div class="book">` block.
3. Copy and paste it to add a new book.
4. **To add a cover image**: Replace the `<h3>` and `<p>` tags inside `.cover` with an `<img src="URL_TO_IMAGE">`.
5. Update the `<div class="spine">` text.
6. Change the spine color by editing `style="--spine-color: #HEXCODE;"`.

## Technical Details

- **Transitions**: The site uses a simple CSS opacity transition controlled by `script.js`. When you click a link, the page fades out before navigating.
- **Background**: The splash page (`index.html`) features a particle system drawn on an HTML5 Canvas. It reacts to mouse movement.
