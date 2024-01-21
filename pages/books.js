// 作用：抓取 slug 为 books_content的页面内的表格数据，以更优雅的形式展示在页面上

//import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBooks } from '@/lib/notion'
import Contact from './contact'
import BLOG, { timezone } from '@/blog.config'
import { motion } from 'framer-motion'
import Container from '@/components/Container'
import FormattedDate from '@/components/Common/FormattedDate'
export async function getStaticProps() {
    // 从 posts 中找到 slug 为 books_content 的页面， books_content 必然是hidden的
    // const posts = await getAllPosts({ onlyHidden: true })
    // const books_page = posts.find((t) => t.slug === 'books_content')


    //let books_db_id = books_page.id
    //console.log("原始 books_db_id", books_db_id)
    let books_db_id = "0e7133b25649416a86b0372a5ee212b9"
    console.log("直接跳转到的books_id", books_db_id)

    const books_list = await getAllBooks({ pageId: books_db_id, onlyShow: true })

    console.log("----------books start")
    console.log("books", books_list.length)
    console.log("----------books end")

    return {
        props: {
            books_list
        },
        revalidate: 1
    }
}

// {
//     id: '25598bd5-ccf3-4f46-bb3e-5a57c82cc7b0',
//     Times: '1',
//     Data: { end_date: '2021-04-30', start_date: '2021-04-07' },
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

// books_list 中包含了所有的书籍的信息，包括了书籍的封面，书籍的标题，书籍的作者，书籍的简介，书籍的阅读进度
//实现一个装书籍的容器，包括书籍的封面，书籍的标题，书籍的作者，书籍的简介，书籍的阅读进度
const BookCard = ({ post }) => {
    return (
        <motion.div>
            <Link passHref href={`${BLOG.path}/s/${post?.id}`} scroll={false}>
                <article
                    key={post?.id}
                    className='group flex flex-col overflow-hidden relative mb-5 md:mb-8 cursor-pointer rounded-xl p-5'
                >
                    <Image
                        fill
                        alt={`${post?.Name}`}
                        src={post?.page_cover}
                        className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200'
                    />
                    <div className='hidden md:block md-cover absolute inset-0'></div>
                    <div className='md:hidden sm-cover absolute inset-0'></div>
                    <div className='relative mt-auto'>
                        <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
                            <h2 className='text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100'>{post?.Name}</h2>
                            <span className='text-color-fix font-light flex-shrink-0 text-gray-600 dark:text-gray-400'>
                                <FormattedDate date={post?.Date.end_date} />
                            </span>
                        </header>
                        <p className='font-light hidden md:block leading-8 text-gray-700 dark:text-gray-300'>{post?.Summary}</p>
                    </div>
                </article>
            </Link>
        </motion.div>
    )
}

const BookCard1 = ({ post }) => {
    return (
        <motion.div>
            <div className='flex items-center'>
            <div style={{ width: '90px', height: '130px' }}>
                <img src={post.page_cover} alt='Image' className='w-full h-full object-cover object-center rounded-lg' />
            </div>
                <div>
                    <p>{post?.Name}</p>
                    <p>{post?.Summary}</p>
                    <p>{post?.Date.end_date}</p>
                </div>
            </div>
        </motion.div>
    );
};


const bookshelf = ({ books_list }) => {
    // 这是主页要显示的内容, 通过map函数 从 postsToShow 中取出来且放到 BlogPost 组件中
    // 打印 所以 postsToShow 的内容
    // console.log(postsToShow)
    books_list.map((book) => (
        console.log(book.Name)
    ))

    return (

        <Container title={BLOG.title} description={BLOG.description}>
            {
                books_list.map((book) => (
                    <BookCard post={book} />
                ))
            }
        </Container >
    )
}

export default bookshelf



