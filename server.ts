import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Direct backend proxy route to WordPress REST API
  app.get("/api/wordpress-posts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 12;
      const nonce = Date.now();
      const wpUrl = `https://crm.asofeder.org/wp-json/wp/v2/posts?_embed&per_page=${limit}&_t=${nonce}`;

      const response = await fetch(wpUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ASOFEDER-App',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `WordPress API status ${response.status}` });
      }

      const posts = await response.json();
      return res.json(posts);
    } catch (error: any) {
      console.error('Error fetching WordPress REST API:', error?.message || error);
      return res.status(500).json({ error: 'Failed to fetch posts from WordPress REST API' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
