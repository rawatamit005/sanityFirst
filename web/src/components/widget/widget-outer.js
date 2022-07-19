import React, { useState, useEffect, useRef } from "react";
import WidgetListing from "./listing";



function WidgetOuter(props) {

    return (
        <div>
      
      <div className="cw_widget_popup_outer"></div>
            <div className="cw_widget_popup" style={{top:  props.widgetPosition}}>
                <button className="cw_widget_close" onClick={() => props.setValueVisible(false)}>
                    <img alt="Close Widget" src="https://s3.cartwire.co/widget/v2.0/images_retailPopup/close_icon.png" />
                </button>
                <span className="cw_popup_name">{props.campProdData[0].title}</span>
                <div className="cw_widget_product_wrap">
                    <img className="cw_popup_img" src={props.productImage} alt="{props.title}" />
                    <h3 className="cw_popup_heading">{props.title}</h3>
                </div>
                <WidgetListing {...props} />
            </div>
      </div>
    );
    
    
    }

export default WidgetOuter;
