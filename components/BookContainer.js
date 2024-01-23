import SEO from '@/components/Common/SEO'
import BLOG from '@/blog.config'
import PropTypes from 'prop-types'

const BookContainer = ({ children, fullWidth, ...customMeta }) => {
  const meta = {
    title: BLOG.title,
    type: 'website',
    ...customMeta
  }
  return (
    <>
      <SEO meta={meta} />
      <main
        className={`m-auto flex-grow w-full transition-all ${
          !fullWidth ? 'max-w-4xl max-auto px-4' : 'px-4 md:px-24'
        }`}
      >
        {children}
      </main>
    </>
  )
}

BookContainer.propTypes = {
  children: PropTypes.node
}

export default BookContainer
