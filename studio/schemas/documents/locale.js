import { format } from "date-fns";

export default {
    name: "locale",
    type: "document",
    title: "Locale",
    fields: [
      {
        name: "localeName",
        type: "string",
        title: "Locale Name",
    },
        {
            name: "languageCode",
            type: "string",
            title: "Language Code",
        }
       
    ],
    preview: {
      select: {
        title: 'localeName',
      }
    }
  };