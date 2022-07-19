import { format } from "date-fns";
import { BsImage } from 'react-icons/bs'
//import { bannerIcon } from "./../../static/image-banner.svg"

export default {
  name: "videoComponent",
  type: "document",
  title: "YouTube Video Component",
  icon: BsImage,
  fields: [
    {
      name: "videoId",
      type: "string",
      title: "Please provide YouTube video ID",
      description: "This is the id after v= in YouTube URLs. For e.g. if the URL is https://www.youtube.com/watch?v=xwx7NnPQ44U, the id will be xwx7NnPQ44U",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      type: "string",
      title: "Video Name",
      description: "Name is used to identify the video for page layout",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: `${
          title
            ? title + " : YouTube Video Component"
            : "YouTube Video Component"
        }`,
      };
    },
  },
};
