// 1. Import the SocialInput react component
import { MdPhonelinkSetup } from 'react-icons/md'
import React from "react";
import MyCustomObject from '../../components/myCustomObject';

export default {
  name: 'productReference',
  title: 'Add Product',
  type: 'object',
  inputComponent: MyCustomObject,
  validation: Rule => Rule.custom(fields => {
    if (fields.smartProductId==null) return "Please Add Correct Product"
    return true
  }),

  fields: [
    {
      // 5. Enable editors to input a string from a predefined list (social)
      name: 'productCode',

      title: 'PRODUCT GTIN/EAN/UPC',

      type: 'string',
      description: "Please enter the Product GTIN/EAN/UPC to check availability",
    },
   
    {
      name: "title",
      type: "string",
      title: "PRODUCT NAME",
      readOnly:true,
      description: "You can't type here!",
   
    },
    {
      name: 'smartProductId',
      type: 'string',
      title: 'SMART PRODUCT ID',
      readOnly:true,
      description: "You can't type here!",
    },
    {
        name: "productImage",
        type: "string",
        title: "PRODUCT IMAGE",
        readOnly:true,
        description: "You can't type here!",
     
      },
      {
        name: "overrideImage",
        type: "figureOverride",
        title: "OVERRIDE PRODUCT IMAGE"
      
      }
  ],

  
  preview: {
    select: {

     productCode:'productCode',
     smartProductId:'smartProductId',
     title:'title',
     productImage:'productImage',
     overrideImage:'overrideImage'
    },

    prepare({productCode,smartProductId,title,productImage,overrideImage}) {
      //const path = `${productCode}` + `:`+`${smartProductId}` + `:` + `${title}`
      const path =   `${title}` 
     
      return {
        title:  title ==undefined?  'Missing Product Name':path ,
        media:  overrideImage!=null && overrideImage.asset !=null ? overrideImage : <img src={productImage} />,

      }
    }
  }
}