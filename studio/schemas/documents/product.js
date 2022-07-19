import { format } from "date-fns";

export default {
  name: "product",
  type: "document",
  title: "Products",
  fields: [
    {
      name: "show_country_price_status",
      type: "string",
      title: "show_country_price_status",
      
    },
    {
      name: "show_country_offer_status",
      type: "string",
      title: "show_country_offer_status",
     
    },
    {
      name: "show_store_locator",
      type: "string",
      title: "show_store_locator",
    },
    {
        name: "table_header",
        type: "string",
        title: "table_header",
      },
      {
        name: "price_symbol",
        type: "string",
        title: "price_symbol",
      },
      {
        name: "pdate",
        type: "string",
        title: "pdate",
      },
      {
        name: "totalWProduct",
        type: "string",
        title: "totalWProduct",
      },
      {
        name: "brand_name",
        type: "string",
        title: "brand_name",
      },
      {
        name: "widget_name",
        type: "string",
        title: "widget_name",
      },
      {
        name: "title",
        type: "string",
        title: "title",
      },
      {
        name: "image_url",
        type: "string",
        title: "image_url",
      },
      {
        name: "widget_id",
        type: "string",
        title: "widget_id",
      },
      {
        name: "product_id",
        type: "string",
        title: "product_id",
      },
      {
        name: "product_variant",
        type: "string",
        title: "product_variant",
      },
      {
        name: "product_variant_id",
        type: "string",
        title: "product_variant_id",
      },
      {
        name: "product_ean",
        type: "string",
        title: "product_ean",
      },
      {
        name: "widget_theme_id",
        type: "string",
        title: "widget_theme_id",
      },
      {
        name: "widget_outer_class",
        type: "string",
        title: "widget_outer_class",
      },
      {
        name: "widget_title_wrap",
        type: "string",
        title: "widget_title_wrap",
      },
      {
        name: "widget_closebutton",
        type: "string",
        title: "widget_closebutton",
      },
      {
        name: "show_price_status",
        type: "string",
        title: "show_price_status",
      },
      {
        name: "widget_img_instock",
        type: "string",
        title: "widget_img_instock",
      },
      {
        name: "widget_img_outofstock",
        type: "string",
        title: "widget_img_outofstock",
      },
      {
        name: "widget_pointer",
        type: "string",
        title: "widget_pointer",
      },
      {
        name: "widget_btn_wrap",
        type: "string",
        title: "widget_btn_wrap",
      },
    
      {
        name: "widget_disabled",
        type: "string",
        title: "widget_disabled",
      },
      {
        name: "unvailable_msg",
        type: "string",
        title: "unvailable_msg",
      },
      {
        name: "msg_container_class",
        type: "string",
        title: "msg_container_class",
      },
      {
        name: "ip_address",
        type: "string",
        title: "ip_address",
      },
      {
        name: "showDiv",
        type: "string",
        title: "showDiv",
      },
      {
        name: "overlay_class",
        type: "string",
        title: "overlay_class",
      },
      {
        name: "cw_structure_css",
        type: "string",
        title: "cw_structure_css",
      },
      {
        name: "cw_conditional_css",
        type: "string",
        title: "cw_conditional_css",
      },
      {
        name: "count_retailer",
        type: "string",
        title: "count_retailer",
      },
      {
        name: "country_name",
        type: "string",
        title: "country_name",
      },
      {
        name: "show_available_retailers",
        type: "string",
        title: "show_available_retailers",
      },
      {
        name: "show_available_class",
        type: "string",
        title: "show_available_class",
      },
      {
        name: "enable_custom_check",
        type: "string",
        title: "enable_custom_check",
      },
      {
        name: "buy_in_store_txt",
        type: "string",
        title: "buy_in_store_txt",
      },
      {
        name: "nearest_store_txt",
        type: "string",
        title: "nearest_store_txt",
      },
      {
        name: "postal_address_txt",
        type: "string",
        title: "postal_address_txt",
      },
      {
        name: "current_location_txt",
        type: "string",
        title: "current_location_txt",
      },
      {
        name: "nearest_stores_txt",
        type: "string",
        title: "nearest_stores_txt",
      },
      {
        name: "show_hide_txt",
        type: "string",
        title: "show_hide_txt",
      },
      {
        name: "open_in_map_txt",
        type: "string",
        title: "open_in_map_txt",
      },
      {
        name: "search_txt",
        type: "string",
        title: "search_txt",
      },
      {
        name: "close_txt",
        type: "string",
        title: "close_txt",
      },
      {
        name: "no_store_txt",
        type: "string",
        title: "no_store_txt",
      },
      {
        name: "no_store_desc",
        type: "string",
        title: "no_store_desc",
      },
      {
        name: "contact_txt",
        type: "string",
        title: "contact_txt",
      },
      {
        name: "contact_url",
        type: "string",
        title: "contact_url",
      },
      {
        name: "metric_txt",
        type: "string",
        title: "metric_txt",
      },
      {
        name: "imperial_txt",
        type: "string",
        title: "imperial_txt",
      },
      {
        name: "result_txt",
        type: "string",
        title: "result_txt",
      },
      {
        name: "variant_count",
        type: "string",
        title: "variant_count",
      },
      {
        name: "variant_default",
        type: "string",
        title: "variant_default",
      },
      {
        name: "disclaimer",
        type: "string",
        title: "disclaimer",
      },
      {
        name: "disclaimer_out_stock1",
        type: "string",
        title: "disclaimer_out_stock1",
      },    {
        name: "disclaimer_out_stock2",
        type: "string",
        title: "disclaimer_out_stock2",
      },
      {
        name: "disclaimer_status",
        type: "string",
        title: "disclaimer_status",
      },
      {
        name: 'retailer',
        title: 'Retailer',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: {
                type: 'retailer',
              },
            },
          ],
      },
      {
        name: 'countryCount',
        title: 'countryCount',
        type: 'array',
        of: [
            {
              type: 'reference',
              to: {
                type: 'countryCount',
              },
            },
          ],
      },
  ]
};
