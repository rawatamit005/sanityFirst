 import React from 'react';
import { urlFor } from "../../lib/image-url";
function CampaignBanner(props) {
    
  return (
    <div className="cw_image_banner campaign-component" data-componentname="imageBanner" data-component-experience-variant="default" data-component-variants="defaultView">
        <div className="slider_content">
        <div className="cw_js_slider_item">
                <figure>
                    <picture
                    className="bp-image__placeholder"
                    >
                    <source
                        media="screen and (max-width: 575px)"
                        srcSet={`${urlFor(props.bannerImages)
                        .width(500)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <source
                        media="screen and (max-width: 767px)"
                        srcSet={`${urlFor(props.bannerImages)
                        .width(800)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <img
                        src={urlFor(props.bannerImages)
                        .width(1000)
                        .fit('max')
                        .url()}
                        alt={props.bannerImages.alt}
                    />
                    </picture>
                </figure>
                
            </div>
        </div>
       
    </div>
  );

 
}

export default CampaignBanner;
