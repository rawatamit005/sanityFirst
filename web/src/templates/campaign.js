import React from "react";
import { graphql } from "gatsby";
import Campaign from "../components/campaign";
import PageHelmet from "../components/PageHelmet";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { toPlainText } from "../lib/helpers";
import { GatsbyImage } from "gatsby-plugin-image";
export const query = graphql`
  query CampaignTemplateQuery($id: String!) {
    campaign: sanityCampaign(id: { eq: $id }) {
      id
      _id
      content{
        locale {
          languageCode
          localeName
        }
        rootUrl
        title
        gaID
        reportSuiteID
        publishedAt
        brand {
          brandName
          brandId
        }
        country {
          countryId
          countryName
          countryCode
         
        }
        bodyComponent {
          ... on SanitySocialChannel {
            socialChannel {
              
              channelName
              channelUrl
              channelIcon {
                alt
                asset {
                  url
                  metadata {
                    lqip
                  }
                }
              }
            }
            _type
          }
          ... on SanityVideoComponent {
            title
            videoId
            _type
          }
          ... on SanityImageCarousel {
            imageCarousel: bannerImages {
              alt
              asset {
                url
                metadata {
                  lqip
                }
              }
            }
            _type
            title
            autoSlide
          }
          ... on SanityImageBanner {
            bannerImages {
              alt
              asset {
                url
                metadata {
                  lqip
                }
              }
            }
            title
            _type
          }
          ... on SanityTextComponent {
            
            _type
            title
            headingLevel
            subtitle
            backgroundimage {
              asset {
                url
              }
              alt
            }
            ctas {
              ctalabel
              ctalink
              ctatype
            }
          
            _rawParagraph(resolveReferences: {maxDepth: 10})
          }
          ... on SanityProductCarousel {
            headingLevel
            heading
            widgetType
            displayPriceOnBIN
            hidePriceOfferInWidget
            product {
              productImage
              smartProductId
              title
              productCode
              overrideImage {
                alt
                asset {
                  url
                  metadata {
                    lqip
                  }
                }
              }
            }
            _type
            _rawIntroText(resolveReferences: {maxDepth: 10})
          }
          ... on SanityProductList {
            _type
            headingLevel
            heading
            widgetType
            columnView
            displayPriceOnBIN
            hidePriceOfferInWidget
            product {
              productCode
              smartProductId
              productImage
              title
              overrideImage {
                alt
                asset {
                  url
                  metadata {
                    lqip
                  }
                }
              }
            }
            _rawIntroText(resolveReferences: {maxDepth: 10})
          }
        }
        style {
          styleFile {
            asset {
              id
              url
            }
          }
          header {
            logoUrl
            clickLogo
            brandLogo {
              alt
              asset {
                url
                metadata {
                  lqip
                }
              }
            }
          }
          footer {
            tncURL
            tnc
            privacyNoticeUrl
            privacyNotice
            cookieNoticeUrl
            cookieNotice
            customLink {
              customLink
              customLinkUrl
            }
          }
        }
      }
    }
   campStyle: sanityCampaignStyle (campaign: {id: {eq: $id }}){
      campaign {
        _id
      }
      styleFile {
        asset {
          url
        }
      }
    }
    LocalisationList : allSanityTranslations {
      nodes {
        title {
          _type
          ar
          de
          el
          en
          es
          fi
          fr
          id
          it
          nl
          no
          pt
          ru
          th
          tr
        }
      }
    }
    campProdData: sanityCampaignProductItem(campaign: {id: {eq: $id }})
       {
        productItem
        {
          smartProduct
          {
            smartProductId
              product
          {
            table_header
            price_symbol
            brand_name
            widget_name
            title
            enable_custom_check
            retailer
            { prtId
              iframe_url
              is_available
              buy_now_url
              campaign_buy_now
              status
              category
              sub_category
              quantity
              price
              sku_code
              product_id
              retailer_id
              cw_offer
              cw_offer_desc
              retailer_name
              retailer_logo
              pav_name
              pav_id
              widget_single_class
              product_attribute_id
              variant_type
              stock_txt
              buy_now_text
            }
           
          }
          }
      }
        }
  }
`;
const CampaignTemplate = (props) => {
  //console.log('camp page data = ', props);
  const { data, errors } = props;
  
  
  const campaign = data && data.campaign;
  campaign['campProdData'] = data.campProdData;
  campaign['LocalisationList'] = data.LocalisationList;
  return (
    <>
    <PageHelmet campaign={campaign} />
      {campaign && (
        <SEO
        lang={campaign.content.locale.localeName || "en"}
          title={campaign.content.title || "Untitled"}
          description={toPlainText(campaign._rawExcerpt)}
        />
      )}
      
      {errors && ( <GraphQLErrorList errors={errors} />)}
      {campaign  && <Campaign {...campaign} />}
    </>
  );
};

export default CampaignTemplate;