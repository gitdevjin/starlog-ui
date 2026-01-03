import { API_SERVER_URL } from "@/lib/const";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Build backend URL
    const path = (req.query.path as string[]).join("/");
    const targetUrl = `${API_SERVER_URL}/${path}`;

    // Forward headers
    const headers: Record<string, string> = {};
    if (req.headers.cookie) headers.cookie = req.headers.cookie;
    if (req.headers["content-type"])
      headers["content-type"] =
        req.headers["content-type"] || "application/json";

    // Determine body
    let fetchBody: BodyInit | undefined;
    if (req.method === "GET" || req.method === "HEAD") {
      fetchBody = undefined;
    } else if (req.headers["content-type"]?.includes("application/json")) {
      fetchBody = JSON.stringify(req.body); // JSON requests
    } else {
      fetchBody = req as unknown as BodyInit; // FormData/file uploads
    }

    // Forward request to backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: fetchBody,
    });

    // Forward Set-Cookie from backend to browser if present
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("Set-Cookie", setCookie);
    }

    // Forward response body
    const text = await response.text();
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json") && text) {
      try {
        const data = JSON.parse(text);
        res.status(response.status).json(data);
      } catch (err) {
        // Fallback: send raw text if JSON parse fails
        res.status(response.status).send(text);
      }
    } else {
      // Send as plain text or empty response
      res.status(response.status).send(text);
    }
  } catch (err: any) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
}
