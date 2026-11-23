import http.server
import os
import sys

PORT = 8000

class FastDevHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.json': 'application/json',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.webp': 'image/webp',
        '.mp4': 'video/mp4',
    })

    def end_headers(self):
        path = self.path.split('?')[0].lower()
        # Code and markup: NO CACHE so your edits to HTML, CSS, JS, and JSON appear instantly on refresh
        if path.endswith(('.html', '.htm', '.css', '.js', '.json')):
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        else:
            # Heavy media (videos, images, fonts): Cache in browser so 40MB+ videos don't re-download every F5
            self.send_header('Cache-Control', 'public, max-age=86400')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean logging
        status = str(args[1]) if len(args) > 1 else '???'
        path = self.path.split('?')[0]
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
    # Multi-threaded server: serves multiple requests in parallel so heavy media never blocks page load!
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    with http.server.ThreadingHTTPServer(("", PORT), FastDevHTTPRequestHandler) as httpd:
        print(f"========================================================")
        print(f"  Starting High-Performance Multi-Threaded Dev Server")
        print(f"  Listening on http://localhost:{PORT}")
        print(f"  HTML/CSS/JS live-reloading: INSTANT (no-cache)")
        print(f"  Media & Video caching: ENABLED (no reload bottleneck)")
        print(f"========================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nExiting server...")
            sys.exit(0)
