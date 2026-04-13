module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/projects/**/images");

  // Custom collection: all projects sorted by date (newest first)
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/projects/*/index.md")
      .filter((item) => !item.inputPath.includes("_template"))
      .sort((a, b) => (b.date || 0) - (a.date || 0));
  });

  // Get unique tags across all projects
  eleventyConfig.addCollection("projectTags", function (collectionApi) {
    const tags = new Set();
    collectionApi
      .getFilteredByGlob("src/projects/*/index.md")
      .filter((item) => !item.inputPath.includes("_template"))
      .forEach((item) => {
        if (item.data.tags) {
          item.data.tags.forEach((tag) => tags.add(tag));
        }
      });
    return [...tags].sort();
  });

  // Date filters
  eleventyConfig.addFilter("readableDate", function (date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  });

  eleventyConfig.addFilter("isoDate", function (date) {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  });

  // Filter to get project slug from URL
  eleventyConfig.addFilter("projectSlug", function (url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1] || parts[parts.length - 2];
  });

  // Filter for image paths relative to project
  eleventyConfig.addFilter("projectImagePath", function (imageSrc, projectUrl) {
    if (imageSrc.startsWith("/") || imageSrc.startsWith("http")) {
      return imageSrc;
    }
    return projectUrl + imageSrc;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
