import { getAllTagsFromPosts } from '@/lib/notion'
import BooksLayout from '@/layouts/book'
import { getAllBooks } from '@/lib/notion'
import BLOG from '@/blog.config'

export default function search({ tags, posts }) {
  return <BooksLayout tags={tags} posts={posts} />
}

export async function getStaticProps() {
  let books_db_id = BLOG.notionBookDbPageId
  // 获取 book 数据库中的所有页面
  const posts = await getAllBooks({ pageId: books_db_id, onlyShow: true })
  // 获取所有的标签，以字典形式返回， key为标签，value为标签出现的次数
  const tags = getAllTagsFromPosts(posts)
  return {
    props: {
      tags,
      posts
    },
    revalidate: 1
  }
}
