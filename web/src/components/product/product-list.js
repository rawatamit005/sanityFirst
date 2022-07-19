import * as styles from "./campaign-product.css";
import React, { useEffect, useState,useRef } from 'react';
import "react-multi-carousel/lib/styles.css";
import BlockSection from '../common/block-section'
import WidgetOuter from "../widget/widget-outer";
import Widget from '../widget/widget';
import { urlFor } from "../../lib/image-url";
var showAllProduct = false;

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
function CampaignProduct(props) {
  //console.log('product list data===', props);
  if(props.id === 'f310b992-eb69-4049-ba7e-a5c2a0254747'){
    showAllProduct = true;
  }
  const [ popup , setPopup ] = useState({})
   var smartProductDetails;
  if(props.campProdData){
    smartProductDetails = props.campProdData.productItem[0]['smartProduct'];
    var productListData = {};
    smartProductDetails.map((x, i) =>  (
      productListData[x.smartProductId] = x.product
    ));
  }
 const [page, setPage] = useState(1);
 const [productList, setProductList] = useState([]);
 const totalProduct=props.product.length;
 const [productCount, setProductCount] = useState(0);
 const [widgetPosition, setwidgetPosition] = useState(0);
 const {
    ref,
    isComponentVisible,
    setIsComponentVisible
} = UseComponentVisible(false);                       

 const handleCallPopUp = (val) => { 
  
  setPopup(val)
  setIsComponentVisible(true);
  setwidgetPosition(document.body.scrollTop || document.documentElement.scrollTop);
    
}
  useEffect(() => {
    const getProductList = () => {
      var newProductList=[];
      var currentCount=productList.length;
      var nextCount = currentCount ? 6 : 6;
      var renderCount = showAllProduct ? props.product.length : currentCount+nextCount;
      for (var i =currentCount; i < renderCount; i++) 
      {
        if((productList.length + newProductList.length) !== props.product.length)
        {
          setProductCount(productCount +1);
          newProductList.push(props.product[i]);
        }
    }
    setProductList([...productList, ...newProductList]);
    }
    getProductList();
  }, [page]);

  var listClass = '';
  if(props.columnView === 2){
    listClass += 'cw_product_column_2';
  }else{  
    listClass += 'cw_product_column_1';
  }

  if(props.widgetType === 'inline'){
    listClass += ' inline_carousel_2';
  }
  var heading = {};
  heading.headingLevel = props.headingLevel ? props.headingLevel.toLowerCase() : '';
  return (
    <div>
    <div ref={ref}>
    {isComponentVisible && (
        <>
          <WidgetOuter  {...popup} campaignId={props.id} setValueVisible={ setIsComponentVisible } widgetPosition={widgetPosition}/>
        </>
    )}     
    </div>
    <div className={listClass}>
    <div className="cw_product_container product_list_section campaign-component productList-section" data-componentname="productList" data-component-experience-variant="default" data-component-variants="defaultView" data-service-provider="cartwire">
    {props.headingLevel && <heading.headingLevel className="category_title">{props.heading}</heading.headingLevel> }
    <BlockSection {...props}></BlockSection>
               <div>
               <ul className="cw_product_list">
                {productList.map((x, i) =>  (
                        <li key={i} className="item" dataidentifier-value={x.productCode} data-identifier-type="GTIN">
                            <div className="cw_product_img">
                                <figure>
                                    <picture
                                    className="bp-image__placeholder"
                                    style={{
                                        paddingTop: `100%`,
                                        //background: `url(${x.productImage})`,
                                        backgroundSize: 'cover',
                                    }}
                                    >
                                 
                                   {x.overrideImage!=null  && x.overrideImage.alt!=null && x.overrideImage.asset==null  &&  <img src={(x.productImage)} width="210" height="210" alt={x.overrideImage.alt} />}
                                   {x.overrideImage!=null  && x.overrideImage.alt!=null && x.overrideImage.asset!=null  &&  <img src= {urlFor(x.overrideImage).width(250).url()} width="210" height="210" alt={x.overrideImage.alt} />}
                                   {x.overrideImage!=null  && x.overrideImage.alt==null && x.overrideImage.asset!=null  &&  <img src= {urlFor(x.overrideImage).width(250).url()} width="210" height="210" alt={x.title} />}
                                   {x.overrideImage!=null  && x.overrideImage.alt==null && x.overrideImage.asset==null  &&  <img src={(x.productImage)} width="210" height="210" alt={x.title} />}
                                   {x.overrideImage === null  &&  <img src={(x.productImage)} width="210" height="210" alt={x.title} />}
                                  
                                    </picture>
                                </figure>
                            </div>
                            <div className="cw_product_block_title">{x.title}</div>
                            <div>
                                <Widget  {...x} campaignId={props.id} callPopUp={ handleCallPopUp } campProdData={productListData[x.smartProductId]} widgetType={props.widgetType} isAnalytics={props.isAnalytic} countryCode={props.countryCode} currentIndex={i}  LocalisationList={props.LocalisationList} LanguageCode={props.Locale.languageCode} DispalyPriceOnBin={props.displayPriceOnBIN} hidePriceOfferInWidget={props.hidePriceOfferInWidget} />
                            </div>
                        </li>
                    ))}
               </ul>
               <div className="cw_height_10"></div>
           
 {props.LocalisationList.map((x, i) => ( x.title["en"] === "Load More" &&
   (<div key={i} className="cw_load_cta">
 {x.title[props.Locale.languageCode.toLowerCase()] !== undefined ? (
   totalProduct !== productList.length && <button className="cw_btn_load" onClick={() => setPage(page + 1)}> {x.title[props.Locale.languageCode.toLowerCase()]}</button>
  ) : (
  totalProduct !== productList.length && <button className="cw_btn_load" onClick={() => setPage(page + 1)}>{x.title["en"]}</button>
)}
</div>)
 
 ))}

    </div>
  </div>
  </div>
  </div>
  );
}
export default CampaignProduct;
