import { useState } from 'react'
import BookCard from '@/components/BookCard'
import BookContainer from '@/components/BookContainer'
import Tags from '@/components/Common/Tags'
import PropTypes from 'prop-types'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

const BooksLayout = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState('')
  const { locale } = useRouter()
  const t = lang[locale]

  let filteredBlogPosts = []
  if (posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post.Tags ? post.Tags.join(' ') : ''
      const searchContent =
        post?.Name + post?.Summary + post?.Author + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  return (
    <BookContainer>
      <div className='relative'>
        <input
          type='text'
          placeholder={
            currentTag
              ? `${t.BOOKS.ONLY_SEARCH} #${currentTag}`
              : `${t.BOOKS.PLACEHOLDER}`
          }
          className='w-full bg-white dark:bg-gray-600 shadow-md rounded-lg outline-none focus:shadow p-3'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <svg
          className='absolute right-3 top-3 h-5 w-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </div>
      <Tags tags={tags} currentTag={currentTag} tagPage='booktag' />
      <div className='flex flex-row flex-wrap flex-grow justify-center items-center gap-4 mx-auto my-8'>
        {!filteredBlogPosts.length && (
          <p className='text-gray-500 dark:text-gray-300'>
            {t.BOOKS.NOT_FOUND}
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BookCard key={post.id} post={post} />
        ))}
      </div>
    </BookContainer>
  )
}
BooksLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  currentTag: PropTypes.string
}
export default BooksLayout
