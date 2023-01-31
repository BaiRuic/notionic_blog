import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export default function search({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />
}
export async function getStaticProps() {
  // 只能搜索 notionPageID下的 页面。
  const allPosts = await getAllPosts({ onlyNewsletter: false })
  const excludeSlug = ['index', 'newsletter', 'notes', 'about', 'projects', 'friends', 'books']
  // 移除不需要显示在搜索页面的 post
  const posts = allPosts.filter((post) => !excludeSlug.includes(post.slug))
  // const posts = filterSearchedPosts({
  //   posts: allPosts,
  //   excludeSlug: excludeSlug
  // })

  const tags = getAllTagsFromPosts(posts)
  return {
    props: {
      tags,
      posts
    },
    revalidate: 1
  }
}
