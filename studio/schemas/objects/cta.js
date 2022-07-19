import { MdLink } from "react-icons/md"
export default {
    title: 'CALL TO ACTION',
    name: 'cta',
    type: 'object',
    icon: MdLink,
    fields: [
      {
        title: 'CTA LABEL *',
        name: 'ctalabel',
        type: 'string',
        validation: Rule => Rule.required()
      },
     
      {
        title: 'CTA LINK (EXTERNAL) *',
        name: 'ctalink',
        type: 'string',
        description: 'Example: https://www.sanity.io',
        validation: Rule => Rule.required()
       
      },
      {
        title: 'CTA TYPE',
        name: 'ctatype',
        type: 'string',
        description: 'Default to Button Type',
        options: {
          layout: 'radio',
          list: ['button', 'link']
        }
      }
    ],
    preview: {
      select: {
        title: 'ctalabel',
        link: 'ctalink'
      },
      prepare ({title, link}) {
        let subtitle = 'Not set'
        
        if (link) {
          subtitle = `External: ${link}`
        }
        return {
          title,
          subtitle
        }
      }
    }
  }
  