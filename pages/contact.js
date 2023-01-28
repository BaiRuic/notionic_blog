import Container from '@/components/Container'
import ContactForm from '@/components/ContactForm'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

export const Contact = () => {
  const { locale } = useRouter()
  const t = lang[locale]
  const email_to = "mailto:" + BLOG.email
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <div className='mb-8 md:mb-16 text-gray-600 dark:text-gray-200'>
        <h2 className='text-xl lg:text-3xl font-light text-center mb-4'>
          {t.CONTACT.TITLE}
        </h2>
        <p className='max-w-screen-md font-light md:text-lg text-center mx-auto'>
          {t.CONTACT.DESCRIPTION}
          <a
            href={email_to}
            className='hover:text-indigo-500 active:text-indigo-600 underline transition duration-100'
            target="_blank" 
            rel="external">
            {t.CONTACT.EMAIL_DESCRIPTION} 
          </a>
        </p>
        {/* <p className='max-w-screen-md font-light md:text-lg text-center mx-auto'>
          {t.CONTACT.TG_DESCRIPTION}
          <a
            href={BLOG.socialLink.telegram}
            className='hover:text-indigo-500 active:text-indigo-600 underline transition duration-100'
          >
            @{BLOG.socialLink.telegram.slice(13)}
          </a>
        </p>  */}
      </div>
      {/* <ContactForm /> */}
    </Container>
  )
}

export default Contact
