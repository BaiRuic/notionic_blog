import { ReactCusdis } from 'react-cusdis'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import { useTheme } from 'next-themes'

const CusdisComments = ({ frontMatter }) => {
  const { locale } = useRouter()
  const { theme } = useTheme();
  const lang = locale === 'en' ? 'en' : 'zh-cn'
  // const isDarkMode = theme === 'dark' ? true : false

  // useEffect(() => {
  //   const cusdisThread = document?.getElementById('cusdis_thread')
  //   const cusdisIframe = cusdisThread?.getElementsByTagName('iframe')
  //   if (cusdisIframe) {
  //     const cusdisWrapper = cusdisIframe[0]?.contentDocument?.getElementById('root')
  //     if (isDarkMode) {
  //       cusdisWrapper?.classList?.remove('light')
  //       cusdisWrapper?.classList?.add('dark')
  //     } else {
  //       cusdisWrapper?.classList?.remove('dark')
  //       cusdisWrapper?.classList?.add('light')
  //     }
  //     //if (!cusdisWrapper?.firstElementChild?.classList?.contains('dark:text-gray-100')) {
  //     //  cusdisWrapper?.firstElementChild?.classList?.add('dark:text-gray-100', 'text-gray-800')
  //     // }
  //   }
  // },[locale, theme])

  return (
      <ReactCusdis
        lang={lang}
        attrs={{
          host: BLOG.comment.cusdisConfig.host,
          appId: BLOG.comment.cusdisConfig.appId,
          pageId: frontMatter.id,
          pageTitle: frontMatter.title,
          pageUrl: BLOG.link + frontMatter.slug,
          theme: theme
        }}
      />
  )
}

export default CusdisComments