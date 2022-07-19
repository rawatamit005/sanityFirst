import { format } from "date-fns";

export default {
    name: "country",
    type: "document",
    title: "Country",
    fields: [
        {
            name: "countryName",
            type: "string",
            title: "Country",
        },
        {
            name:"countryId",
            type:"string",
            title:"Country Id"
        },
        {
        name:"countryCode",
        type:"string",
        title:"Country Code",
        }
    
    ],
    preview: {
      select: {
        title: 'countryName',
      }
    }
  };