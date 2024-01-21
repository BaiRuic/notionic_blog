import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
// import Hero from '@/components/Hero/Home'
import Pagination from '@/components/Pagination'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })

  // 从 posts 中找到 slug 为 index 的页面， index 必然是hidden的，所以只能通过 getAllPosts({ onlyHidden: true }) 来获取
  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'index')

  let blockMap = null
  try {
    blockMap = await getPostBlocks(hero.id) // 这里hero 是undefined ,所以在控制台会报错
  } catch (err) {
    blockMap = null
    console.error('当前不显示hero')
    // return { props: { post: null, blockMap: null } }
  }
  // 按照 BLOG.postsPerPage 长度来分页
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      blockMap
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext, blockMap }) => {
  // 这是主页要显示的内容, 通过map函数 从 postsToShow 中取出来且放到 BlogPost 组件中
  // 打印 所以 postsToShow 的内容
  // console.log(postsToShow)
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      {/* <Hero blockMap={blockMap} />  */}
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog
