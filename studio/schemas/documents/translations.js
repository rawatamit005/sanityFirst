// Import baseLanguage just to show an example with customizing the slug source
// option
import { baseLanguage } from '../languages'

export default {

  name: "translations",
  type: "document",
  title: "Translations",
  localize: true,

  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'localeString'
    }
],
preview: {
  select: {
    title: `title.${baseLanguage.id}`,

  }
 }
}

