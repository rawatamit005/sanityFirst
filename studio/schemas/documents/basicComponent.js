import Tabs from "sanity-plugin-tabs";
import { format } from "date-fns";
import { MdLocalMovies } from 'react-icons/md'
import StyleInput from "../../components/styleInput";
export default {
    name: "basicComponent",
      type: "object",
      inputComponent: Tabs,
      // validation: Rule => Rule.required(),
      fieldsets: [
        { name: "headerSetting", title: "HEADER" },
        { name: "footerSetting", title: "FOOTER" },
        { name: "styleSetting", title: "STYLING" },
      ],
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: "object"
      },
      fields: [
        {
          name: "header",
          type: "header",
          title: "ADD HEADER DETAILS",
          fieldset: "headerSetting",
          options: {
            layout: "object"
          },
        },
        {
          name: "footer",
          type: "footer",
          title: "ADD FOOTER DETAILS",
          fieldset: "footerSetting",
       
        },
        {
          name: "styleFile",
          type: "file",
          title: "CSS",
          options: {
            accept: ".css",
            storeOriginalFilename: true,
          },
          description: "Upload css file from your computer",
          fieldset: "styleSetting",
        },
        {
          name: "downloadFile",
          type: "string",
          title: "CLICK HERE",
          readOnly: true,
          description: "DOWNLOAD A SAMPLE CSS FILE : ",
          inputComponent: StyleInput,
          fieldset: "styleSetting",
          options:{
            downloadLink: "http://unilever.com"
          }
        },
      ]
};