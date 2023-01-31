/**
 * @param {{ posts}} - 从 getAllPageIds 获得的所有 post
 * @param {{ excludeSlug: boolean }} - 需要排除在搜索页面的slug
 */
export default function filterSearchedPosts({
  posts,
  excludeSlug
}) {
  if (!posts || !posts.length) return []
  const searchedPosts = posts
    .filter((post) =>
      !excludeSlug.includes(post?.slug)
    )
  return searchedPosts
}
