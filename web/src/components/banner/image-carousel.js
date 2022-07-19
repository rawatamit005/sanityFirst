import "./campaign-banner.css";
import React from 'react';
import { urlFor } from "../../lib/image-url";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function CampaignBanner(props) {
    var bannerImages = {};
    if(props.bannerImages){
        bannerImages = props.bannerImages;
    }else if(props.imageCarousel){
        bannerImages = props.imageCarousel;
    }
  return (
    <div className="cw_js_slider banner_list_section campaign-component" data-componentname="imageCarousel" data-component-experience-variant="default" data-component-variants="defaultView">
        <div className="slider_content">
        <Carousel interval={3000} autoPlay={props.autoSlide} infiniteLoop={true} stopOnHover={false}>
       
            {bannerImages.length && bannerImages.map((banner, i) => (
                     
                <div key={i} className="cw_js_slider_item">
                    <figure>
                        <source
                            media="screen and (max-width: 575px)"
                            srcSet={`${urlFor(banner)
                            .width(500)
                            .fit('max')
                            .auto('format')
                            .url()
                            .toString()}`}
                        />
                        <source
                            media="screen and (max-width: 767px)"
                            srcSet={`${urlFor(banner)
                            .width(800)
                            .fit('max')
                            .auto('format')
                            .url()
                            .toString()}`}
                        />
                        <img
                            src={urlFor(banner)
                            .width(1000)
                            .fit('max')
                            .url()}
                            alt={banner.alt}
                        />
                    </figure>
                  
                </div>
               
            )
            
            )}
             </Carousel>
        </div>
       
    </div>
  );

 
}

export default CampaignBanner;
