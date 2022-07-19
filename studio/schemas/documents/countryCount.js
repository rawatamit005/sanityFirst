import { format } from "date-fns";

export default {
  name: "countryCount",
  type: "document",
  title: "Country Count ",
  fields: [
    {
        name: "retailer",
        type: "string",
        title: "retailer",
    
    },
    {
      name: "country_name",
      type: "string",
      title: "country_name",
    },
    {
        name: "cssClass",
        type: "string",
        title: "cssClass",
      }
  
  ]
};