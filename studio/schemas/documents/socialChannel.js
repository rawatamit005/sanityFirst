import { format } from "date-fns";
import { IoMegaphoneOutline, IoShareSocialSharp } from 'react-icons/io5'


export default {
  name: "socialChannel",
  type: "document",
  title: "Social Channel",
  icon: IoMegaphoneOutline,
  fields: [
    {
        name: "socialChannel",
        type: "array",
        title: "SOCIAL MEDIA CHANNELS",
        of: [{type: "socialLink"}]
      }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `Social Channel`
      }
    }
  }
};
