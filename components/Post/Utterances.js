import BLOG from '@/blog.config'
import { useEffect } from 'react'
import { useTheme } from 'next-themes' // 用来弄主题

const Utterances = ({ issueTerm, layout }) => {
  const { theme } = useTheme();
  useEffect(() => {
    const curTheme =
        theme === 'auto'
        ? 'preferred-color-scheme'
        : theme === 'light'
          ? 'github-light'
          : 'github-dark'
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', true)
    script.setAttribute('repo', BLOG.comment.utterancesConfig.repo)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', curTheme)
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ''
    }
  },[theme])
  return (
    <>
      <div
        id='comments'
        className={layout && layout === 'fullWidth' ? '' : 'md:-ml-16'}
      >
        <div className='utterances-frame'></div>
      </div>
    </>
  )
}

export default Utterances
