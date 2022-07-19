
import Tabs from "sanity-plugin-tabs";
import { format } from "date-fns";
import { MdLocalMovies } from 'react-icons/md';
import searchCountryInput from "../../components/searchCountryInput";
import searchBrandInput from "../../components/searchBrandInput";
import searchLangCode from "../../components/searchLangCode";
export default {
    name: "content",
      type: "object",
      inputComponent: Tabs,

      fieldsets: [
        { name: "CampaignDetails", title: "Campaign Details",options: { sortOrder: 10 }  },
        { name: "AnalyticsDetails", title: "Analytics Details",options: { sortOrder: 20 }},
        { name: "StyleDetails", title: "Header, Footer & Styling",options: { sortOrder: 30 }},
        { name: "CampaignContent", title: "Content" ,options: { sortOrder: 40 }},
        { name: "publishDetail", title: "Publish" ,options: { sortOrder: 50 }},
      ],
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: "object"
      },
       fields: [
        {
          name: "country",
          type: "reference",
          title: "COUNTRY *",
          to: [{ type: 'country' }],
          fieldset: "CampaignDetails",
         
         inputComponent: searchCountryInput,
         
        },
        {
          name: "brand",
          type: "reference",
          title: "BRAND *",
          to: [{ type: 'brand' }],
          fieldset: "CampaignDetails",
          inputComponent: searchBrandInput,
          // validation: Rule => Rule.required()
        },
        {
          name: "locale",
          type: "reference",
          title: "Locale *",
          to: [{ type: 'locale' }],
          fieldset: "CampaignDetails",
          inputComponent: searchLangCode,
       
        },
      
  
       
        {
          name: "title",
          type: "string",
          title: "CAMPAIGN TITLE",
          description: "What is name of your campaign",
        icon: MdLocalMovies,
        fieldset: "CampaignDetails",
        validation: Rule => Rule.required().error("Please Provide Campaign Name")
        },
        {
          name: "rootUrl",
          type: "string",
          title: "HOME PAGE OR CAMPAIGN ROOT URL",
          description: "Provide the url of brand website",
        fieldset: "CampaignDetails",
        },
        {
          name: "gaID",
          type: "string",
          title: "GOOGLE ANALYTICS ID",
        fieldset: "AnalyticsDetails",
        },
      {
          name: "reportSuiteID",
          type: "string",
          title: "ADOBE ANALYTICS REPORT SUITES ID",
          fieldset: "AnalyticsDetails",
        },
        
        {
          name: "style",
          type: "basicComponent",
          title: "Configure Header of the page",
          fieldset: "StyleDetails",
        },
      {
        name: "bodyComponent",
        type: "array",
        title: "CREATE/ORDER BODY COMPONENT FOR PAGE",
        fieldset: "CampaignContent",
        validation: Rule => Rule.required().min(1).error("Please Add Alteast One Component For Page"),
        of: [
          {type: "imageBanner"},
          {type: "imageCarousel"},
          {type: "productCarousel"},
          {type: "productList"},
          { type: "textComponent" },
          { type: "videoComponent" },
          {type: "socialChannel"}
        ],
      },
      {
        name: "slug",
        type: "slug",
        title: "CAMPAIGN URL *",
        description:"This will be the url of campaign page",
        options: {
          source: "content.title",
          maxLength: 96,
        },
      fieldset: "publishDetail",
      validation: Rule => Rule.required().error("Please Provide Unique Campaign URL")
   
   
      },
      {
        name: "publishedAt",
        type: "datetime",
        title: "PUBLISH AT *",
        description: "This can be used to schedule post for publishing",
        fieldset: "publishDetail",
            validation: Rule => Rule.custom(value => {
           
            if ( !value) {
              return "Please Provide Publish Date" 
            }
            else{
              return true
            }
          
          })
      },

    ]
  };