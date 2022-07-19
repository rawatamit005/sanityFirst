import { format } from "date-fns";
export default {
    name: 'campaignStyle',
    type: 'document',
    title: 'CampaignStyle',
    fields: [
        {
            name: "campaign",
            type: "reference",
            title: "Select Campaign",
            to: [{ type: 'campaign' }],
           
        },
        {
            name: "styleFile",
            type: "file",
            title: "CSS",
            options: {
              accept: ".css",
              storeOriginalFilename: true,
            },
          }
    ]
  }