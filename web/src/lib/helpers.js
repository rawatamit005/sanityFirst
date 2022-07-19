import { format, isFuture } from "date-fns";
import urlBuilder from "@sanity/image-url";
import { withPrefix } from "gatsby";

const clientConfig = require("../../config/client-config");

export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map((edge) => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture(node ) {
  //return !isFuture(publishedAt);
  return  !isFuture(node.content.publishedAt);
 
}

export function getCampaignUrl(content, slug) {
  //return `/campaign/${format(new Date(publishedAt), "yyyy/MM")}/${
    var brand = content.brand.brandName ? content.brand.brandName.toLowerCase() : 'sample';
    var locale = content.locale.languageCode ? content.locale.languageCode : 'en';
    var country = content.country.countryCode ? content.country.countryCode : 'uk';
    /*if(country.toLowerCase() == 'in' || country.toLowerCase() == 'id'){
      var finalUrl =  `/${ slug.current || slug }.html`;
    }else{
      var finalUrl =  `/${country}/${locale}/${ slug.current || slug }.html`;
    }*/
    if(brand == 'knorr' || brand == 'tresemme'){
      var finalUrl =  `/${country}/${locale}/${ slug.current || slug }.html`;
    }else if(brand == 'dove' || brand == 'walls')
    {
      var finalUrl =  `/${country}/${ slug.current || slug }.html`;
      
    }else{
      var finalUrl =  `/${ slug.current || slug }.html`;
    }
    return withPrefix(finalUrl.toLowerCase());
}

export function urlFor(source = { asset: {} }) {
  const url = urlBuilder({projectId : clientConfig.sanity.projectId, dataset: clientConfig.sanity.dataset, }).image(source);
  return url;
}


export function toPlainText(blocks) {
  if (!blocks) {
    return "";
  }
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
}
