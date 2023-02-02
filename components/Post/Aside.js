import BLOG from '@/blog.config'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Catalog from './Catalog'

// import WechatPay from '@/components/Post/WechatPay'
// import { ThumbUpIcon, ChevronLeftIcon, ArrowUpIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ArrowUpIcon } from '@heroicons/react/outline'

const Aside = ({ subPageTitle, frontMatter, toc }) => {
  // const [showPay, setShowPay] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)
  // 只有 目录大于3才显示，后续 3 可以改为环境变量
  const showToc = toc.length > 3

  useEffect(() => {
    if (frontMatter.title !== subPageTitle) {
      setShowSubPageTitle(true)
    }
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 900) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [frontMatter, subPageTitle])
  // console.log('aside', frontMatter.id, toc)
  // hidden sticky md:flex md:flex-col md:items-center md:self-start md:ml-8 md:inset-y-1/2
  // notion-aside:sticky-top-148px z-101 flex-1 flex flex-col items-start items-center
  return (
    <>
      <aside className='hidden sticky md:flex md:flex-col md:items-center md:self-start md:ml-8 md:inset-y-1/3'>
        <div>
          {showToc && (
            <Catalog toc={toc} />
          )}
        </div>
        <div className='hidden sticky md:flex md:flex-col md:items-center md:self-start md:ml-8 md:inset-y-1/2'>
          <div className='flex flex-col items-center text-center'>
            {/* <div className='bg-gray-100 dark:bg-gray-700 grid rounded-lg block p-2 gap-y-5 nav'>  */}
            {/* {BLOG.showWeChatPay && (
              <button
                onClick={() => setShowPay((showPay) => !showPay)}
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
              >
                <ThumbUpIcon className='w-5 h-5' />
              </button>
            )}  */}
            {showSubPageTitle && (
              <Link passHref href={`${BLOG.path}/${frontMatter.slug}`} scroll={false}>
                <a className='bg-gray-100 dark:bg-gray-700 grid rounded-lg block p-2 gap-y-5 nav text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'>
                  <ChevronLeftIcon className='w-5 h-5' />
                </a>
              </Link>
            )}
            {showButton && (
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                className='bg-gray-100 dark:bg-gray-700 grid rounded-lg block p-2 gap-y-5 nav text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
              >
                <ArrowUpIcon className='w-5 h-5' />
              </button>
            )}
            {/* </div>  */}
          </div>
        </div>
      </aside>
      {/* {showPay && <WechatPay />}  */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='md:hidden fixed inline-flex bottom-5 right-5 p-2 rounded-lg z-10 shadow bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        >
          <ArrowUpIcon className='bg-gray-100 dark:bg-gray-700 grid rounded-lg block p-2 gap-y-5 nav text-gray-600 dark:text-day w-5 h-5' />
        </button>
      )}
    </>
  )
}

export default Aside
