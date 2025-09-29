#!/usr/bin/env bun
import { serve } from "bun";
import { readdir } from "fs/promises";
import { join, extname } from "path";

const PORT = 3000;
const DIST_DIR = join(process.cwd(), "dist");

// MIME types
const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

const getMimeType = (filename: string): string => {
  const ext = extname(filename).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
};

const server = serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    let filePath = decodeURIComponent(url.pathname);

    // Handle root path
    if (filePath === "/") {
      filePath = "/index.html";
    }

    // Try to serve from dist directory
    try {
      const distFilePath = join(DIST_DIR, filePath.slice(1));
      const distFile = Bun.file(distFilePath);

      if (await distFile.exists()) {
        return new Response(distFile, {
          headers: {
            "Content-Type": getMimeType(filePath),
          },
        });
      }
    } catch (error) {
      // Continue to next attempt
    }

    // For HTML files, serve index.html (SPA fallback)
    if (filePath.endsWith(".html") || !extname(filePath)) {
      try {
        const indexPath = join(DIST_DIR, "index.html");
        const indexFile = Bun.file(indexPath);

        if (await indexFile.exists()) {
          return new Response(indexFile, {
            headers: {
              "Content-Type": "text/html",
            },
          });
        }
      } catch (error) {
        // Continue to 404
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(`📁 Serving files from: ${DIST_DIR}`);
