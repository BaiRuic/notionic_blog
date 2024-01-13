import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'

const CusdisComponent = dynamic(
  () => {
    return import('@/components/Post/CusdisComments')
  },
  { ssr: false }
)

const WalineComponent = dynamic(
  () => {
    return import('@/components/Post/WalineComments')
  },
  { ssr: false }
)

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Post/Utterances')
  },
  { ssr: false }
)
const SupaCommentsComponent = dynamic(
  () => {
    return import('@/components/Post/SupaComments')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }) => {
  // const { locale, asPath } = useRouter()
  // const { theme } = useTheme();
  // const lang = locale === 'en' ? 'en' : 'zh-cn'
  // console.log(frontMatter)
  return (
    <div>
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'supacomments' && (
        <SupaCommentsComponent />
      )}
      {BLOG.comment && BLOG.comment.provider === 'cusdis' && (
        <CusdisComponent frontMatter={frontMatter} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'waline' && (<div key='Waline'>
        <WalineComponent />
      </div>)}
    </div>
  )
}

export default Comments
