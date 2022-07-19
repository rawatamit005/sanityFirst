import { format } from "date-fns";
import { MdBorderBottom } from 'react-icons/md'

export default {
  name: "footer",
  type: "document",
  title: "Footer",
  icon: MdBorderBottom,
  fields: [
    {
        name: "title",
        type: "string",
        title: "Footer Name",
      //  validation: Rule => Rule.required()
      validation: Rule => Rule.custom(val => {
     
        if (!val ) {
          return 'Please Provide Footer Name'
        }
       else{
         return true
       }
      })
    },
    {
        name: "privacyNotice",
        type: "string",
        title: "Privacy notice label",
        description:"The label should match what is mentioned in Privacy notice page of the region here https://www.unilevernotices.com/privacy-notice/notice.html",
     //   validation: Rule => Rule.required()
     validation: Rule => Rule.custom(val => {
     
      if (!val ) {
        return 'Please Provide Privacy Notice Label'
      }
     else{
       return true
     }
    })
      },
      {
        name: "privacyNoticeUrl",
        type: "string",
        title: "Privacy notice URL",
        description: "You can get Privacy notice URL for your region from here https://www.unilevernotices.com/privacy-notice/notice.html",
       // validation: Rule => Rule.required()
       validation: Rule => Rule.custom(val => {
     
        if (!val ) {
          return 'Please Provide Privacy Notice URL'
        }
       else{
         return true
       }
      })
      },
      {
        name: "cookieNotice",
        type: "string",
        title: "Cookie notice label"
      },
      {
        name: "cookieNoticeUrl",
        type: "string",
        title: "Cookie notice Url"
      },
      {
        name: "tnc",
        type: "string",
        title: "Terms & Conditions label"
      },
      {
        name: "tncURL",
        type: "string",
        title: "Terms & Conditions Url"
      },
      {
        name: "customLink",
        type: "string",
        title: "Custom link label"
      },
      {
        name: "customLinkUrl",
        type: "string",
        title: "Custom link url"
      }
  ]
};
