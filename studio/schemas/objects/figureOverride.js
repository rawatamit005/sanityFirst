import {FaImage} from 'react-icons/fa'

export default {
  name: 'figureOverride',
  title: 'Image',
  icon: FaImage,
  type: 'image',
  description: 'Upload image from your computer, TAB, or paste image fom clipboard',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      description: 'For accessibility purposes, please describe the image',
      type: 'string',
     // validation: Rule => Rule.required("Please provide alt text for Image"),
    //  validation: Rule => Rule.custom(val => {
     
    //   if (!val ) {
    //     return 'Please Provide Alt Text For Image'
    //   }
    //  else{
    //    return true
    //  }
    // }),
      options: {
        isHighlighted: true
      }
    }
  ]
}
