import { format } from "date-fns";

export default {
    name: "customLink",
    type: "document",
    title: "CUSTOM LINKS",
    fields: [
        {
            name: "customLink",
            type: "string",
            title: "custom link label"
        },
        {
            name: "customLinkUrl",
            type: "url",
            title: "CUSTOM LINK URL"
        }
    ],
    preview: {
      select: {
        title: 'customLink',
      }
    }
  };