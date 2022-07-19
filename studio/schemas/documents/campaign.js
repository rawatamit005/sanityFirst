
import { format } from "date-fns";


export default {
  name: "campaign",
  type: "document",
  title: "Campaign",
  // validation: Rule => Rule.custom(fields => {
  //  if(fields.content.bodyComponent.length>0)
  //  {
  //   return true
  //  }
  //  else{
  //   return "Document is not valid"
  //  }
  // }),
  fields: [
    {
      name: "content",
      type: "content",
     
    }
  ],

  preview: {
    select: {
      title: 'content.title',
      media: 'content.style.header.brandLogo' // if the movie has a director, follow the relation and get the name
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: ` ${title ? title : 'New Campaign'}`,
        media: media
      }
    }
  }
};