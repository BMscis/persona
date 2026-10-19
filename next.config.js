module.exports = {
  reactStrictMode: true,
  // scripts/build-cv-pdf.mjs builds into a separate, git-ignored folder.
  distDir: process.env.NEXT_DIST_DIR || "docs",
};
