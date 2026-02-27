require("dotenv").config();
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("date", function(value, format) {
    const d = new Date(value);
    if (format === "YYYY-MM-DD") return d.toISOString().slice(0, 10);
    return d.toLocaleDateString("sv-SE");
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("decodeHtml", (str) =>
    str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#038;/g, "&")
  );

  eleventyConfig.addAsyncShortcode("wpImage", async function(src, alt, className) {
    if (!src) return "";
    const metadata = await Image(src, {
      widths: [300, 768, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/",
      urlPath: "/assets/images/",
      cacheOptions: { duration: "1d", directory: ".cache" }
    });
    return Image.generateHTML(metadata, {
      alt: alt || "",
      class: className || "",
      sizes: "100vw",
      loading: "lazy",
      decoding: "async"
    });
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
