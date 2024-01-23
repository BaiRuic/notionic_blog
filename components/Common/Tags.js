import Link from 'next/link'

const Tags = ({ tags, currentTag, tagPage }) => {
  // tagPage 用来标记是从search页面跳转过来的，还是从books页面跳转过来的，默认是从books页面跳转过来的
  if (!tags) return null
  let tagFrom = tagPage ? tagPage : 'booktag'
  return (
    <div className='tag-container'>
      <div className='flex flex-wrap justify-center mt-4'>
        {Object.keys(tags).map((key) => {
          const selected = key === currentTag
          return (
            <div
              key={key}
              className={`m-1 font-medium rounded-lg whitespace-nowrap hover:text-gray-100 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                selected
                  ? 'text-gray-100 bg-gray-400 dark:bg-gray-600'
                  : 'text-gray-400 bg-gray-100 dark:bg-night'
              }`}
            >
              <Link
                key={key}
                scroll={false}
                href={
                  selected
                    ? tagFrom === 'tag'
                      ? '/search'
                      : '/books'
                    : `/${tagFrom}/${encodeURIComponent(key)}`
                }
                className='px-4 py-2 block'
              >
                {`${key} (${tags[key]})`}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tags
