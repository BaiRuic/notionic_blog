import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import getAllPageIds from './getAllPageIds'
import dayjs from '@/lib/day'
import getPageProperties from './getPageProperties'
import getImageFromDouban from '@/lib/getImageFromDouban'
// {
//     id: '25598bd5-ccf3-4f46-bb3e-5a57c82cc7b0',
//     Times: '1',
//     Date: { end_date: '2021-04-30', start_date: '2021-04-07' },
//     Summary: '1数据结构与算法的入门读物。过于简单了，信息密度较低',
//     Tags: [ '科普' ],
//     Cover: 'https://img9.doubanio.com/view/subject/l/public/s29358625.jpg',
//     Status: 'Done',
//     Author: 'Aditya Bhargava',
//     Show: 'No',
//     Name: '算法图解',
//     page_cover: '/cover.jpg',
//     fullWidth: false,
//     date: 1615293960000
//   }

/**
 * 读取 存放 阅读列表的database 下的所有页面
 * @param {{ onlyShow: boolean }} - false: all books / true: show only
 * @param {{ readStatus: int }} - 0: all books / 1: Not Start / 2: In Progress / 3: Done
 * @param {{ pageId: string }} - id of book database
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
  //console.log('getAllBooks id', id)
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
    //console.log('books pageIds', pageIds)

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

    // Filter data, 如果 onlyShow 为 true，则只显示 Show 为 Yes 的页面
    let posts = data
    if (onlyShow) {
      posts = data.filter((t) => t.Show === 'Yes')
    }

    // Filter data, 如果 readStatus 为 0，则显示所有；如果readStatus 为 1，只显示 Status 为 "Not Start" 的页面, 如果 readStatus 为 2，则只显示 Status 为 "In Progress" 的页面; 如果 readStatus 为 3，则只显示 Status 为 "Done" 的页面
    if (readStatus === 1) {
      posts = data.filter((t) => t.Status === 'Not Start')
    } else if (readStatus === 2) {
      posts = data.filter((t) => t.Status === 'In Progress')
    } else if (readStatus === 3) {
      posts = data.filter((t) => t.Status === 'Done')
    }

    // Sort data by date
    posts = posts.sort((a, b) => b.date - a.date)

    // 检查每个 post 是否有 Cover，如果没有，则从豆瓣获取
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      if (!post.Cover || post.Cover === '' || !post.Cover.startsWith('https')) {
        post.Cover = await getImageFromDouban(post.Name)
        console.log(post.Name, post.Cover)
      }
    }

    return posts
  }
}
