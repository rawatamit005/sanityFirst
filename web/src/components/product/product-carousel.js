import * as styles from "./campaign-product.css";
import React, { useEffect, useState,useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlockSection from '../common/block-section'
import Widget from '../widget/widget'
import WidgetOuter from "../widget/widget-outer";
import { urlFor } from "../../lib/image-url";

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
function ProductCarousel(props) {

    const [ popup , setPopup ] = useState({})
    var smartProductDetails;
  var productListData = {};
  var heading = {};
  heading.headingLevel = props.headingLevel ? props.headingLevel.toLowerCase() : '';
    const [widgetPosition, setwidgetPosition] = useState(0);
     const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = UseComponentVisible(false);                       
    
    if(props.campProdData){
      smartProductDetails = props.campProdData.productItem[0]['smartProduct'];
      smartProductDetails.map((x, i) =>  (
        productListData[x.smartProductId] = x.product
      ));
    }

    const handleCallPopUp = (val) => {
        setPopup(val)
        setIsComponentVisible(true);
        setwidgetPosition(document.body.scrollTop || document.documentElement.scrollTop);     
    }
  var carouselClass, partialVisible = true, deskSlideItem = 1, tabSlideItem = 2, mobSlideItem = 1;
  if(props.widgetType === 'inline'){
    deskSlideItem = 2;
    tabSlideItem = 1;
    carouselClass = 'inline_carousel_2';
  }else{  
    deskSlideItem = 3;
    tabSlideItem = 2;
    carouselClass = 'popup_carousel_1';
  }
  
  if(props.product.length === 1 && props.widgetType === 'inline'){
    deskSlideItem = 1;
    tabSlideItem = 1;
    carouselClass = 'inline_carousel_1';
  }
  if (props.product.length === 1) {
    partialVisible = false;
  }
  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items:deskSlideItem,
        partialVisibilityGutter : 10
    },
    desktop: {
        breakpoint: { max: 1199, min: 769 },
        items: deskSlideItem,
        partialVisibilityGutter : 10
    },
    tablet: {
        breakpoint: { max: 768, min: 576 },
        items: tabSlideItem,
        partialVisibilityGutter : 15
    },
    mobile: {
        breakpoint: { max: 575, min: 0 },
        items: mobSlideItem,
        partialVisibilityGutter : 20
    },
};

  return (
      <div>
          <div ref={ref}>
        {isComponentVisible && (
            <>
           <WidgetOuter  {...popup} campaignId={props.id} setValueVisible={ setIsComponentVisible } widgetPosition={widgetPosition}/>
 
            </>
        )}
           
        </div>
    <div className="cw_product_container product_list_section campaign-component productCarousel-section" data-componentname="productCarousel" data-component-experience-variant="default" data-component-variants="defaultView" data-service-provider="cartwire">
    {props.headingLevel && <heading.headingLevel className="category_title" >{props.heading}</heading.headingLevel>}
    <BlockSection {...props} ></BlockSection>
    <div className={carouselClass}>
      <div className="cw_product_container cw_product_carousel">
                <Carousel partialVisible={partialVisible} responsive={responsive} infinite={false} autoPlay={false} shouldResetAutoplay={false}>
                    {props.product && props.product.map((product,i) => (
                      <div key={i} className="item"  dataidentifier-value={product.productCode} data-identifier-type="GTIN">
                            <div className="cw_product_img">
                                <figure>
                                    <picture
                                    className="bp-image__placeholder"
                                    style={{
                                        paddingTop: `100%`,
                                        //background: `url(${product.productImage})`,
                                        backgroundSize: 'cover',
                                    }}
                                    >
                                   {product.overrideImage!=null && product.overrideImage.asset!=null && product.overrideImage.alt==null &&  <img src= {urlFor(product.overrideImage).width(250).url()+''} width="210" height="210" alt={product.title} />}
                                   {product.overrideImage==null &&  <img src={(product.productImage)} width="210" height="210" alt={product.title}  />}
                                   {product.overrideImage!=null && product.overrideImage.asset!=null && product.overrideImage.alt!=null && <img  src={urlFor(product.overrideImage).width(250).url()}  width="210" height="210" alt={product.overrideImage.alt} />}
                                   {product.overrideImage!=null && product.overrideImage.asset==null &&  product.overrideImage.alt!=null && <img src={(product.productImage)} width="210" height="210" alt={product.overrideImage.alt}  />}
                                   {product.overrideImage!=null && product.overrideImage.asset==null &&  product.overrideImage.alt==null && <img src={(product.productImage)} width="210" height="210" alt={product.title}  />}
                                    </picture>
                                </figure>
                            </div>
                            <div className="cw_product_block_title">{product.title}</div>
                            <div>
                            <Widget  {...product} campaignId={props.id} callPopUp={ handleCallPopUp } campProdData={productListData[product.smartProductId]} widgetType={props.widgetType} isAnalytics={props.isAnalytic} countryCode={props.countryCode} currentIndex={i} LocalisationList={props.LocalisationList} LanguageCode={props.Locale.languageCode} DispalyPriceOnBin={props.displayPriceOnBIN} hidePriceOfferInWidget={props.hidePriceOfferInWidget}/>
                        </div>
                        </div>
                    ))}
                     </Carousel>
            </div>
      </div>
  </div>
      </div>

  );
}

export default ProductCarousel;
