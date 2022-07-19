
import {useState, useEffect} from 'react';
import React from 'react'
import {useDocumentOperation} from '@sanity/react-hooks'
import sanityClient from "@sanity/client"
import {addProductAction} from "./addProductAction.js"
import {useValidationStatus} from '@sanity/react-hooks'
import { BsExclamationTriangle ,BsExclamationCircle} from "react-icons/bs"
const configSetting = require("../../config");

const _ = require("lodash");  
const sanityClientConfig = {
  projectId:'8gjfptsf',
  dataset:  process.env.SANITY_STUDIO_API_DATASET || configSetting.sanity.dataset,
  token: configSetting.sanity.token,
  useCdn: true,
}

function triggerWebBuild(){
  var postData;
  
  if(window.location.hostname !== "localhost"){
    postData = 
    (process.env.SANITY_STUDIO_API_DATASET == 'production') ? '{"event_type": "web-build-deploy"}' : '{"event_type": "web-build-deploy-develop"}';
    const response = fetch(configSetting.sanity.githubRepoDispatchUrl, {
      method: 'POST',
      body: postData, // string or object
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'Basic '+ configSetting.sanity.githubBasicAuthCode
      }
    });
    // const myJson = response.json(); 
  }
}

export  function setPublishedAction(props) {
  console.log('campaing new data', props);
  var productid=[];
  var smartProductID=[];
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const {isValidating, markers} = useValidationStatus(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
 
  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  const onHandle = () => 
  {

    if(markers.length > 0 || !props.draft.content.hasOwnProperty('country') || !props.draft.content.hasOwnProperty('brand') || !props.draft.content.hasOwnProperty('locale')) 
    {
     
      setDialogOpen(true) 
    }
    else
    {  // This will update the button text 
      
      setIsPublishing(true)
     switch (props.type) {
       case 'campaign':
                      for(let x of props.draft.content.bodyComponent )
                      {
                        if(x._type=="productList" || x._type =="productCarousel")
                        {
                          for(let Y of x.product )
                        
                              {
                                productid.push(Y.productCode);
                                smartProductID.indexOf(Y.smartProductId) === -1 ? smartProductID.push(Y.smartProductId) :console.log("This item already exists");
                            
                            
                              }
                        }
                      }
          if(smartProductID.length!=0)
          {

                   
       const client = sanityClient(sanityClientConfig);
       const data= {  
                      campaign_id:props.id,
                      campaign_name: props.draft.content.title,
                      country_id:	parseInt(props.draft.content.country.countryId),
                      brand_id:	parseInt(props.draft.content.brand.brandId),
                      smartkey_data: smartProductID.toString(),
                      language_code: props.draft.content.locale.languageCode
       }    
                   
       const jsonString = JSON.stringify(data)
       const requestOptions = 
        {
            method: 'POST',
            body:jsonString
            
        };
      
        
       // fetch('https://cwqa.srmtechsol.com/SNWLive/CW_API/post_BIN_products_details', requestOptions)
        fetch('https://app.cartwire.co/CW_API/post_BIN_products_details', requestOptions)

        .then(response => response.json())
        .then(async (data) => {
        
       
         var responseData= await addProductAction( data.items,props.id,smartProductID ,data.css_filename) ;
        
            let transaction = client.transaction();
            responseData.forEach(document => {
              document.forEach(mainDoc=>
                {
                  transaction.createOrReplace(mainDoc)
                });
              
              
            });
              transaction.commit()
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
          }  
       console.log("CustomPublish")
        
   break;

   default:
    /// Doing nothing? Consider deleting this switch statement to simplify your code.
   break;
      }

  
// Perform the publish
 publish.execute()
// Signal that the action is completed
 props.onComplete(triggerWebBuild())


    }
   
   
  }
  return {
    disabled: publish.disabled,
    label: isPublishing ? 'Publishing…' : 'Publish',
    dialog: dialogOpen && {
      type: 'modal',
      onClose: () => setDialogOpen(false),
      content:    
      <div className="popup_box">
 <div className="popup_outer">
      <div  className="leftbar">
        <p className="icon"><BsExclamationCircle/></p>
        <p>Mandatory fields yet to be filled</p>
        <div className="logo_bottom"> <img src="../static/footer-logo.png"/>  Campaign Builder </div>
      </div>
      <div className="rightbar"> 
        <h3>Please rectify the below Errors</h3>
        <ol> 
          {!props.draft.content.hasOwnProperty('country') &&
                 <li>Please Provide Country Name</li>
          }
         {!props.draft.content.hasOwnProperty('brand') &&
                <li>Please Provide Brand Name</li>
          }
        {!props.draft.content.hasOwnProperty('locale') &&
                <li>Please Provide locale Name</li>
          }
       {markers.map(marker =>
      
         <li>{marker.item.message}</li>
      )}
     </ol>
        <button onClick={() => setDialogOpen(false)} className="btn_review">Review</button> 
      </div>
     
  </div>
     <style jsx>{`
      .popup_box{margin:-15px}
     .popup_outer{max-width:600px; width: 100%;display: block;margin: auto; font-family: Arial, "sans-serif"; display: flex; min-height: 300px;border-radius: 10px;overflow: hidden;}
     .popup_outer .leftbar{width:30%; background: #ff1d1d; float: left; padding: 100px 20px 60px 20px; box-sizing: border-box; color: #fff; position: relative;}
     .popup_outer .leftbar p{font-size: 16px; text-align: center; line-height: 20px;}
     .popup_outer .leftbar .icon{font-size: 50px;margin: 0;padding: 0;}
     .popup_outer .leftbar .logo_bottom{color: #fff; font-size: 10px; text-align: center;display: block;position: absolute;left: 20px;bottom: 20px;}
     .popup_outer .leftbar .logo_bottom img{max-width:100%; max-height: 36px;}
     
     
     .popup_outer .rightbar{width:70%; background: #fff; float: left; padding: 20px 20px 60px 20px; box-sizing: border-box; position: relative;}
     .popup_outer .rightbar h3{font-size: 18px; font-weight: 600; color: #000; border-bottom: solid 1px #838383; margin: 0 0 20px 0; padding: 0 0 10px;}
     .popup_outer .rightbar ol{margin: 0; padding:0 0 0 15px;}
     .popup_outer .rightbar ol li{font-size: 14px; color: #444;margin: 0 0 10px; padding:0;}
     .popup_outer .rightbar .btn_review{background: #4b67d7; color: #fff; font-size: 15px; text-align: center;width: 100px; height: 34px; line-height: 34px;display: inline-block;text-decoration: none;border-radius: 4px;position: absolute;left: 20px;bottom: 20px;border:none}
     .popup_outer .rightbar .close_btn{color: #666;position: absolute;right: 20px;top: 20px;text-decoration: none;}
           `}</style>
        </div>
     
   
  
   },
    onHandle
 
  }
}