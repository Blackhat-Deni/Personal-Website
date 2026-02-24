import http.server
import socketserver
import sys

PORT = 8000

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.json': 'application/json',
        '.js': 'application/javascript',
        '.css': 'text/css',
    })

    def end_headers(self):
        # Disable caching for development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging: show status code + path clearly
        # args[0] = request line, args[1] = status code, args[2] = size
        status = str(args[1]) if len(args) > 1 else '???'
        path = self.path.split('?')[0]  # Remove query strings like ?v=...
        if status.startswith('2'):
            icon = '  OK '
        elif status.startswith('3'):
            icon = ' REDIRECT '
        elif status.startswith('4'):
            icon = ' !! MISSING '
        else:
            icon = ' ?? '
        print(f"[{icon}] {status} — {path}")

if __name__ == '__main__':
    # Allow quick restart by reusing the port
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"========================================================")
        print(f"  Starting Local Development Server with NO CACHE")
        print(f"  Listening on http://localhost:{PORT}")
        print(f"  Changes to HTML/CSS/JS will appear on refresh!")
        print(f"")
        print(f"  Watch for '!! MISSING' below — those are broken links.")
        print(f"========================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nExiting server...")
            sys.exit(0)
