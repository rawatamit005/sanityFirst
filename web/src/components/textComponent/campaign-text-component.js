import * as style from "./campaign-text-component.css";
import React from 'react';
import { urlFor } from "../../lib/image-url";
import CTALink from "../CTALink";
import BlockSection from '../common/text-section';
import { navigate } from "gatsby";
const doNavigate = target => {
    if (!target || !target.length) {
      return;
    }
    const internal = /^\/(?!\/)/.test(target);
    if (internal) {
      navigate(target);
    } else {
      window.location = target;
    }
  };
function CampaignTextComponent(props) {
  var bgClass = '';
  var bgbuttonClass = '';
  var heading = {};
  heading.headingLevel = props.headingLevel ? props.headingLevel.toLowerCase() : '';
  if(props.backgroundimage == null ){
    bgClass += 'cw_color_text';
  }
  
  if(props.backgroundimage == null && props.ctas){
    bgbuttonClass += 'cw_color__cta';
  }
  return (
  <div className="cw_text_component campaign-component" data-componentname="textComponent" data-component-experience-variant="default" data-component-variants="defaultView">
      <div className={`${props.backgroundimage!=null ? "cw_text_component_slider" : ""}`}>
        <div className={`${props.backgroundimage!=null ? "cw_text_component_container" : "cw_text_component_container_inner"}`}>
        {props.headingLevel && props.title && <heading.headingLevel className={`cw_text_component_title ${bgClass}`}>{props.title}</heading.headingLevel> }
        {props.headingLevel==null && props.title && <h1 className={`cw_text_component_title ${bgClass}`}>{props.title}</h1> }   
        { props.subtitle && <p className={`cw_text_component_subtitle ${bgClass} `}>{props.subtitle}</p>   }
        { props._rawParagraph &&   <div className={`cw_text_component_para ${bgClass} ${props.backgroundimage!=null ? "cw_text_component_para_height" : ""}  `}><BlockSection {...props}></BlockSection></div>  } 
            {props.ctas && props.ctas.length!=0 &&  <p className='cw_text_component_btnWrap'> 
              {(props.ctas || []).map((c, i) => (
             
               <CTALink
                 key={`cta_${i}`}
                 {...c}
                 buttonActionClass={`cw_text_component_ctabutton btn_outline ${bgbuttonClass}`}
               />
            
           ))}
            </p>}
                
                </div>
                {props.backgroundimage!=null &&
                 <div className="cw_text_component_banner_pic">
                 <figure>
                  
                     <picture>
                     <source
                         media="screen and (max-width: 560px)"
                         srcSet={`${urlFor(props.backgroundimage)
                         .width(560)
                         .fit('max')
                         .auto('format')
                         .url()
                         .toString()}`}
                     />
                     <source
                         media="screen and (max-width: 320px)"
                         srcSet={`${urlFor(props.backgroundimage)
                         .width(560)
                         .fit('max')
                         .auto('format')
                         .url()
                         .toString()}`}
                     />
                     <img
                         src={urlFor(props.backgroundimage)
                         .url()}
                         alt={props.backgroundimage.alt}
                     />
                    
                     </picture>
                 </figure>
                 </div>

}
               
  </div>
</div>
  );

 
}

export default CampaignTextComponent;
