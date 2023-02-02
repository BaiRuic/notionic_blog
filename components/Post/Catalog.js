import React, { useRef } from 'react'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
// import Progress from './Progress'
// import { useGlobal } from '@/lib/global'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

/**
 * 目录导航组件
 * @param toc
 * @returns {JSX.Element}
 * @constructor
 */
const Catalog = ({ toc }) => {
  // const { locale } = useGlobal()
  // 监听滚动事件
  // console.log('Catalog_toc', toc)
  const { locale } = useRouter()
  const t = lang[locale]

  React.useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  // 目录自动滚动
  const tRef = useRef(null)
  const tocIds = []

  // 同步选中目录事件
  const [activeSection, setActiveSection] = React.useState(null)

  const throttleMs = 100
  const actionSectionScrollSpy = React.useCallback(throttle(() => {
    const sections = document.getElementsByClassName('notion-h')
    let prevBBox = null
    let currentSectionId = activeSection
    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i]
      if (!section || !(section instanceof Element)) continue
      if (!currentSectionId) {
        currentSectionId = section.getAttribute('data-id')
      }
      const bbox = section.getBoundingClientRect()
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
      const offset = Math.max(150, prevHeight / 4)
      // GetBoundingClientRect returns values relative to viewport
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('data-id')
        prevBBox = bbox
        continue
      }
      // No need to continue loop, if last element has been detected
      break
    }
    setActiveSection(currentSectionId)
    const index = tocIds.indexOf(currentSectionId) || 0
    tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
  }, throttleMs))

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return <></>
  }

  // 抄的一段代码...
  const cs = (...classes) => classes.filter(a => a).join(' ')
  // notion-aside-table-of-contents-header
  // font-normal text-lg break-words text-center
  return (
    <div className="flex flex-col items-center max-h-screen min-w-222 overflow-auto bg-bg-color rounded-lg">
      <div className="font-normal text-lg text-center">
        {t.LAYOUT.TABLE_OF_CONTENTS}
      </div>
      {/* <div className='w-full py-3'>
        <Progress />
      </div>  */}

      <div ref={tRef}>
        <nav className='notion-table-of-contents'>
          {toc.map((tocItem) => {
            const id = uuidToId(tocItem.id)
            tocIds.push(id)
            return (
              <a
                key={id}
                href={`#${id}`}
                className={cs(
                  'notion-table-of-contents-item',
                  `notion-table-of-contents-item-indent-level-${tocItem.indentLevel}`,
                  activeSection === id &&
                    'notion-table-of-contents-active-item'
                )}
              >
                <span
                  className='notion-table-of-contents-item-body'
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 16
                  }}
                >
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
