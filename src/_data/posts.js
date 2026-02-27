const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  const url = `${process.env.WP_API_URL}/posts?per_page=100&_embed`;
  const posts = await EleventyFetch(url, {
    duration: "1h",
    type: "json"
  });
  return posts;
};
