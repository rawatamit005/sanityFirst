//Digital Data Event
var arr = [];
var currentScrollDepth = '';
var contextualizationData = {};
var ctConstants = {};
var digitalData = {};
var firstScrollDepth=0,secondScrollDepth=0,thirdScrollDepth=0,fourthScrollDepth=0;
var scrollDepth=[];
var depth;
var  campaign_local;
var  GA_ID ;
var  adobe_Report_Suit_ID;
var brand_Url;
var cw_campaign_selector
var campaign_country;
var campaign_brand;
var currentSectionObj;
var currentProductObj;
var compName ,compVar,compPos,serviceProvideName,compExpVar;
var channelVal;
channelVal="Shoppable Campaign";
digitalData.siteInfo={channel:"",sitetype:""},
digitalData.page={pageInfo:{destinationURL:""},
category:{pageType:""}},
digitalData.video=[];
digitalData.campaign=[];
digitalData.product=[];
digitalData.privacy={accessCategories:[{domains:[]}]},
digitalData.component=[];
digitalData.trackingInfo={GID:"",un:"",tool:[{ids:""}]},
digitalData.promotion=[];
// digitalData={siteInfo:{channel:"",sitetype:""},page:{pageInfo:{destinationURL:""},category:{pageType:""}},video:[],campaign:[],product:[],privacy:{accessCategories:[{domains:[]}]},component:[],trackingInfo:{GID:"",un:"",tool:[{ids:""}]},promotion:[]};
var contextualizationData={areaInfo:{weather:"",temperature:"",aqi:"",uv:"",uv_range:"",aqi_range:""},profileData:{crmid:"",age:""}};
 var windowLocation = window.location.pathname.split("/");
 var lastwindowLocation=windowLocation[windowLocation.length-1];

digitalData.areaInfo=contextualizationData.areaInfo,
digitalData.page.category.primaryCategory=channelVal,
digitalData.trackingInfo={},
digitalData.trackingInfo.tool=[{}],
digitalData.privacy={},
// digitalData.page.attributes={},
digitalData.page.dmpattributes={},
digitalData.privacy.accessCategories=[{}],
digitalData.privacy.accessCategories[0].domains=[],
digitalData.event=[],
digitalData.sitespeed={},
digitalData.page.entity={},

digitalData.platform=[] ;

digitalData.trackingInfo.tool[1]  = {};
digitalData.product= [];
digitalData.trackingInfo.GID= "D259f49db56EUK0ba77884a2a1c46cPD" ;
digitalData.siteInfo={ channel:channelVal, internalDomain:document.location.host, sitetype: "Cartwire Shoppable Media" };


if (typeof digitalData.event == 'undefined') {
    digitalData.event = [];
}
digitalData.trackEvent = function (e) {
    var eventDetails = (typeof e !== 'undefined' && e.eventInfo !== 'undefined') ? e.eventInfo : '';
    if (eventDetails) {
        var eventType = typeof eventDetails.type !== 'undefined' ? eventDetails.type : '';
        var eventAction = typeof eventDetails.eventAction !== 'undefined' ? eventDetails.eventAction : '';
        var eventName = eventType + (eventAction ? '_' + eventAction : '');
        eventName = eventName.toLowerCase().replace(/ /g, '_');

        eventProducts = (typeof digitalData.product !== 'undefined') ? digitalData.product : [];
        eventComponent = (typeof digitalData.component !== 'undefined') ? digitalData.component : [];
        eventPromotions = (typeof digitalData.promotion !== 'undefined') ? digitalData.promotion : [];
        e.product = eventProducts;
        e.component = eventComponent;
        e.promotions = eventPromotions;
        digitalData.eventList[eventName] = e;
        //alert("Event Name is =" + eventName);
        //console.log('***custome event - '+eventName, e);
        //console.log("ctConstants",ctConstants.trackEvent);
        var launchEvent = document.createEvent("CustomEvent");
        launchEvent.initCustomEvent("launch_event", true, true, {
            'eventName': eventName,
            'payload': e,
            'eventProducts': eventProducts,
            'eventPromotions': eventPromotions,
            'eventComponent': eventComponent
        });
        document.body.dispatchEvent(launchEvent);
       
    }
}
while (e = digitalData.event.shift()) {
    digitalData.trackEvent(e);
}
digitalData.event = {
    push: digitalData.trackEvent
};

