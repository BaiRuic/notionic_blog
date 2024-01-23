export function getAllTagsFromPosts(posts) {
  const taggedPosts = posts.filter((post) => post?.tags || post?.Tags)
  const tags = [...taggedPosts.map((p) => p.tags || p.Tags).flat()]
  const tagObj = {}
  tags.forEach((tag) => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  return tagObj
}
