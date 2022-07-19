import React, { useState, useEffect, useRef } from "react";
import WidgetListing from "./listing";
const retailerConfig = require("../../../config/campaign-retailer-config");

function UseComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(
      initialIsVisible
    );
    const ref = useRef(null);
  
    const handleHideDropdown = (event) => {
      if (event.key === "Escape") {
        setIsComponentVisible(false);
      }
    };
  
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
      }
    };
  
    useEffect(() => {
     
      document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("keydown", handleHideDropdown, true);
        document.removeEventListener("click", handleClickOutside, true);
      };
    });
  
    return { ref, isComponentVisible, setIsComponentVisible };
  }


function Widget(props) {
  //console.log(props);
  var retailerConfigList = {};
  let smallestprice;
  let pricearray=[];
  let widgetDataDetail;
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = UseComponentVisible(false);
  if(props.campProdData){
     widgetDataDetail = props.campProdData[0];
     if(retailerConfig.campaign[props.campaignId]){
      retailerConfigList = {};
      retailerConfig.campaign[props.campaignId].retailer.map((x, i) => {
          retailerConfigList[x.retailer_id] =x;
      });
    }else{
  
    }
    
    props.campProdData[0].retailer.map((x, i) => {
    
       if(x.is_available=="1" && (!retailerConfig.campaign[props.campaignId] || retailerConfigList[x.retailer_id]!=undefined))
       {
         if(x.price!=null)
         pricearray.push(x.price);
       }
    });
 if(pricearray.length!=0)
 {
  
  smallestprice = pricearray.sort((a,b)=>b-a).reverse()[0];
  
 }
}
  const clickHandler = (event) => {

  if(props.isAnalytics && !window.location.pathname.includes("/preview/"))
  {
    var widgetData = props.campProdData[0];
   var retailerAnalytics = { "productID": widgetData.product_ean, "productName": widgetData.widget_name, "price": "", "brand": widgetData.brand_name, "quantity": "" }
    window.cwDigitalData("", "shop_now", retailerAnalytics);
  }
 
    props.callPopUp(props)
  }
  const widgetType = 'inline';
  if(props.widgetType === 'inline'){
    return (
        <div className="cw_widget_inline">
            <WidgetListing {...props} />
        </div>
    );
  }else{
    return (
        <div>
      
 {props.LocalisationList.map((x, i) => ( x.title["en"]=="Buy Now" && (!props.DispalyPriceOnBin || pricearray.length ==0 )&& 
   (<div key={i} className="cw_btn_wrap">

 {x.title[props.LanguageCode.toLowerCase()]!=undefined ? (
       <button className="cw_btn_buynow" data-index={props.currentIndex}  onClick={clickHandler}>{x.title[props.LanguageCode.toLowerCase()]}</button>
      ) : (
        <button className="cw_btn_buynow" data-index={props.currentIndex}  onClick={clickHandler}>{x.title["en"]}</button>
      )}
 </div>)))}    
 {props.LocalisationList.map((x, i) => ( x.title["en"]=="Buy Now from" && props.DispalyPriceOnBin && pricearray.length !=0 && 
         (<div key={i} className="cw_btn_wrap">

 {x.title[props.LanguageCode.toLowerCase()]!=undefined ? (
       <button className="cw_btn_buynow" data-index={props.currentIndex}  onClick={clickHandler}>{x.title[props.LanguageCode.toLowerCase()]} {widgetDataDetail.price_symbol}{smallestprice}</button>
      ) : (
        <button className="cw_btn_buynow" data-index={props.currentIndex}  onClick={clickHandler}>{x.title["en"]} {widgetDataDetail.price_symbol}{smallestprice} </button>
      )}
 </div>)))} 
 
      </div>
      
    );
    
    }
}

export default Widget;
