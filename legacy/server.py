#!/usr/bin/env python3
"""
dotMKV Production Studio Dashboard Server
Serves the dashboard locally on port 8080 with zero external dependencies.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        '': 'application/octet-stream',
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for smooth local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 65)
            print("  dotMKV Production Studio Dashboard")
            print(f"  Server running at: {url}")
            print(f"  Serving files from: {DIRECTORY}")
            print("=" * 65)
            print("Press Ctrl+C to stop the server.\n")

            # Try to open default browser
            try:
                webbrowser.open(url)
            except Exception:
                pass

            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"Port {PORT} is already in use. Trying port 8081...")
            try:
                with socketserver.TCPServer(("", 8081), Handler) as httpd:
                    url = f"http://localhost:8081"
                    print(f"Server running at: {url}")
                    webbrowser.open(url)
                    httpd.serve_forever()
            except Exception as e2:
                print(f"Failed to start on fallback port: {e2}")
        else:
            print(f"Error starting server: {e}")
    except KeyboardInterrupt:
        print("\nShutting down server gracefully. Goodbye!")
        sys.exit(0)

if __name__ == '__main__':
    run_server()
