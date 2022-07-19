import "./campaign-header.css";
import React from "react";
import { urlFor } from "../../lib/image-url";


function campaignHeader(props) {
  return (
    <header className="cw_header campaign-component">
       {props.style.header.clickLogo === true ?(<a href={props.style.header.logoUrl}>
       <figure>
           <picture
             className="bp-image__placeholder">
             <source
               media="screen and (min-width: 560px)"
               srcSet={`${urlFor(props.style.header.brandLogo)
                 .width(200)
                 .auto('format')
                 .url()
                 .toString()}`}
             />
             <source
               media="screen and (min-width: 320px)"
               srcSet={`${urlFor(props.style.header.brandLogo)
                 .width(200)
                 .auto('format')
                 .url()
                 .toString()}`}
             />
             <img
               src={urlFor(props.style.header.brandLogo)
                 .width(200)
                 .url()}
               alt={props.style.header.brandLogo.alt}
             />
           </picture>
         </figure>
       </a>):(<figure>
           <picture
             className="bp-image__placeholder">
             <source
               media="screen and (min-width: 560px)"
               srcSet={`${urlFor(props.style.header.brandLogo)
                 .width(200)
                 .auto('format')
                 .url()
                 .toString()}`}
             />
             <source
               media="screen and (min-width: 320px)"
               srcSet={`${urlFor(props.style.header.brandLogo)
                 .width(200)
                 .auto('format')
                 .url()
                 .toString()}`}
             />
             <img
               src={urlFor(props.style.header.brandLogo)
                 .width(200)
                 .url()}
               alt={props.style.header.brandLogo.alt}
             />
           </picture>
         </figure>)} 
    </header>
  );
}

export default campaignHeader;