digitalData.product = [];



//End Digital Data Event
$(document).ready(function () {
  
    // $.ajax({
        
    //     url: window.location.origin + '/analytics-country-config.json',
    //     type: "GET",
    //     success: function(data) {
           
    //         console.log(data.country.Canada);
            
            
    //     }
    // });
    cw_campaign_selector = document.getElementsByClassName("cw_campaign_selector");
    campaign_local = cw_campaign_selector[0].getAttribute("data-locale");
    GA_ID = cw_campaign_selector[0].getAttribute("data-gaid");
    adobe_Report_Suit_ID=cw_campaign_selector[0].getAttribute("data-report-suite-id");
    brand_Url=cw_campaign_selector[0].getAttribute("data-root-url");
    campaign_country=cw_campaign_selector[0].getAttribute("data-country");
    campaign_brand=cw_campaign_selector[0].getAttribute("data-brand");
    var launchblock = document.createElement('script');
    
    if(campaign_country=="Canada")
    {
        launchblock.src = "https://assets.adobedtm.com/e6bd1902389a/8de9a6a4bf99/launch-3783f09538ac.min.js";
    }
    else{
        //launchblock.src = "https://assets.adobedtm.com/launch-ENfabe4aff7fd348db959a23445bf6f6da.js";
        launchblock.src = "https://assets.adobedtm.com/e6bd1902389a/6822f3c2c72d/launch-9188e80e7b7b.min.js";
    }
   
    launchblock.async = "async";
    launchblock.id = "launch";
    launchblock.type = "text/javascript";
    setTimeout(function () { 
        document.getElementsByTagName("head")[0].appendChild(launchblock);
    }, 2000);
    $('.campaign-component').each(function(i){
        $(this).attr('data-component-positions', i+1);
    });

digitalData.trackingInfo.tool[0]  = {id: GA_ID };
digitalData.page= { pageInfo: { destinationURL: brand_Url,pageName:lastwindowLocation }, category: { pageType: "Landing page",primaryCategory:channelVal } };
digitalData.page.attributes=
{
    brandCategory:"",
    contentType:"Cartwire Shoppable landing page",
    country:campaign_country,
    globalBrand:campaign_brand,
    lazyLoad:{},
    localBrand :campaign_brand
};

(function (d, u) {
    var isProdEnv = "true";
    "true" != isProdEnv
        ? ((u = ("https:" == document.location.protocol ? "https://" : "http://") + "wa-uat.unileversolutions.com"),
            (digitalData.trackingInfo.GID = "D259f49db56EUK0ba77884a2a1c46cPD"),
            (digitalData.trackingInfo.tool[0].id = "UA-40462445-1"))
        : ((u = ("https:" == document.location.protocol ? "https://" : "http://") + "wa-eu.unileversolutions.com"),
            (digitalData.trackingInfo.GID = "D259f49db56EUK0ba77884a2a1c46cPD"),
            (digitalData.trackingInfo.tool[0].id = GA_ID),
            (digitalData.trackingInfo.tool[1].id = adobe_Report_Suit_ID)),
        (digitalData.privacy.accessCategories[0].domains[0] = brand_Url);
})(document);
    const selectorClass='.product_list_section';
    const sectionSelectors=document.querySelectorAll(selectorClass);
    const bannerClass='.banner_list_section';
    const bannerSectionSelectors=document.querySelectorAll(bannerClass);
   const footerClass='.cw_footer';
   const footerSelectors=document.querySelectorAll(footerClass);
    const textComponentClass=".cw_text_component";
    const textComponentSelectors=document.querySelectorAll(textComponentClass);
   //footer
   textComponentSelectors.forEach(function(textComponentSelector)
   {
    textComponentSelector.addEventListener('click',function(event)
   {
       currentSectionObj=textComponentSelector;
       
     
      if($(event.target).hasClass("cw_text_component_ctabutton"))
      {    
          currentProductObj= event.target;
          console.log(currentProductObj.getAttribute("data-href"));
        
          cwDigitalData("", "calltoaction", arr) 
      }
    })
});
     //footer
     footerSelectors.forEach(function(footerSelector)
    {
        footerSelector.addEventListener('click',function(event)
    {
        currentSectionObj=footerSelector;
        
        if($(event.target).hasClass("social_button"))
       {    
           currentProductObj= event.target;
           cwDigitalData("", "clickstosocialplatforms", arr) 
       }
       if(event.target.className === 'footerLink')
       {    
           currentProductObj= event.target;
           cwDigitalData("", "externalLink", arr) 
       }
    })
    });

      //ProductSlider
    sectionSelectors.forEach(function(sectionSelector)
    {
    sectionSelector.addEventListener('click',function(event)
    {
        currentSectionObj=sectionSelector;
        
        if(event.target.className === 'cw_btn_buynow')
       {    
           currentProductObj= event.target;
        
       }
    if(event.target.className === 'react-multiple-carousel__arrow react-multiple-carousel__arrow--left')
    {     

      
        cwDigitalData("", "image_left_scroll_click", arr) 
    }
    if(event.target.className === 'react-multiple-carousel__arrow react-multiple-carousel__arrow--right')
    {   
      
        cwDigitalData("", "image_right_scroll_click", arr) 
    }
    if(event.target.className === 'cw_btn_load')
    {     
    
        cwDigitalData("", "load_more_click", arr) 
    }
    })
    });

   // BannerSlider
    bannerSectionSelectors.forEach(function(bannerSectionSelector)
    {
    bannerSectionSelector.addEventListener('click',function(event)
    { currentSectionObj=bannerSectionSelector;
    
    if(event.target.className === 'control-arrow control-next')
    { 
     cwDigitalData("", "image_right_scroll_click", arr) 
    
    }
   if(event.target.className === 'control-arrow control-prev')
    { 
        cwDigitalData("", "image_left_scroll_click", arr) 
    }
  
    })
    });


}).scroll(function () {

        var e = $(document).height() - $(window).height(),
        a = Math.floor(0.25 * e),
        n = Math.floor(0.5 * e),
        o = Math.floor(0.75 * e),
        c = Math.round($(window).scrollTop());
        
    
        a <= c && c < n && 0 === firstScrollDepth ? ((firstScrollDepth=1), (depth = "25")) : n <= c && c < o && 0 === secondScrollDepth ? ((secondScrollDepth=1), (depth = "50")) : o <= c && c < e && 0 === thirdScrollDepth ? ((thirdScrollDepth=1), (depth = "75")) : c === e && 0 === fourthScrollDepth && ((fourthScrollDepth=1), (depth = "100")),
        depth && !scrollDepth.includes(depth) &&
       (scrollDepth.push(depth) ,
        (arr = { "scrollDepth": depth }),
       ( cwDigitalData("", "page_scroll", arr)));
   
});
trackProductInfo=function(productData)
{
    var $this = $(currentSectionObj);       
 digitalData.product.push(
             {
                 'productInfo': {
                     'productID': productData.productID,
                     'productName':productData.productName,
                     'price': "",
                     'brand': productData.brand,
                     'quantity': productData.quantity,
                     
                 },
                 'attributes': {
                     'productPosition': parseInt(currentProductObj.getAttribute('data-index')),
                     'productAward': "",
                     'productFindingMethod':  $this.data('componentname'),
                     'productBrand':productData.brand,
                 },
                 'category': { 'primaryCategory':campaign_brand },
             });
              
}

