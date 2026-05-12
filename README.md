# Markdown Editor with Live Preview

A polished Markdown editor with live HTML rendering powered by a Python Flask backend.

## Features

- **Split-pane UI**: Markdown editor on the left, HTML preview on the right
- **Live preview**: Converts Markdown to HTML as you type
- **Toolbar shortcuts**: Easy insertion of common Markdown blocks
- **Dark mode**: Toggle between light and dark themes
- **Auto-save**: Editor content persists in browser localStorage
- **Word and character count**: Realtime editor stats
- **Export HTML**: Download the rendered preview as a standalone HTML file
- **Clear editor**: Reset content with confirmation
- **Extended Markdown support**:
  - Tables
  - Code blocks
  - Footnotes
  - Table of contents
  - Syntax highlighting via Pygments
- **Responsive design**: Works well on desktop and smaller screens

## Tech stack

- **Backend**: Python, Flask
- **Markdown**: Python `Markdown` library with `extra`, `codehilite`, `toc`, and `footnotes`
- **Frontend**: HTML, CSS, vanilla JavaScript

## Setup

1. Open a terminal in the project folder.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the app:
   ```bash
   python app.py
   ```
4. Open the browser at:
   ```
   http://127.0.0.1:5000
   ```

## Usage

- Type Markdown in the left editor pane.
- The right pane updates automatically with rendered HTML.
- Use toolbar buttons to insert Markdown formatting.
- Toggle dark mode using the switch in the header.
- Export the preview as HTML using the `Export HTML` button.
- Clear the editor using the `Clear` button.

## API

- `GET /` — serves the main editor page
- `POST /convert` — accepts JSON with a `markdown` field and returns rendered HTML in `html`

## Notes

- The app saves editor content and theme preference to browser localStorage.
- The backend returns clean HTML and handles invalid requests gracefully.
- This project is designed for easy customization and extension.

## Weekly progress

1
Week 1: Backend: API Endpoint for Markdown Conversion
2
Week 2: Frontend: HTML Structure for Editor and Preview
3
Week 3: Frontend: JavaScript for Sending Markdown to Backend
4
Week 4: Frontend: JavaScript for Displaying HTML Preview
5
Week 5: Debouncing/Throttling API Requests (Optional)
6
Week 6: Styling and UI Enhancements
7
Week 7: Error Handling and Testing

