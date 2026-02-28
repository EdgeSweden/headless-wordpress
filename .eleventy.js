require("dotenv").config();
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("date", function(value, format) {
    const d = new Date(value);
    if (format === "YYYY-MM-DD") return d.toISOString().slice(0, 10);
    return d.toLocaleDateString("sv-SE");
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("inCategory", (posts, slug) =>
    posts.filter(p => (p._embedded?.["wp:term"]?.[0] || []).some(c => c.slug === slug))
  );

  eleventyConfig.addFilter("notInCategory", (posts, slug) =>
    posts.filter(p => !(p._embedded?.["wp:term"]?.[0] || []).some(c => c.slug === slug))
  );

  const categoryColors = {
    "lcd-skolan":             "bg-blue-100 text-blue-700",
    "appar":                  "bg-purple-100 text-purple-700",
    "digital-marknadsforing": "bg-pink-100 text-pink-700",
    "programmering":          "bg-teal-100 text-teal-700",
    "sakerhet":               "bg-red-100 text-red-700",
    "spel":                   "bg-green-100 text-green-700",
    "streaming":              "bg-indigo-100 text-indigo-700",
    "webbhotell":             "bg-amber-100 text-amber-700",
    "wordpress":              "bg-orange-100 text-orange-700",
    "ovrigt":                 "bg-gray-100 text-gray-600",
    "uncategorized":          "bg-gray-100 text-gray-600",
  };
  eleventyConfig.addFilter("categoryColor", (slug) =>
    categoryColors[slug] || "bg-gray-100 text-gray-600"
  );

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
