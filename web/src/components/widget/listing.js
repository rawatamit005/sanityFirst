import React, { useState } from "react"
import {TiArrowSortedDown,TiArrowSortedUp} from "react-icons/ti"
const retailerConfig = require("../../../config/campaign-retailer-config");

function Listing(props) {
    //console.log('widget props--', props);
    var widgetData, retailerList = [], retailerConfigList = {}, floatValue = 2;
    const hidePriceOffer = props.hidePriceOfferInWidget ? true : false;
    if(props.campProdData){
        props.campProdData[0].retailer.map((x, i) => {
            floatValue=(x.price !=null && x.price.split('.')[1]!=undefined)? x.price.split('.')[1].length : 2;
            x.price = (parseFloat(x.price) && parseFloat(x.price) !== NaN)? parseFloat(x.price).toFixed(floatValue) : null;
            retailerList.push(x);
            retailerConfigList[x.retailer_id] = {};
        });
        widgetData = props.campProdData[0];
    }
  
  
  
  if(retailerConfig.campaign[props.campaignId]){
    retailerConfigList = {};
    retailerConfig.campaign[props.campaignId].retailer.map((x, i) => {
        retailerConfigList[x.retailer_id] = x;
    });
  }else{

  }

  var [sortingState, setSortingValue] = useState(true);
  var [retailers, setRetailers] = useState(retailerList);

//   Sorting Function
    const sortByPriceAs = () => {
        setSortingValue(false)
        var newRetailers = retailers.sort((a, b) => b.price -a.price);
        setRetailers([...newRetailers]);
       
    }
    const sortByPriceDC = () => {
        setSortingValue(true)
        var newRetailers = retailers.sort((a, b) => a.price -b.price);
        setRetailers([...newRetailers]);
       
    }
    const transformStockMessage = (retailerData) => {
        let stockLink = retailerData.buy_now_text.toString();
        let result = stockLink.replace('[a]', '<a href="'+retailerData.campaign_buy_now+'" target="_blank">').replace('[/a]', '</a>');
        return result;
    }
    
    const clickHandleStock = (e, retailerData) => {
        let el = e.target;
        while (el && el !== e.currentTarget && el.tagName !== "A") {
            el = el.parentNode;
        }
        if (el && el.tagName === "A") {
            captureRetailerAnalytics(e, retailerData);
        }
    }
    
    //Analytics Function
    const captureRetailerAnalytics = (e,retailerInfo) => {
        var retailerAnalytics = [];
        if(props.isAnalytics && !window.location.pathname.includes("/preview/"))
        {
            var cwPriSymTemp = widgetData.price_symbol+retailerInfo.price;
            if(retailerInfo.price === null)
            {
                        cwPriSymTemp =''; 
            }
            retailerAnalytics = { "productID": widgetData.product_ean, "productName": widgetData.widget_name, "price":cwPriSymTemp, "brand": widgetData.brand_name, "quantity": retailerInfo.quantity,"retailerName" :retailerInfo.retailer_name,"sku":"","category":retailerInfo.category};
            window.cwDigitalData("", "retailer_click", retailerAnalytics);
   
        }
      
    }

    const retailerUrl = (buyNowUrl, retailerData) => {
        var newUrl = '';
        if(retailerData.buy_now_url_prefix){
            if(buyNowUrl){
                if(buyNowUrl.includes('?')){
                    newUrl = buyNowUrl+'&'+retailerData.buy_now_url_prefix;
                }else{
                    newUrl = buyNowUrl+'?'+retailerData.buy_now_url_prefix;
                }
            }
        }else{
            newUrl = buyNowUrl;
        }
        return newUrl;
    }
   //console.log('retailer data ---------', retailers);
    
    const cdnPath = "https://s3.cartwire.co/widget/v2.0/images_retailPopup/";
    return (
      <div className={`${hidePriceOffer ? "cw_widget_cta_only" : ""}`}>
      <div className="cw_widget_listing">
          <ul className="cw_widget_main">
              <li className="cw_widget_list_header">
                <ul>
                    <li>{widgetData.table_header.split(",")[0]}</li>
                      {!hidePriceOffer && (
                          <li>
                              <span className="cw_mobile_offer">{widgetData.table_header.split(",")[1]}/</span>
                              <span className="cw_mobile_offer cw_price">
                                  {sortingState === true && (
                                      <button onClick={sortByPriceAs}>
                                          {widgetData.table_header.split(",")[2]}<span><TiArrowSortedUp size={15} /></span>
                                      </button>)
                                  }
                                  {!sortingState && (
                                      <button onClick={sortByPriceDC}>
                                          {widgetData.table_header.split(",")[2]}<span><TiArrowSortedDown size={15} /></span>
                                      </button>)
                                  }
                              </span>
                              <span className="cw_price cw_offer">
                                  {sortingState === true && (
                                      <button onClick={sortByPriceAs}>
                                          {widgetData.table_header.split(",")[1]}<span><TiArrowSortedUp size={15} /></span>
                                      </button>)
                                  }
                                  {!sortingState && (
                                      <button onClick={sortByPriceDC}>
                                          {widgetData.table_header.split(",")[1]}<span><TiArrowSortedDown size={15} /></span>
                                      </button>)
                                  }
                              </span>
                          </li>)}
                      {!hidePriceOffer && (<li className="cw_offer">{widgetData.table_header.split(",")[2]}</li>)}
                    <li>{widgetData.table_header.split(",")[3]}</li>
                </ul>
              </li>
              <li className="cw_widget_list_body">
                <ul>
                {retailers.map((x, i) =>   ( x.price != null && (retailerConfigList && retailerConfigList[x.retailer_id])  &&(
                    <li key={i} className="cw_widget_item">
                        <ul>
                            <li className="cw_widget_image">
                                <img src={cdnPath+x.retailer_logo} alt={x.retailer_name} />
                            </li>
                            {!hidePriceOffer && (
                                <li className="cw_widget_price">
                                    <div key={x.price} className="cw_price">
                                        <><span >{widgetData.price_symbol}</span>{x.price}</>
                                    </div>
                            
                                    <div className="cw_mobile_offer_detail"><span>{x.stock_txt} </span></div>
                            
                                    <div className={`cw_mobile_offer_detail ${x.cw_offer.trim() ? "cw_offer_Popup" : "cw_offer_Popup_hide"}`}><span>{x.cw_offer}</span></div>
                                </li>)}
                            {!hidePriceOffer && (<li className="cw_offer_detail"><span>{x.cw_offer}</span></li>)}
                            <li className={`cw_widget_cta ${x.price ? "cw_widget_cta_buy" : ""}`}>
                                <a href={ retailerUrl(x.campaign_buy_now, retailerConfigList[x.retailer_id]) } target="_blank" onClick={(e) => { captureRetailerAnalytics(e, x); }}>{x.buy_now_text}</a>
                            </li>
                        </ul>
                    </li>
                    )))}
                    {retailers && retailers.map((x, i) =>  ( x.price === null && x.cw_offer!="" && retailerConfigList[x.retailer_id] && (
                    <li key={i} className="cw_widget_item">
                        <ul>
                            <li className="cw_widget_image">
                                <img src={cdnPath+x.retailer_logo} alt={x.retailer_name} />
                            </li>
                            {widgetData.enable_custom_check === "1" && (
                                <li className="cw_stock_message">
                                {x.stock_txt}, {<span onClick={(e) => { clickHandleStock(e, x); } } dangerouslySetInnerHTML={{ __html: transformStockMessage(x) }}></span>}
                                </li>
                            )}
                            {widgetData.enable_custom_check !== "1" && (
                                <>
                                {!hidePriceOffer && (<li className="cw_widget_price">
                                    <div className="cw_price">
                                        {x.price &&
                                            <><span>{widgetData.price_symbol}</span>{x.price}</>}
                                    </div>
                                    <div className={`cw_mobile_offer_detail  ${x.cw_offer == "" ? "cw_widget_price_out_of_stock" : ""}`}><span>{x.stock_txt} </span></div>
                                    <div className={`cw_mobile_offer_detail ${x.cw_offer.trim() ? "cw_offer_Popup" : "cw_offer_Popup_hide"}`}><span>{x.cw_offer}</span></div>
                                </li>)}
                                {!hidePriceOffer && (<li className="cw_offer_detail"><span>{x.cw_offer}</span></li>)}
                                    <li className={`cw_widget_cta ${x.cw_offer!="" ? "cw_widget_cta_buy" : ""}`}>
                                        <a href={retailerUrl(x.campaign_buy_now, retailerConfigList[x.retailer_id])} target="_blank" onClick={(e) => { captureRetailerAnalytics(e, x); } }>{x.buy_now_text}</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>)
                    ))}
                     {retailers && retailers.map((x, i) =>  ( x.price === null && x.cw_offer=="" && retailerConfigList[x.retailer_id] && (
                    <li key={i} className="cw_widget_item">
                        <ul>
                            <li className="cw_widget_image">
                                <img src={cdnPath+x.retailer_logo} alt={x.retailer_name} />
                            </li>
                            {widgetData.enable_custom_check === "1" && (
                                <li className="cw_stock_message">
                                {x.stock_txt}, {<span onClick={(e) => { clickHandleStock(e, x); } } dangerouslySetInnerHTML={{ __html: transformStockMessage(x) }}></span>}
                                </li>
                            )}
                            {widgetData.enable_custom_check !== "1" && (
                                <>
                                {!hidePriceOffer && (<li className="cw_widget_price">
                                    <div className="cw_price">
                                        {x.price &&
                                            <><span>{widgetData.price_symbol}</span>{x.price}</>}
                                    </div>
                                    <div className={`cw_mobile_offer_detail  ${x.cw_offer == "" ? "cw_widget_price_out_of_stock" : ""}`}><span>{x.stock_txt} </span></div>
                                    <div className={`cw_mobile_offer_detail ${x.cw_offer.trim() ? "cw_offer_Popup" : "cw_offer_Popup_hide"}`}><span>{x.cw_offer}</span></div>
                                </li>)}
                                {!hidePriceOffer && (<li className="cw_offer_detail"><span>{x.cw_offer}</span></li>)}
                                    <li className={`cw_widget_cta ${x.cw_offer!="" ? "cw_widget_cta_buy" : ""}`}>
                                        <a href={retailerUrl(x.campaign_buy_now, retailerConfigList[x.retailer_id])} target="_blank" onClick={(e) => { captureRetailerAnalytics(e, x); } }>{x.buy_now_text}</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>)
                    ))}
                </ul>
            </li>
          </ul>
      </div>
      </div>
  );
}

export default Listing;
