import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import getAllPageIds from './getAllPageIds'
import dayjs from '@/lib/day'
import getPageProperties from './getPageProperties'

/**
 * 读取 存放 阅读列表的database 下的所有页面
 * @param {{ onlyShow: boolean }} - false: all books / true: show only
 * @param {{ readStatus: int }} - 0: all books / 1: want to read / 2: reading / 3: read done
 * @param {{ pageId: string }} - id of database
 */
export async function getAllBooks({
    pageId,
    onlyShow = false,
    readStatus = 0
}) {
  let id = pageId
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  //  response 比 blockMap 少的是背景图，通过 getPostBlocks 函数可以看见。
  // 此处 response 为数据库的下 各个block，其实就是数据库里面的所有页面
  console.log("getAllBooks id", id)
  const response = await api.getPage(id)

  id = idToUuid(id)
  const collection = Object.values(response.collection)[0]?.value
  const collectionQuery = response.collection_query
  // block 为该页面的所有的 小block,
  const block = response.block
  // schema 为 数据库的属性，包括了 数据库列的名称
  const schema = collection?.schema

  const rawMetadata = block[id].value

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.log(`pageId '${id}' is not a database`)
    return null
  } else {
    // Construct Data
    // 通过 getAllPageIds 函数，获取到所有的页面的id，仅仅是id
    const pageIds = getAllPageIds(collectionQuery)
    console.log("books pageIds", pageIds)

    // 下面这个for循环，是通过 pageIds 获取到每个页面的属性，
    // 包括了页面的标题，页面的slug，页面的发布时间，，页面的创建时间，页面的日期 等
    // 存放到data数组中
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null

      // // Add fullwidth, createdtime to properties
      // properties.createdTime = new Date(
      //   block[id].value?.created_time
      // ).toString()
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false
      
      // Convert date (with timezone) to unix milliseconds timestamp
      properties.date = (
        properties.date?.start_date
          ? dayjs.tz(properties.date?.start_date)
          : dayjs(block[id].value?.created_time)
      ).valueOf()

      data.push(properties)
    }

    const posts = data
    // // 移除data中不满足搜索条件的 item
    // const posts = filterPublishedPosts({
    //   posts: data,
    //   onlyNewsletter,
    //   onlyPost,
    //   onlyHidden
    // })

    // // 根据配置文件来，按照日期排序
    // if (BLOG.sortByDate) {
    //   posts.sort((a, b) => b.date - a.date)
    // }
    return posts
  }
}
