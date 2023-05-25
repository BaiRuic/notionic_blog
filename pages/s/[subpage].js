import BLOG from '@/blog.config'
import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { useRouter } from 'next/router'

import { getAllPagesInSpace, getPageBreadcrumbs, getPageTitle, getPageProperty, idToUuid } from 'notion-utils'
import { defaultMapPageUrl } from 'react-notion-x'

import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'

const Post = ({ post, blockMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Loading notionSlug={router.asPath.split('/')[2]} />
    )
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }
  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const mapPageUrl = defaultMapPageUrl(BLOG.notionPageId)

  const pages = await getAllPagesInSpace(
    BLOG.notionPageId,
    BLOG.notionSpacesId,
    getPostBlocks,
    {
      traverseCollections: false
    }
  )

  const subpageIds = Object.keys(pages)
    .map((pageId) => '/s' + mapPageUrl(pageId))
    .filter((path) => path && path !== '/s/')

  // Remove post id
  const posts = await getAllPosts({ onlyNewsletter: false })
  const postIds = Object.values(posts)
    .map((postId) => '/s' + mapPageUrl(postId.id))
  const noPostsIds = subpageIds.concat(postIds).filter(v => !subpageIds.includes(v) || !postIds.includes(v))

  const heros = await getAllPosts({ onlyHidden: true })
  const heroIds = Object.values(heros)
    .map((heroId) => '/s' + mapPageUrl(heroId.id))
  const paths = noPostsIds.concat(heroIds).filter(v => !noPostsIds.includes(v) || !heroIds.includes(v))

  return {
    paths,
    fallback: true
  }
  // return {
  //   paths: [],
  //   fallback: true
  // }
}

export async function getStaticProps({ params: { subpage } }) {
  // console.log('----', subpage)
  const posts = await getAllPosts({ onlyNewsletter: false })

  let blockMap, post
  try {
    // blockMap存放了该页面所有内容！每一个小内容又包含一个id
    blockMap = await getPostBlocks(subpage)
    const id = idToUuid(subpage)

    // 获取导航标记, 导航标记用来推测是否为 子页面 还是 链接自别处的页面
    const breadcrumbs = getPageBreadcrumbs(blockMap, id)
    /*
    此处的post即为 subpage, supage 有如下两种，
      一种是在当前页面建立的一个block, 此种情况 subpage post的id依旧属于其建立页面
      一种是 链接自别的地方存储的页面s, 这个s可能在 notionPagetId 所表示的database中，也可能是别处的；
        当 s 在 database 中时，可直接从 getAllPosts 得到的posts中find得到。
        当 s不再database 中时，是无法搜索得到的，此时：
          要么需要把 undefined 的 post 转为 null,否则会报错；
          要么 就去拿到该页面的数据，然后把该页面当作一个普通 Page 去渲染。（当前做法）
          此时，因为 该页面来自别的database,可能没有 tags slugs summary 等属性，所以需要手动填充 post
    */

    /*
    此处查找的时候为什么不直接使用 id, 而要使用 breadcrumbs[0].block.id，这是因为：
      如果 当前子页面 是原生的父页面创建的一个block，那么breadcrumbs[0].block.id 为根父页面的id.即把当前子页面当作父页面的block
      反之(即链接自别处的)，breadcrumbs[0].block.id 为当前子页面的id.即不把其当作子页面来处理。
    */

    // 先从 database 中得到的所有 posts 查找，找不到就是null
    post = posts.find((t) => t.id === breadcrumbs[0].block.id) || null
    /*  console.log('all posts:', posts)
    console.log('------')
    console.log('id: ', id)
    console.log('------')
    console.log('subpage: ', subpage)
    console.log('------')
    console.log('blockMap: ', blockMap)
    console.log('blockMap: ', blockMap.block[id].value)
    console.log('blockMap: ', blockMap.block[id].value.properties)
    console.log('------')
    console.log('breadcrumbs: ', breadcrumbs)
    console.log('------')
    console.log('post: ', post) */
  } catch (err) {
    console.error(err)
    return { props: { post: null, blockMap: null } }
  }
  // 保证 page 是在 个人space中的，不然不给渲染。
  const NOTION_SPACES_ID = BLOG.notionSpacesId
  const pageAllowed = (page) => {
    // When page block space_id = NOTION_SPACES_ID
    let allowed = false
    Object.values(page.block).forEach(block => {
      if (!allowed && block.value && block.value.space_id) {
        allowed = NOTION_SPACES_ID.includes(block.value.space_id)
      }
    })
    return allowed
  }

  if (!pageAllowed(blockMap)) {
    return {props: { post: null, blockMap: null }}
  }

  // 此处如果post为 null,而blockMap不为空， 只有一种可能那就是：
  // 当前 subpage 为链接自 非notionPageID 对应的 database 的页面。
  // 因此需要手动填充 post
  if (post === null) {
    const pageId = idToUuid(subpage)
    const pageTitle = getPageTitle(blockMap)
    const createdTime = getPageProperty('Created', blockMap.block[pageId], blockMap) || null
    post =
    {
      id: pageId,
      date: createdTime,
      type: ['Page'], // type = Page 是没有标签 和 date 的
      slug: pageTitle,
      tags: [],
      summary: '',
      title: pageTitle,
      status: ['Published'],
      page_cover: '/cover.jpg',
      createdTime: '',
      fullWidth: false
    }
  }
  return {
    props: { post, blockMap },
    revalidate: 1
  }
}

export default Post
