const BLOG = {
  title: 'BaiRuic',
  author: 'BaiRuic',
  email: 'brc730@outlook.com',
  link: process.env.NEXT_PUBLIC_BLOG_LINK, // DO NOT CHANGE THIS! Edit .env file!,
  newsletter: 'Weekly',
  description: 'This is the way!',
  lang: 'en-US', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  timezone: 'Asia/Shanghai', // See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for all options.
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#F6F8FA', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#212936', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Notionic in a folder
  since: 2020, // If leave this empty, current year will be used.
  postsPerPage: 7,
  sortByDate: true,
  pagesShow: {
    newsletter: false,
    notes: true,
    projects: true,
    contact: false,
    books: true,
    friends: true
  },
  showWeChatPay: true,
  previewImagesEnabled: true,
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateHost: 'og-zl.vercel.app', // The link to generate OG image, don't end with a slash
  defaultCover: '/cover.jpg',
  socialLink: {
    twitter: '',
    github: 'https://github.com/bairuic',
    telegram: ''
  },
  seo: {
    keywords: ['Notionic', 'BaiRuic', 'Blog'],
    googleSiteVerification: '' // Remove the value or replace it with your own google site verification code
  },
  notionBookDbPageId: process.env.NEXT_PUBLIC_NOTION_BOOKDB_PAGE_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionSpacesId: process.env.NOTION_SPACES_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  notionDomain: 'bairuic.notion.site',
  telegramToken: process.env.TELEGRAM_TOKEN, // The token of your Telegram bot
  telegramChatId: '821465373', // The chat id of your Telegram bot
  telegramChannelUrl: '', // The link of your Telegram channel
  telegramChannelName: '', // The name of your Telegram channel
  craftConfigShareUrl: '', // The link to share your craft config
  analytics: {
    provider: '', // Currently we support Google Analytics, Ackee, Umami and Cloudflare Insights, please fill with 'ga' or 'ackee' or 'umami' or 'cf', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.example.com/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.example.com , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    cfConfig: {
      scriptUrl: 'https://static.cloudflareinsights.com/beacon.min.js', // Default
      token: '' // Like '{"token": "xxxxxxxxxxxxxxxxxx"}'
    },
    gaConfig: {
      measurementId: '' // e.g: G-XXXXXXXXXX
    },
    umamiConfig: {
      scriptUrl: '', // The url of your Umami script
      websiteId: '' // The website id of your Umami instance
    }
  },
  comment: {
    // support provider: utterances, supacomments, cusdis
    provider: 'waline', // leave it empty if you don't need any comment plugin
    supaCommentsConfig: {
      supabaseUrl: 'https://ausnmqzkltuymwllzeox.supabase.co', // The url of your Supabase instance
      supabaseAnonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1c25tcXprbHR1eW13bGx6ZW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwOTY3NjMsImV4cCI6MjAwMDY3Mjc2M30.ILQhZ5L8tpvG_FR88FijTBcRwb0j6xnkPCjiJthbFNc' // The anonymous key of your Supabase instance
    },
    utterancesConfig: {
      repo: 'BaiRuic/Blog_Comment'
    },
    cusdisConfig: {
      appId: '560ca3d0-c60a-4287-a4ec-4f666598440c', // data-app-id
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js' // change this if you're using self-hosted version
    },
    walineConfig: {
      host: 'https://comment.bairuic.eu.org',
      note: 'be nice!'
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
// export default BLOG
module.exports = BLOG
