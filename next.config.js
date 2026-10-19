module.exports = {
  reactStrictMode: true,
  // scripts/build-cv-pdf.mjs builds into a separate, git-ignored folder.
  distDir: process.env.NEXT_DIST_DIR || "docs",
  // Make the CV save as a file instead of opening in the browser's PDF viewer.
  async headers() {
    return [
      {
        source: "/Melvin-Wafula-CV.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Melvin-Wafula-CV.pdf"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [{ source: "/llms.txt", destination: "/api/llms" }];
  },
};
