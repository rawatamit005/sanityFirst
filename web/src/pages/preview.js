import React from "react";
import Campaign from "../components/campaign";
import Helmet from 'react-helmet';
const clientConfig = require("../../config/client-config");


const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: clientConfig.sanity.projectId,
  dataset: clientConfig.sanity.dataset,
  apiVersion: '2021-08-31',
  useCdn: false, // `false` if you want to ensure fresh data
  withCredentials: true
})

class PreviewDoc extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        CampData: null,
        cssFile: null
      }
    }
    componentDidMount () {
      var CampiagnId="";
      var smartProductID=[];
      var productid=[];
      if(this.props.campaingId.indexOf("drafts.")!=-1)
      {
        CampiagnId=this.props.campaingId.split(".")[1];

      }
      else
      {
        CampiagnId=this.props.campaingId;
      }
      
      
        const queryDraft = `*[_id == "${this.props.campaingId}"]  {
            ...,
            "campProdData": *[_type == "campaignProductItem" && (_id == "imported-CampaignProductItem-" +"${CampiagnId}" ) ][0]{
            ...,
            "productItem": *[_type == "productItem" && (_id == "imported-ProductItem-" +"${CampiagnId}" ) ]{
              ...,
              "smartProduct":*[_type=="smartProduct"  && (_id in  ^.smartProduct[]._ref)]
              {
                ...,
                smartProductId,
               
                 "product": *[_type=="product" && _id== ^.product[0]._ref ]
                 {
                   ...,
                  
                   "retailer": *[_type=="retailer" && (_id in  ^.retailer[]._ref) ]
                 }
                
              }
             
              },
            },
            "LocalisationList":{"nodes":*[_type == "translations" && !(_id in path("drafts.**")) ]}{
              ...,
            }
          }`
          
        //  "campProdData": *[_type=='campaignProductItem' && campaign._ref=="1afbcd3d-220c-46ff-bd4f-445a4a6a9724"] {
        
     
          client.fetch(queryDraft).then(response => {
            let cssFile = '';
            console.log(response);
           
            for(let x of response[0].content.bodyComponent )
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
             
           if(response[0].campProdData==null ||smartProductID.length!=response[0].campProdData["productItem"][0]["smartProduct"].length)  
            {
             
              if(smartProductID.length!=0)
              {
    
           const data= {  
                          campaign_id:response[0]._id,
                          campaign_name: response[0].content.title,
                          country_id:	parseInt(response[0].content.country.countryId),
                          brand_id:	parseInt(response[0].content.brand.brandId),
                          smartkey_data: smartProductID.toString(),
                          language_code: response[0].content.locale.languageCode
           }    
                       
           const jsonString = JSON.stringify(data)
           const requestOptions = 
            {
                method: 'POST',
                body:jsonString
                
            };
        
            fetch('https://app.cartwire.co/CW_API/post_BIN_products_details', requestOptions)
    
            .then(response => response.json())
            .then(async (data) => {
            
                   
                  response[0].campProdData={productItem:[]};
                  response[0].campProdData["productItem"][0]={smartProduct:[]};
                    smartProductID.map((y,i)=>
                      {
                           
                        response[0].campProdData["productItem"][0]["smartProduct"][i]={smartProductId:{},product:[]};
                          response[0].campProdData["productItem"][0]["smartProduct"][i]["product"]=(data.items[i][y][1].product);
                          
                          response[0].campProdData["productItem"][0]["smartProduct"][i]["smartProductId"]=(data.items[i][y][0].smart_product_key);
                       
                      }
                    );
                   
                    if(response[0].content.style && response[0].content.style.styleFile){
                      cssFile = response[0].content.style.styleFile.asset._ref;
                      cssFile = cssFile.replace('file-', '');
                      cssFile = cssFile.replace('-css', '');
                      cssFile = 'https://cdn.sanity.io/files/'+clientConfig.sanity.projectId+'/'+clientConfig.sanity.dataset+'/'+cssFile+'.css';
                  }
                  this.setState({
                      CampData: response[0],
                      cssFile: cssFile
                  });
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
              }
              else{
                if(response[0].content.style && response[0].content.style.styleFile){
                  cssFile = response[0].content.style.styleFile.asset._ref;
                  cssFile = cssFile.replace('file-', '');
                  cssFile = cssFile.replace('-css', '');
                  cssFile = 'https://cdn.sanity.io/files/'+clientConfig.sanity.projectId+'/'+clientConfig.sanity.dataset+'/'+cssFile+'.css';
              }
              this.setState({
                  CampData: response[0],
                  cssFile: cssFile
              });

              }
            }
            else
            {
              if(response[0].content.style && response[0].content.style.styleFile){
                cssFile = response[0].content.style.styleFile.asset._ref;
                cssFile = cssFile.replace('file-', '');
                cssFile = cssFile.replace('-css', '');
                cssFile = 'https://cdn.sanity.io/files/'+clientConfig.sanity.projectId+'/'+clientConfig.sanity.dataset+'/'+cssFile+'.css';
            }
            this.setState({
                CampData: response[0],
                cssFile: cssFile
            });
            }
          }).catch(error => {
            //console.log('problem found', error)
          })
    }
    renderPreview() {
        if (this.state.CampData) {
            return (
            <>
                <Helmet>
                {this.state.cssFile && (
                    <link rel="stylesheet" href={this.state.cssFile} />
                )}
                </Helmet>
            <Campaign {...this.state.CampData} />
            </>
            );
        }else{
          setTimeout(() => {
            if(!this.state.CampData){
              window.location.href = clientConfig.sanity.studioUrl+'desk?preview='+this.props.campaingId;
            }
          }, 5000);
        }
    }
    render () {
      return (
        <div>
          {this.renderPreview()}
        </div>
      )
    }
  }
const PreviewPage = (props) => {
  console.log(props);
  let campaingId = props.location.search;
  campaingId = campaingId.substring(1);
  return (
      <PreviewDoc campaingId={campaingId} />
  );
};

export default PreviewPage;
