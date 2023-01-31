/**
 * @param {{ posts}} - 从 getAllPageIds 获得的所有 post
 * @param {{ excludeSlug}} - 需要排除在搜索页面的slug
 */
export default function filterSearchedPosts({
  posts,
  excludeSlug
}) {
  if (!posts || !posts.length) return []
  return posts.filter((post) => !excludeSlug.includes(post.slug))
}
