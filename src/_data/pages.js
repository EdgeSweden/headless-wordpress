const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  const url = `${process.env.WP_API_URL}/pages?per_page=100`;
  const pages = await EleventyFetch(url, {
    duration: "1h",
    type: "json"
  });
  return pages;
};
