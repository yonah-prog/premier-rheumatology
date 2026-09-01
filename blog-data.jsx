// Blog data — articles produced by the seo-agent pipeline, QA-gated and
// reviewed before publish. The publisher appends entries at the TOP of POSTS
// (newest first); blog.html and each blog/<slug>.html render from this file.
//
// Shape: { slug, title, category, date (ISO), dateDisplay, readTime, author,
//          excerpt, htmlBody } — htmlBody uses the same [data-wp-body]
//          typography as the condition articles.

const POSTS = [
];

window.POSTS = POSTS;
