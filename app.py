# Week 1: Backend: API Endpoint for Markdown Conversion
from flask import Flask, request, jsonify
import markdown

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    payload = request.get_json(silent=True)
    if not payload or 'markdown' not in payload:
        return jsonify({'error': 'Invalid request. Please send JSON with a markdown field.', 'html': ''}), 400

    markdown_text = payload.get('markdown', '') or ''
    try:
        html = markdown.markdown(
            markdown_text,
            extensions=['extra', 'codehilite', 'toc', 'footnotes'],
            output_format='html5'
        )
        return jsonify({'html': html})
    except Exception as exc:
        return jsonify({'error': f'Markdown conversion failed: {str(exc)}', 'html': ''}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
