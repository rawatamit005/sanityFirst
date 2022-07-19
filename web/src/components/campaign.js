import "./campaign.module.css";
import HeaderComponent from "./header/campaign-header";
import FooterComponent from "./footer/campaign-footer";
import ImageBanner from "./banner/image-banner";
import ImageCarousel from "./banner/image-carousel";
import ProductList from "./product/product-list";
import ProductCarousel from "./product/product-carousel";
import Social from "./social/social";
import TextComponent from "./textComponent/campaign-text-component";
import VideoComponent from "./videoComponent/youtube-video";
import React from "react";

function Campaign(props) {
  const {
    content,
    campProdData,
    LocalisationList,
    _id
  } = props;
  //console.log('props-----', props);
  const isAnalytic=content.gaID!=null?true:false;
  return (
    <div className="cw_page_container">
      <div className="cw_container">
        <div className="cw_main_container cw_campaign_selector" data-locale={content.locale.localeName} data-gaid={content.gaID} data-report-suite-id={content.reportSuiteID}
        data-root-url={content.rootUrl} data-country={content.country.countryName} data-brand={content.brand.brandName}>
            
            <section>
              <HeaderComponent {...content} />
            </section>
            {content.bodyComponent && content.bodyComponent.map((comp, index) => (
              <section key={index}>
                {comp._type === 'videoComponent' && (
                  <VideoComponent {...comp} isAnalytic={isAnalytic} />
                )}
                {comp._type === 'imageBanner' && (
                  <ImageBanner {...comp} />
                )}
                {comp._type === 'imageCarousel' && (
                  <ImageCarousel {...comp} />
                )}
                {comp._type === 'socialChannel' && (
                  <Social {...comp} />
                )}
                  {comp._type === 'productList' && (
                  <ProductList {...comp}  id={_id}  isAnalytic={isAnalytic} campProdData={campProdData} countryCode={content.country.countryCode}  LocalisationList={LocalisationList.nodes} Locale={content.locale}/>
                )}
                  {comp._type === 'productCarousel'  && (
                  <ProductCarousel {...comp} id={_id} isAnalytic={isAnalytic} campProdData={campProdData}  countryCode={content.country.countryCode} LocalisationList={LocalisationList.nodes} Locale={content.locale}/> 
                )}
                 {comp._type === 'textComponent' && (
                  <TextComponent {...comp} />
                )}
               
              </section>
            ))}
            <section>
        
            </section>
            <section>
              <FooterComponent {...content} />
            </section>
          </div>
        </div>
      </div>
  );
}

export default Campaign;