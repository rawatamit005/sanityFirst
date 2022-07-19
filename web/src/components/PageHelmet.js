import React from 'react';
import favicon from '/src/images/favicon.ico';
import Helmet from 'react-helmet';
const brandConfig = require("../../config/brand-adchoice-config");

function PageHelmet(props) {
    var cachebuster = Math.round(new Date().getTime() / 1000);
    const googleAnalyticsURL = '/smc/googleAnalytics.js?q='+cachebuster;
    const faviconIcon = props.campaign.content.style.header ? (props.campaign.content.style.header.brandLogo ? props.campaign.content.style.header.brandLogo.asset.url : favicon) : favicon;
    var brandName = props.campaign.content.brand.brandName ? props.campaign.content.brand.brandName.toLowerCase() : '';
    var countryCode = props.campaign.content.country.countryCode ? props.campaign.content.country.countryCode.toLowerCase() : '';
    var localeCode = props.campaign.content.locale ? props.campaign.content.locale.languageCode : '';
    if(countryCode === "ca" || countryCode === "us"){
        var brandPid = "", brandOCid = "";
        if(brandConfig.adchoice[brandName]){
            if(brandConfig.adchoice[brandName][countryCode][localeCode]){
                brandPid = brandConfig.adchoice[brandName][countryCode][localeCode].pid;
                brandOCid = brandConfig.adchoice[brandName][countryCode][localeCode].ocid;
            }else{
                var brandLocale = Object.keys(brandConfig.adchoice[brandName][countryCode])[0];
                brandPid = brandConfig.adchoice[brandName][countryCode][brandLocale].pid;
                brandOCid = brandConfig.adchoice[brandName][countryCode][brandLocale].ocid;
            }
        }
        return (
            <Helmet>
                <link rel="icon" href={faviconIcon} />
                <script async data-ev-tag-pid={brandPid} data-ev-tag-ocid={brandOCid} type="text/javascript" src="https://c.evidon.com/pub/tag.js"></script>
                <script defer type="text/javascript" async="" data-ev-hover-pid={brandPid} data-ev-hover-ocid={brandOCid} src="https://c.betrad.com/geo/h1.js"></script>
                {props.campaign && props.campaign.content.gaID!=null &&
                    <script async type="text/javascript" src={googleAnalyticsURL}></script>
                }
                
                {props.campaign.content.style.styleFile && (
                    <link rel="stylesheet" href={props.campaign.content.style.styleFile.asset.url} />
                )}
                
            </Helmet>
        )   
    }else{
        return (
            <Helmet>
                <link rel="icon" href={faviconIcon} />
                <meta property="og:locale" content={props.campaign.content.locale.localeName} />

                {/* OneTrust Cookies Consent Notice
                <script async type="text/javascript" src="https://cdn.cookielaw.org/consent/85f62e3a-1550-41d3-b34a-06f23c84631d-test/OtAutoBlock.js"></script>
                <script async src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" data-document-language="true" type="text/javascript" charset="UTF-8" data-domain-script="85f62e3a-1550-41d3-b34a-06f23c84631d-test"></script> */}

                {props.campaign.content.brand.brandName && props.campaign.content.brand.brandName === 'Surf Excel' &&
                    <script type="text/javascript" charset="UTF-8" data-domain-script="64fd0a5d-2300-4040-abe5-cf8cb44ac7fb" data-document-language="true" src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" data-react-helmet="true"></script>
                }
                {/* OneTrust Cookies Consent Notice */}
                <link rel="preconnect" href="https://cdn.cookielaw.org"/>
                <script src='https://webcompliance.unileversolutions.com/gdpr/v1/cookiebanner.js?autoblock=false'></script>

                {props.campaign && props.campaign.content.gaID!=null &&
                    <script async type="text/javascript" src={googleAnalyticsURL}></script>
                }
                
                {props.campaign.content.style.styleFile && (
                    <link rel="stylesheet" href={props.campaign.content.style.styleFile.asset.url} />
                )}
            </Helmet>
        )
    }  
}

export default PageHelmet;
