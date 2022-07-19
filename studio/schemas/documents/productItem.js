import { format } from "date-fns";
export default {
    name: 'productItem',
    type: 'document',
    title: 'Items',
    fields: [
      
      {
        name: 'smartProduct',
        title: 'Smart Product List',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: {
                type: 'smartProduct',
              },
            },
          ],
      }
    ]
  }