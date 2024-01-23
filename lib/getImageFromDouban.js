export default async function getImageFromDouban(bookName) {
  const response = await fetch(
    `https://book.douban.com/j/subject_suggest?q=${bookName}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; AcooBrowser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)'
      }
    }
  )

  if (!response.ok) {
    return ''
  }

  const data = await response.json()
  if (data.length === 0) {
    return ''
  }

  return data[0].pic
}
