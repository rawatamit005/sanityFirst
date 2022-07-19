const sanityClient = require('@sanity/client');
const _ = require("lodash");
const configSetting = require("../../config");
const client = sanityClient
(
  {
    projectId: '8gjfptsf',
    dataset:  process.env.SANITY_STUDIO_API_DATASET || configSetting.sanity.dataset,
    token:configSetting.sanity.token,
    apiVersion: '2021-03-25', 
    useCdn: false
  }
)



export async function addProductAction(props,campaignID,allSmartProductID,cssFileName) 
{
  
  var retail=[];	
  var ctCount=[];
  var pdt=[];
  var pdtInput=[];
  var currentCount=0;
  var smartProductTransformArray=[];
  var ProductItemTransformArray=[];
  var CampaignProductItemTransformArray=[];
  var ProductItemReference=[];
  var CampaignStyleArray=[];
  const fileURL = 'https://s3-ap-southeast-1.amazonaws.com/www.cartwire.co/widget/v2.0/css/' + cssFileName ;
  var assetid="";
 function  storeCampaignStyleFile()
  {
    
  return new Promise(( resolve, reject) =>
  {

   
     fetch(fileURL)
    .then(res => 
  
      
      res.arrayBuffer()
    )
    .then(buffer => client.assets.upload('file', buffer,{ contentType:'text/css'}))
    .then(assetDocument => {
      console.log("assetDocument",assetDocument)
      resolve(assetDocument);
 
    }).catch((err) => {
          
          reject(err);
     });
   });
  }
  function  transformRetailer(retailerArray)
  {
    const retailer =  
      {
          _id:`imported-retailer-${retailerArray.retailer_id}-${retailerArray.product_id}`,
          _type: 'retailer',
           prtpId: retailerArray.prtpId,
          iframe_url: retailerArray.iframe_url,
          is_available:retailerArray.is_available,
          buy_now_url:retailerArray.buy_now_url,
          status:retailerArray.status,
          category:retailerArray.category,
          sub_categry:retailerArray.sub_categry,
          quantity:retailerArray.quantity,
          price:retailerArray.price,
          sku_code:retailerArray.sku_code,
          product_id:retailerArray.product_id,
          retailer_id:retailerArray.retailer_id,
          cw_offer:retailerArray.cw_offer,
          cw_offer_desc:retailerArray.cw_offer_desc,
          retailer_name:retailerArray.retailer_name,
          retailer_logo:retailerArray.retailer_logo,
          pav_name:retailerArray.pav_name,
          pav_id:retailerArray.pav_id,
          widget_single_class:retailerArray.widget_single_class,
          product_attribute_id:retailerArray.product_attribute_id,
          variant_type:retailerArray.variant_type,
          stock_txt:retailerArray.stock_txt,
          buy_now_text:retailerArray.buy_now_text,
         campaign_buy_now:retailerArray.campaign_buy_now,
           
     }			
    return retailer
  }

  function  transformCountryCount(countryCountArray)
  { 
     const countryCount =  
      {
          _id:`imported-countryCount-${countryCountArray._id}`,
          _type: 'countryCount',
          retailer:countryCountArray.retailer,
          country_name:countryCountArray.country_name,
          cssClass:countryCountArray.cssClass
      }			
    return countryCount
  }
  function  transformProduct(productArray)
  {
      const product =  
      {
           _id:`imported-product-${productArray.product_id}`,
           _type: 'product',
           show_country_price_status: productArray.show_country_price_status,
           show_country_offer_status: productArray.show_country_offer_status,
           retailer:retail,
           countryCount:ctCount,
           show_store_locator:productArray.show_store_locator,
           table_header:productArray.table_header,
           price_symbol:productArray.price_symbol,
           pdate:productArray.pdate,
           totalWProduct:productArray.totalWProduct,
           brand_name:productArray.brand_name,
           widget_name:productArray.widget_name,
           title:productArray.title,
           image_url:productArray.image_url,
           widget_id:productArray.widget_id,
           product_id:productArray.product_id,
           product_variant:productArray.product_variant,
           product_variant_id:productArray.product_variant_id,
           product_ean:productArray.product_ean,
           widget_theme_id:productArray.widget_theme_id,
           widget_outer_class:productArray.widget_outer_class,
           widget_title_wrap:productArray.widget_title_wrap,
           widget_closebutton:productArray.widget_closebutton,
           show_price_status:productArray.show_price_status,
           widget_img_instock:productArray.widget_img_instock,
           widget_img_outofstock:productArray.widget_img_outofstock,
           widget_pointer:productArray.widget_pointer,
           widget_btn_wrap:productArray.widget_btn_wrap,
           widget_disabled:productArray.widget_disabled,
           unvailable_msg:productArray.unvailable_msg,
           msg_container_class:productArray.msg_container_class,
           ip_address:productArray.ip_address,
           showDiv:productArray.showDiv,
           overlay_class:productArray.overlay_class,
           cw_structure_css:productArray.cw_structure_css,
           cw_conditional_css:productArray.cw_conditional_css,
           count_retailer:productArray.count_retailer,
           country_name:productArray.country_name,
           show_available_retailers:productArray.show_available_retailers,
           show_available_class:productArray.show_available_class,
           enable_custom_check:productArray.enable_custom_check,
           buy_in_store_txt:productArray.buy_in_store_txt,
           nearest_store_txt:productArray.nearest_store_txt,
           postal_address_txt:productArray.postal_address_txt,
           current_location_txt:productArray.current_location_txt,
           nearest_stores_txt:productArray.nearest_stores_txt,
           show_hide_txt:productArray.show_hide_txt,
           open_in_map_txt:productArray.open_in_map_txt,
           search_txt:productArray.search_txt,
           close_txt:productArray.close_txt,
           no_store_txt:productArray.no_store_txt,
           no_store_desc:productArray.no_store_desc,
           contact_txt:productArray.contact_txt,
           contact_url:productArray.contact_url,
           metric_txt:productArray.metric_txt,
           imperial_txt:productArray.imperial_txt,
           result_txt:productArray.result_txt,
           variant_count:productArray.variant_count,
           variant_default:productArray.variant_default,
           disclaimer:productArray.disclaimer,
           disclaimer_out_stock1:productArray.disclaimer_out_stock1,
           disclaimer_out_stock2:productArray.disclaimer_out_stock2,
           disclaimer_status:productArray.disclaimer_status,
      }	
      return product
  }
  function  transformsmartProduct(smartProductID)
  {  
      const smartProduct =  
      {
          _id:`imported-smartProduct-${smartProductID}`,
          _type: 'smartProduct',
           smartProductId:smartProductID,
           product:pdt
      }	
      return smartProduct
  }

  function mainTranform(externalProd) 
  { 
     
         var currentId=allSmartProductID[currentCount];
              var cwJsonVal = externalProd[currentId][1].product;
              var retailerArray=	cwJsonVal[0].retailer;
              var countryCountArray=	cwJsonVal[0].countryCount;
              countryCountArray.forEach((element, index) => 
              {
               
                element._id=currentId+"-"+index ;
              });
              let retailerTransform=(retailerArray).map(transformRetailer);
              let countryCountTransform=(countryCountArray).map(transformCountryCount);
              retail=[];
              retailerTransform.forEach(s => {
              retail.push({_type: 'reference', _ref: s._id});
              });
              ctCount=[];
              countryCountTransform.forEach(m => {
              ctCount.push({_type: 'reference', _ref: m._id});
              });	
              let productTransform=(cwJsonVal).map(transformProduct);
              pdt=[];
              productTransform.forEach(h => {
                pdt.push({_type: 'reference', _ref: h._id});
             });	
           
            
    let smartProductTransform =  
     {
      _id:`imported-smartProduct-${currentId}`,
      _type: 'smartProduct',
       smartProductId:currentId,
       product:pdt
     }
     pdtInput.push({_type: 'reference', _ref: smartProductTransform._id});
     smartProductTransformArray=[];
     smartProductTransformArray.push(smartProductTransform);
  
      currentCount++;
      
     return [retailerTransform,countryCountTransform,productTransform,smartProductTransformArray];
     
    }
  
    let products = (props).map(mainTranform);
    

   let ProductItemTransform =  
   {
       _id:`imported-ProductItem-${campaignID}`,
       _type: 'productItem',
       smartProduct:pdtInput,
   
   }
   ProductItemTransformArray.push(ProductItemTransform);
   ProductItemReference.push({_type: 'reference', _ref: ProductItemTransform._id});
   let CampaignProductItemTransform =  
   {
       _id:`imported-CampaignProductItem-${campaignID}`,
       _type: 'campaignProductItem',
        productItem:ProductItemReference,
        campaign: {_type: 'reference', _ref: campaignID}
   }
   CampaignProductItemTransformArray.push(CampaignProductItemTransform);
   var assetDocument= await storeCampaignStyleFile();
   let campaignStyleTransform =  
   {
    _id:`imported-campaignStyle-${campaignID}`,
    _type: 'campaignStyle',
     campaign:{_type: 'reference', _ref: campaignID},
     styleFile:  {
        _type: "file",
        asset: 
        {
         _ref: assetDocument._id,
         _type: "reference",
        }
   }
   }
   console.log("campaignStyleTransform",campaignStyleTransform);
   CampaignStyleArray.push(campaignStyleTransform);
   let allDocuments=_.flatten(products);
   allDocuments.push(ProductItemTransformArray);
   allDocuments.push(CampaignProductItemTransformArray);
   allDocuments.push(CampaignStyleArray);
    return allDocuments;
  
 }