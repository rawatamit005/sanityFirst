import { format } from "date-fns";
export default {
    name: 'smartProduct',
    type: 'document',
    title: 'Smart Product',
    fields: [
      {
        name: 'smartProductId',
        type: 'string',
        title: 'SmartProductId'
      },
      {
        name: 'product',
        title: 'Product List',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: {
                type: 'product',
              },
            },
          ],
      }
    ]
  }
  