import { format } from "date-fns";
import { HiTemplate } from 'react-icons/hi'

export default {
  name: "textComponent",
  type: "document",
  title: "Text Component",
  icon: HiTemplate,
  fields: [
    {
      name: "title",
      type: "string",
      title: "TITLE",
      description: "Provide Title Name"
    },
    {
      name: "headingLevel",
      type: "string",
      title: "TITLE HEADING LEVEL",
      description: "If left blank, defaults to H1. The page must have a H1, and subsequent heading must be H2",
      options: {
        list: [ 
          { title: 'H1', value: 'H1'},
          { title: 'H2', value: 'H2'},
          { title: 'H3', value: 'H3'},
          { title: 'H4', value: 'H4'},
          { title: 'H5', value: 'H5'},
          { title: 'H6', value: 'H6'},
        ]
      }
    },
	 {
      name: "subtitle",
      type: "string",
      title: "SUB TITLE",
      description: "Provide SubTitle Name"
    },
    {
      name: "paragraph",
      type: "textEditor",
      title: "PARAGRAPH",
      description: 'Customize paragraph text'
    },
      {
        name: "backgroundimage",
        type: "figure",
        title: "SELECT BACKGROUND IMAGE",
   

      },
	  {
      name: 'ctas',
      type: 'array',
      title:'CALL TO ACTION',
      of: [
        {
          name: 'cta',
          type: 'cta'
        }
      ]
    },
   
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: `${title ? title+' : Text Component' : 'Text Component'}`
      }
    }
  }
};
