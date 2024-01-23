import { getAllBooks, getAllTagsFromPosts } from '@/lib/notion'
import BooksLayout from '@/layouts/book'

export default function Tag({ tags, posts, currentTag }) {
  return <BooksLayout tags={tags} posts={posts} currentTag={currentTag} />
}

export async function getStaticProps({ params }) {
  const currentTag = params.booktag
  let books_db_id = '0e7133b25649416a86b0372a5ee212b9'
  const posts = await getAllBooks({ pageId: books_db_id, onlyShow: true })
  const tags = getAllTagsFromPosts(posts)
  const filteredPosts = posts.filter(
    (post) =>
      post &&
      ((post?.tags && post.tags.includes(currentTag)) ||
        (post?.Tags && post.Tags.includes(currentTag)))
  )

  //console.log(`当前标签： ${currentTag}, 满足条件的：${filteredPosts.length}`)
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  let books_db_id = '0e7133b25649416a86b0372a5ee212b9'
  const posts = await getAllBooks({ pageId: books_db_id, onlyShow: true })
  const tags = getAllTagsFromPosts(posts)
  return {
    paths: Object.keys(tags).map((booktag) => ({ params: { booktag } })),
    fallback: true
  }
}
