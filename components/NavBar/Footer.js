import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {
  UserIcon,
  UsersIcon,
  RssIcon,
  ClipboardCheckIcon,
  ThumbUpIcon,
  MailIcon
} from '@heroicons/react/outline'
import Social from '../Common/Social.js'
import { motion } from 'framer-motion'
import { useState } from 'react'
import WechatPay from '@/components/Post/WechatPay'
import Vercel from '@/components/Common/Vercel'

const Footer = ({ fullWidth }) => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale]
  const [showCopied, setShowCopied] = useState(false)
  const [showPay, setShowPay] = useState(false)
  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = '/' + router.query.slug
  } else {
    activeMenu = router.pathname
  }

  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  const links = [
    {
      id: 0,
      name: t.NAV.ABOUT,
      to: BLOG.path || '/about',
      icon: <UserIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 1,
      name: t.NAV.FRINEDS,
      to: '/friends',
      icon: <UsersIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.friends
    },
    {
      id: 2,
      name: t.NAV.CONTACT,
      to: '/contact',
      icon: <MailIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.contact
    }
  ]

  return (
    <motion.div
      className={`mt-6 flex-shrink-0 m-auto w-full text-gray-600 dark:text-gray-300 transition-all ${!fullWidth ? 'max-w-3xl md:px-8' : 'px-4 md:px-24'
        }`}
    >
      <footer className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center border-b dark:border-gray-600 py-1'>
          <ul className='flex flex-wrap justify-center md:justify-start md:gap-1'>
            {links.map(
              (link) =>
                link.show && (
                  <Link passHref key={link.id} href={link.to} scroll={false}>
                    <li key={link.id}
                      className={`${activeMenu === link.to
                          ? 'bg-gray-200 dark:bg-gray-700'
                          : ''
                        } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}
                    >
                      <div className='font-light'>
                        {link.icon}
                        <span className='inline-block m-1'>{link.name}</span>
                      </div>
                    </li>
                  </Link>
                )
            )}
            {showCopied ? (
              <button
                disabled
                className='bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex py-1 px-2 rounded-lg items-center'
              >
                <ClipboardCheckIcon className='inline-block mb-1 h-5 w-5' />
                <span>
                  {/* <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES_COPIED}
                  </span> */}
                  <span className='font-light inline-block m-1'>
                    {t.HERO.RSS_BUTTON_COPIED}
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => clickCopy()}
                className='hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex py-1 px-2 rounded-lg items-center'
              >
                <RssIcon className='inline-block mb-1 h-5 w-5' />
                <span className=''>
                  {/* <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES}
                  </span> */}
                  <span className='font-light inline-block m-1'>{t.HERO.HOME.RSS_BUTTON}</span>
                </span>
              </button>
            )}
            {BLOG.showWeChatPay && (
              <button
                onClick={() => setShowPay((showPay) => !showPay)}
                className='hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex py-1 px-2 rounded-lg items-center'
              >
                <ThumbUpIcon className='w-5 h-5' />
                <span className='font-light inline-block m-1'>{t.HERO.HOME.DONATE}</span>
              </button>
            )}
          </ul>
          <div className='hidden md:flex'>
            <Social />
          </div>
        </div>
        <div className='my-4 text-sm leading-6 flex align-baseline justify-between flex-wrap' >
          <p>
            © {from === y || !from ? y : `${from} - ${y}`} | {BLOG.author}
          </p>
          {/* <p className='md:float-right'>
            {t.FOOTER.COPYRIGHT_START}
            <a className='underline' href={`${t.FOOTER.COPYRIGHT_LINK}`}>
              {t.FOOTER.COPYRIGHT_NAME}
            </a>
            {t.FOOTER.COPYRIGHT_END}
            </p>  */}
          <Vercel />
        </div>
      </footer>
      {showPay && <WechatPay />}
    </motion.div>
  )
}

export default Footer
