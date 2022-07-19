import { MdLanguage } from 'react-icons/md'

export default {
  name: 'languages',
  title: 'Languages',
  type: 'document',
  icon: MdLanguage,
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Please enter language title',
      type: 'string'
    },
    {
      name: 'name',
      title: 'localeName',
      description: 'Please enter locale name',
      type: 'string'
    },
    {
      name: 'id',
      title: 'Language ID',
      description: 'Please enter language id (eg: en for en_us, es for es_us)',
      type: 'string'
    },
    {
      name: 'isDefault',
      title: 'Default Language',
      description: 'Please mark if this is the default language',
      type: 'boolean',
      initialValue: false,
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name'
    }
  }
}