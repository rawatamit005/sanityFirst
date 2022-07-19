// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// document schemas
import siteSettings from "./documents/siteSettings";
import author from "./documents/author";
import campaign from "./documents/campaign";
import productCarousel from "./documents/productCarousel";
import productList from "./documents/productList";
import banner from "./documents/banner";
import imageBanner from "./documents/imageBanner";
import imageCarousel from "./documents/imageCarousel";
import country from "./documents/country";
import brand from "./documents/brand";
import campaignTab from "./documents/campaignTab";
import basicComponent from "./documents/basicComponent";
import socialChannel from "./documents/socialChannel";
import customLink from "./documents/customLink";
import productItem from "./documents/productItem";
import campaignProductItem from "./documents/campaignProductItem";
import product from "./documents/product";
import retailers from "./documents/retailer";
import countryCount from "./documents/countryCount";
import smartProduct from "./documents/smartProduct";
import campaignStyle from "./documents/campaignStyle";
import localeString from "./documents/localeString";
import translations from "./documents/translations";
import languages from "./documents/languages";
import locale from "./documents/locale";
import textComponent from "./documents/textComponent";
import videoComponent from "./documents/videoComponent";
// Object types
import header from "./objects/header";
import footer from "./objects/footer";
import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";
import excerptPortableText from "./objects/excerptPortableText";
import mainImage from "./objects/mainImage";
import figure from "./objects/figure";
import authorReference from "./objects/authorReference";
import socialLink from "./objects/socialLink";
import productReference from "./objects/productReference";
import textEditor from "./objects/textEditor";
import figureOverride from "./objects/figureOverride";
import cta from "./objects/cta";
// import countryObject from "./objects/countryObject";
// import brandObject from "./objects/brandObject";
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    campaign,
    header,
    footer,
    banner,
    basicComponent,
    imageBanner,
    imageCarousel,
    productCarousel,
    productList,
    socialChannel,
    author,
    mainImage,
    figure,
    authorReference,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,
    country,
    brand,
    socialLink,
    productReference,
    campaignTab,
    textEditor,
    customLink,
    product,
    productItem,
    campaignProductItem,
    retailers,
    countryCount,
    smartProduct,
    campaignStyle,
    localeString,
    translations,
     languages,
     figureOverride,
     locale,
    textComponent,
     videoComponent,
     cta
  //  countryObject,
   // brandObject
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
});
