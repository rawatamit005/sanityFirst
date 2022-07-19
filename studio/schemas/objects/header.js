// 1. Import the SocialInput react component
export default {
  name: 'header',
  title: 'Header123',
  type: 'object',

  // 4. Perform validation
  //validation: Rule => Rule.custom(verifyInput),

  fields: [
    {
      name: "clickLogo",
      type: "boolean",
      title: "Make logo clickable",
      initialValue: true,
      description: "Default value is true to make logo clickable",
    },
    {
        name: "logoUrl",
        type: "url",
        title: "Provide logo url (if required)"
    },
    {
      name: "brandLogo",
      type: "figure",
      title: "Brand Logo *",
      validation: Rule => Rule.custom(val => {
     
        if (!val ) {
          return 'Please Provide Header'
        }
       else{
         return true
       }
      })
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'brandLogo'
    }
  }
}