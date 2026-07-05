import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { team } from "@/lib/team";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/team", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          ...team.map((m) => ({ path: `/team/${m.slug}`, changefreq: "monthly", priority: "0.6" })),
        ];
        const lastmod = new Date().toISOString().split("T")[0];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map(
            (e) =>
              `  <url><loc>${SITE_URL}${e.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
