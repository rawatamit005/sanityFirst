// 1. Import the SocialInput react component
export default {
    name: 'footer',
    title: 'Footer',
    type: 'object',
    validation: Rule => Rule.required().error("Please Provide Required Footer Details"),
    // 4. Perform validation
    //validation: Rule => Rule.custom(verifyInput),
  
    fields: [
        {
            name: "privacyNotice",
            type: "string",
            title: "PRIVACY NOTICE LABEL *",
            description:"The label should match what is mentioned in Privacy notice page of the region here https://www.unilevernotices.com/privacy-notice/notice.html",
           // validation: Rule => Rule.required()
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
            title: "PRIVACY NOTICE URL *",
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
            title: "COOKIE NOTICE LABEL"
          },
          {
            name: "cookieNoticeUrl",
            type: "string",
            title: "COOKIE NOTICE URL"
          },
          {
            name: "tnc",
            type: "string",
            title: "TERM & CONDITIONS LABEL"
          },
          {
            name: "tncURL",
            type: "string",
            title: "TERM & CONDITIONS URL"
          },
          {
            name: "customLink",
            type: "array",
            title: "ADD CUSTOM LINKS",
            of: [
                {type: "customLink"}
              ],
          }
      ]
  }