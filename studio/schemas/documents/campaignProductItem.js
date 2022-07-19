import { format } from "date-fns";
export default {
    name: 'campaignProductItem',
    type: 'document',
    title: 'CampaignProductItem',
    fields: [
        {
            name: "campaign",
            type: "reference",
            title: "Select Campaign",
            to: [{ type: 'campaign' }],
           
        },
      {
        name: 'productItem',
        title: 'Smart Product List',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: {
                type: 'productItem',
              },
            },
          ],
      }
    ]
  }