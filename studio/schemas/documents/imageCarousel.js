import { format } from "date-fns";
import { BsImages } from 'react-icons/bs'

export default {
  name: "imageCarousel",
  type: "document",
  title: "Image Carousel",
  icon: BsImages,
  fields: [
    {
        name: "autoSlide",
        type: "boolean",
        title: "MAKE BANNER CAROUSEL AUTO SWIPE",
        initialValue: false,
        description: "If you enable this then banner will swipe automatically",
    },
    {
        name: "bannerImages",
        type: "array",
        title: "Select banner images *",
        description: "Please select banner images from drop dowm, if you want single hero image then select only one image",
        of: [{type: "figure"}],
        validation: Rule => Rule.required().min(1).error("Please Add Alteast One BannerImage")
      },
      {
        name: "title",
        type: "string",
        title: "CAROUSEL NAME",
        description: "Name is used to identify the carousel for page layout",
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `${title ? title+' : Image Carousel' : 'Image Carousel'}`
      }
    }
  }
};
