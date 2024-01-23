import Link from 'next/link'
import Image from 'next/image'
import BLOG from '@/blog.config'
import { motion } from 'framer-motion'
import style from './bookcard.module.css'
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

const Tag = ({ tag }) => {
  return (
    <div className='tag text-gray-500 text-left font-sans text-sm font-normal relative h-4 flex items-center justify-center rounded-md'>
      {tag}
    </div>
  )
}

const BookCard = ({ post }) => {
  const postId = post.id.replace(/-/g, '')
  return (
    <motion.div>
      <div className={`${style.card} dark:bg-gray-700 dark:text-white`}>
        <div className={style.infoContainer}>
          <div className='text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100'>
            {post?.Name}
          </div>
          <div className='max-h-50 flex-warp items-center relative overflow-hidden justify-start text-black dark:text-gray-100 text-left font-sans text-base'>
            {post?.Author}
          </div>
          <div className={style.tagss}>
            {post?.Tags?.map((tag) => (
              <Tag key={post.id + post.date} tag={tag} />
            ))}
          </div>
        </div>
        <div className={style.summary}>{post?.Summary}</div>
        <div className={style.coverContainer}>
          <Link passHref href={`${BLOG.path}/s/${postId}`} scroll={false}>
            <Image
              src={post?.Cover}
              alt='缺失图片'
              layout='fill'
              objectFit='contain'
              className={style.cover}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default BookCard
