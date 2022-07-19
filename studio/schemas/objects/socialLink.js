// 1. Import the SocialInput react component
import { IoShareSocialSharp } from 'react-icons/io5'
import SocialInput from "../../components/SocialInput"

// 2. List of social the editor may choose from
const social = [ 
    { title: 'Facebook', value: 'facebook'},
    { title: 'Twitter', value: 'twitter'},
    { title: 'YouTube', value: 'youtube'},
    { title: 'Instagram', value: 'instagram'},
    { title: 'LinkedIn', value: 'linkedin'},
    { title: 'Pinterest', value: 'pinterest'},
    { title: 'Whatsapp', value: 'whatsapp'},
    { title: 'Skype', value: 'skype'},
    { title: 'Phone', value: 'phone'},
    { title: 'SnapChat', value: 'snapchat'},
    { title: 'Other', value: 'other'}
]

// 3. Validate function which is invoked on user input
const verifyInput = socialLink => {
  const {channelName, channelUrl} = socialLink
  if (!channelName) {
    return 'Please select a social media channel'
  }
  if (!channelUrl) {
    return 'Enter channel URL'
  }
  //return mediaName < mediaLink ? true : `Let's open the store before we close it on ${social}, shall we?`
  return true
}

export default {
  name: 'socialLink',
  title: 'Social Channel',
  type: 'object',
  icon: IoShareSocialSharp,

  // 4. Perform validation
  validation: Rule => Rule.custom(verifyInput),

  fields: [
    {
      // 5. Enable editors to input a string from a predefined list (social)
      name: 'channelName',
      title: 'CHANNEL NAME',
      type: 'string',
      //inputComponent: SocialInput,
      options: {
        list: social
      },
      validation: Rule => Rule.required(),
      //inputComponent: SocialInput
    },
    {
        // 7. Same time input as above, but assigned to a different field
        name: 'channelUrl',
        title: 'CHANNEL URL',
        type: 'url',
        validation: Rule => Rule.required(),
      },
    {
      // 7. Same time input as above, but assigned to a different field
      name: 'channelIcon',
      title: 'CHANNEL ICON',
      type: "figure",
      description: 'If not provided, default will be used',
    },
    
  ],

  // 8. Define how the socialLink object will render in the Studio 
  preview: {
    select: {
      social: 'channelName',
      mediaLink: 'channelUrl'
    },
    prepare({social, mediaLink}) {
      return {
        title: social,
        subtitle: `${mediaLink}`,
      }
    }
  }
}