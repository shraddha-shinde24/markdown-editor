const textarea = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const darkModeToggle = document.getElementById('dark-mode');
const exportBtn = document.getElementById('export-html');
const clearBtn = document.getElementById('clear');
const toolbarButtons = document.querySelectorAll('.toolbar button');
const PREVIEW_ENDPOINT = '/convert';
let debounceTimer = null;

function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkModeToggle.checked = enabled;
    localStorage.setItem('dark-mode', enabled);
}

// Week 4: Frontend: JavaScript for Displaying HTML Preview
function setPreviewContent(html) {
    preview.innerHTML = html;
}

function showError(message) {
    preview.innerHTML = `<div class="error">${message}</div>`;
}

function updateStats() {
    const text = textarea.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    wordCount.textContent = `Words: ${words}`;
    charCount.textContent = `Characters: ${chars}`;
}

function applyToolbarText(fragment) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.slice(start, end);
    let insertText = fragment;

    if (selected) {
        if (fragment.includes('**bold**')) {
            insertText = `**${selected}**`;
        } else if (fragment.includes('*italic*')) {
            insertText = `*${selected}*`;
        } else if (fragment.includes('`code`')) {
            insertText = `\`${selected}\``;
        } else if (fragment.includes('[Link]')) {
            insertText = `[${selected}](https://example.com)`;
        }
    }

    textarea.value = textarea.value.slice(0, start) + insertText + textarea.value.slice(end);
    textarea.setSelectionRange(start + insertText.length, start + insertText.length);
    textarea.focus();
    updateStats();
    updatePreview();
}

// Week 3: Frontend: JavaScript for Sending Markdown to Backend
async function updatePreview() {
    const markdownText = textarea.value;
    localStorage.setItem('markdown-content', markdownText);

    if (!markdownText.trim()) {
        setPreviewContent('<p class="placeholder">Preview will appear here as you type Markdown.</p>');
        return;
    }

    try {
        const response = await fetch(PREVIEW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ markdown: markdownText }),
        });

        if (!response.ok) {
            const payload = await response.json().catch(() => ({}));
            throw new Error(payload.error || `Server returned ${response.status}`);
        }

        const data = await response.json();
        if (!data || typeof data.html !== 'string') {
            throw new Error('Invalid response from server');
        }

        setPreviewContent(data.html);
    } catch (error) {
        // Week 7: Error Handling and Testing
        console.error('Preview update failed:', error);
        showError('Cannot render preview. Please reload the page or restart the server.');
    }
}

function exportHTML() {
    const htmlDocument = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Exported Markdown</title>\n<style>body{font-family:Arial,sans-serif;margin:32px;color:#111;}pre,code{background:#f4f4f4;color:#111;border-radius:8px;padding:12px;display:block;overflow-x:auto;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ddd;padding:10px;text-align:left;}th{background:#f2f2f2;}</style>\n</head>\n<body>\n${preview.innerHTML}\n</body>\n</html>`;
    const blob = new Blob([htmlDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown-export.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function clearContent() {
    if (!confirm('Clear all content?')) {
        return;
    }

    textarea.value = '';
    localStorage.removeItem('markdown-content');
    updateStats();
    updatePreview();
}

function init() {
    const savedMarkdown = localStorage.getItem('markdown-content');
    if (savedMarkdown) {
        textarea.value = savedMarkdown;
    }

    setDarkMode(localStorage.getItem('dark-mode') === 'true');
    updateStats();
    updatePreview();

    // Week 5: Debouncing/Throttling API Requests (Optional)
    textarea.addEventListener('input', () => {
        updateStats();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updatePreview, 250);
    });

    darkModeToggle.addEventListener('change', () => setDarkMode(darkModeToggle.checked));
    toolbarButtons.forEach(button => button.addEventListener('click', () => applyToolbarText(button.dataset.md)));
    exportBtn.addEventListener('click', exportHTML);
    clearBtn.addEventListener('click', clearContent);
}

init();