trackComponentInfo = function ()
{
    var $this = $(currentSectionObj);
    compName = $this.data('componentname'),
    compVar = $this.data('component-variants'),
    compPos = $this.data('component-positions'),
    serviceProvideName = $this.data('service-provider'),
    compExpVar = $this.data('component-experience-variant');
    digitalData.component = [];
    digitalData.component.push({
        'componentInfo': {
            'componentID': compName,
            'name': compName,
            'experienceVariant': (compExpVar) ? compExpVar : 'default'
        },
        'attributes': {
            'brandOptin' :'',
            'position': compPos,
            'componentVariant': compVar,
            'reviewVendorName': (serviceProvideName) ? serviceProvideName : '',
            'promoCreative': '',
            'promoID':  '',
            'promoName': '',
            'promoPosition': compPos,
            'campaignWorkflow':  '',
            'toolName':  '',
            'surveyQuesAns': ''
        }
    });

}
function cwDigitalData(t, e, p) 
{
    digitalData.component = [];
    digitalData.eventList = [];
    digitalData.product = [];

    if (typeof digitalData.event == 'undefined') {
        digitalData.event = [];
    }
    digitalData.trackEvent = function (e) {
        var eventDetails = (typeof e !== 'undefined' && e.eventInfo !== 'undefined') ? e.eventInfo : '';
        if (eventDetails) {
            var eventType = typeof eventDetails.type !== 'undefined' ? eventDetails.type : '';
            var eventAction = typeof eventDetails.eventAction !== 'undefined' ? eventDetails.eventAction : '';
            var eventName = eventType + (eventAction ? '_' + eventAction : '');
            eventName = eventName.toLowerCase().replace(/ /g, '_');

            eventProducts = (typeof digitalData.product !== 'undefined') ? digitalData.product : [];
            eventComponent = (typeof digitalData.component !== 'undefined') ? digitalData.component : [];
            eventPromotions = (typeof digitalData.promotion !== 'undefined') ? digitalData.promotion : [];
            e.product = eventProducts;
            e.component = eventComponent;
            e.promotions = eventPromotions;
            digitalData.eventList[eventName] = e;
            var launchEvent = document.createEvent("CustomEvent");
            launchEvent.initCustomEvent("launch_event", true, true, {
                'eventName': eventName,
                'payload': e,
                'eventProducts': eventProducts,
                'eventPromotions': eventPromotions,
                'eventComponent': eventComponent
            });
            document.body.dispatchEvent(launchEvent);
        }
    }

    switch (e) {

        case "youtube_video_progress":
            trackComponentInfo();
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.videoProgress,
                'eventLabel': p.video_source + ' - ' + p.video_title + ' - ' + p.video_id + ' - ' + 'progressed ' + p.video_progress,
                'eventValue': 1
            };
            ev.attributes = { 'nonInteractive': { 'nonInteraction': 1 } };
            ev.category = { 'primaryCategory': ctConstants.engagement };
            ev.subcategory = 'Read';
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        
        case "youtube_video_state_change":
            trackComponentInfo();
            var ev = {}, eventAction;
            if (p.video_state === 'play') {
                eventAction = ctConstants.videoPlays;
            } else if (p.video_state === 'finish') {
                eventAction = ctConstants.videoCompletes;
            }
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': eventAction,
                'eventLabel': p.video_source + ' - ' + p.video_title + ' - ' + p.video_id,
                'eventValue': 1
            };
            ev.attributes = { 'nonInteractive': { 'nonInteraction': 1 } };
            ev.category = { 'primaryCategory': ctConstants.engagement };
            ev.subcategory = 'Interest';
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
       
        case "product_click":
            trackComponentInfo();
            digitalData.product.push(
                {
                    'productInfo': {
                        'productID': p.productID,
                        'productName': p.productName,
                        'price': "",
                        'brand': p.brand,
                        'quantity': "1"
                    },
                    'attributes': {
                        'productPosition': "",
                        'productAward': "",
                        'productFindingMethod': "",
                        'productBrand':"",
                    },
                    'category': { 'primaryCategory':"" },
                });
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.productclick,
                'eventLabel': "Online-" + p.productName,// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);
            // while (e = digitalData.event.shift()) {
            digitalData.trackEvent(e);
            //}
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;

        case "carousel_click":
            trackComponentInfo();
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.carouselClick,
                'eventLabel': "Online-CarouselClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            // while (e = digitalData.event.shift()) {
            digitalData.trackEvent(e);
            //}
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;


        case "image_right_scroll_click":
            trackComponentInfo();
            var ev = {};
        
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.imagerightscrollclick,
                'eventLabel': "Online-ImageRightScrollClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "image_left_scroll_click":
           trackComponentInfo();
            var ev = {};
           
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.imageleftscrollclick,
                'eventLabel': "Online-ImageLeftScrollClick",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
        
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "page_scroll":

            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.pageScroll,
                'eventLabel': "Scroll Depth - " + p.scrollDepth + '%',// eLabel,
                'eventValue': 1,
            };
            ev.attributes = {
                'nonInteractive': {
                    'nonInteraction': 1
                }
            };
            ev.category = { 'primaryCategory': ctConstants.custom }
            ev.subcategory = "";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };
           //console.log(ev);
            break;
        case "anchor_click":
            trackComponentInfo();
            var ev = {};
        
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.anchorLinkClicked,
                'eventLabel': "Online-AnchorLinkClicked",// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.engagement }
            ev.subcategory = "Interest";
            digitalData.event.push(ev);
            digitalData.trackEvent(e);
            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
            case "load_more_click":
                trackComponentInfo();
                var ev = {};
              
                ev.eventInfo = {
                    'type': ctConstants.trackEvent,
                    'eventAction': ctConstants.loadMore,
                    'eventLabel': "Online-LoadMoreClicked",// eLabel,
                    'eventValue': 1,
                };
                ev.category = { 'primaryCategory': ctConstants.engagement }
                ev.subcategory = "Interest";
                digitalData.event.push(ev);
              
                digitalData.trackEvent(e);
                digitalData.event = {
                    push: digitalData.trackEvent
                };
    
                break;
        case "shop_now":
            trackComponentInfo();
            trackProductInfo(p)
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.purchase,
                'eventLabel': "Online-" + p.productName,// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);

            digitalData.trackEvent(e);

            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
        case "retailer_click":
            trackComponentInfo();
            digitalData.product.push(
                {
                    'productInfo': {
                        'productID': p.productID,
                        'productName': p.productName,
                        'price': p.price,
                        'brand': p.brand,
                        'quantity': p.quantity,
                        'sku':p.productID
                    },
                    'category': { 'primaryCategory': p.category },
                    'attributes': { 'productVariants':p.sku, 'country': "", 'productRetailer':p.retailerName, 'listPosition': compPos==undefined? '':compPos, 'integration': serviceProvideName==undefined? '':serviceProvideName },
                });
            var ev = {};
            ev.eventInfo = {
                'type': ctConstants.trackEvent,
                'eventAction': ctConstants.retailerClick,
                'eventLabel': "Online - " + p.productName + " | " + p.retailerName,// eLabel,
                'eventValue': 1,
            };
            ev.category = { 'primaryCategory': ctConstants.conversion }
            ev.subcategory = "Lead";
            digitalData.event.push(ev);

            digitalData.trackEvent(e);

            digitalData.event = {
                push: digitalData.trackEvent
            };

            break;
            case "clickstosocialplatforms":
                trackComponentInfo();
                var ev = {};
                ev.eventInfo = { 
                    'type': ctConstants.trackEvent, 
                    'eventAction': ctConstants.clickstosocialplatforms, 
                    'eventLabel': currentProductObj.getAttribute('href'), 
                    'eventValue': 1 
                };
                ev.category = { 'primaryCategory': ctConstants.advocacy },
                ev.subcategory = "Lead";
                digitalData.event.push(ev);

                digitalData.trackEvent(e);

                digitalData.event = {
                push: digitalData.trackEvent
               };

                break;
                case "externalLink":

                    trackComponentInfo();
                  
                    var ev = {};
                    ev.eventInfo = { 
                        'type': ctConstants.trackEvent, 
                        'eventAction': ctConstants.ExternalLink, 
                        'eventLabel': compName + " - " + currentProductObj.getAttribute('title') + " - " + currentProductObj.getAttribute('href'), 
                        'eventValue': 1 
                    };
                    ev.category = { 'primaryCategory': ctConstants.custom },
                    ev.subcategory = "Others";
                    digitalData.event.push(ev);
    
                    digitalData.trackEvent(e);
    
                    digitalData.event = {
                    push: digitalData.trackEvent
                   };
                   break;
                   case "calltoaction":

                    trackComponentInfo();
                  
                    var ev = {};
                    ev.eventInfo = { 
                        'type': ctConstants.trackEvent, 
                        'eventAction': ctConstants.calltoaction, 
                        'eventLabel': compName + " - " + currentProductObj.getAttribute('title') + " - " + currentProductObj.getAttribute('data-href'), 
                        'eventValue': 1 
                    };
                    ev.category = { 'primaryCategory': ctConstants.custom },
                    ev.subcategory = "Read";
                    digitalData.event.push(ev);
    
                    digitalData.trackEvent(e);
    
                    digitalData.event = {
                    push: digitalData.trackEvent
                   };
                   break;
    }
}

