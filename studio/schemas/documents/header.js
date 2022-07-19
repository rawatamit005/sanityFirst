import { format } from "date-fns";

export default {
  name: "header",
  type: "document",
  title: "Header",
  fields: [
    {
        name: "title",
        type: "string",
        title: "Header Title",
        validation: Rule => Rule.required()
    },
    {
      name: "clickLogo",
      type: "boolean",
      title: "Make logo clickable",
      initialValue: true,
      description: "Default value is true to make logo clickable",
    },
    {
        name: "logoUrl",
        type: "url",
        title: "Provide logo url (if required)"
    },
    {
      name: "brandLogo",
      type: "figure",
      title: "Brand Logo",
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'brandLogo'
    }
  }
};
