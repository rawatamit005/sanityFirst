import S from "@sanity/desk-tool/structure-builder"
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import client from 'part:@sanity/base/client'
//import { MdPages } from "react-icons/md"
import { FiSettings } from "react-icons/fi"
import { IoLanguage } from "react-icons/io5"
import { GrTransaction } from "react-icons/gr"
import { MdLanguage } from "react-icons/md"
import IframePreview from "../previews/IframePreview"
import {
  GrDocumentText as FieldIcon,
  GrMultiple as DocumentIcon,
  GrTextAlignLeft as PostIcon,
  GrUser as AuthorIcon,
  GrArticle as ArticleIcon
} from 'react-icons/gr'

//import SeoPreview from '../previews/seo/SeoPreviews'
const configSetting = require("../../../config");
const remoteURL = process.env.SANITY_STUDIO_WEB_URL;
const localURL = "http://localhost:8000/";
const previewURL = window.location.hostname === "localhost" ? localURL : remoteURL;

  var previewCampaing = window.location.search.split('preview=');
  if(previewCampaing[1]){
    window.location.href = previewURL+'preview/?'+previewCampaing[1];
  }

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */

  const { schemaType } = props;
  if (schemaType == "campaign") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(IframePreview)
        .title("Web preview")
        .options({ previewURL }),
      /*S.view
        .component(SeoPreview)
        .options({previewURL})
        .icon(EyeIcon)
        .title('SEO Preview'),
        S.view
          .component(ColorblindPreview)
          .options({previewURL})
          .icon(EyeIcon)
          .title('Colorblind'),
        S.view
          .component(TextToSpeechPreview)
          .options({fields: ['title', 'excerpt', 'body']})
          .icon(MdAccessibility)
          .title('Text to speech'),*/
    ]);
  }
  return S.document().views([S.view.form()]);
};

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */
console.log('env veriables==SANITY_SAMPLE_CSS_NEW', process.env.SANITY_SAMPLE_CSS_NEW);
 console.log('env veriables==SANITY_STUDIO_PROJECT_ID', process.env.SANITY_STUDIO_PROJECT_ID);
console.log('env veriables==SANITY_STUDIO_BRAND_SAMPLE_CSS', process.env.SANITY_STUDIO_BRAND_SAMPLE_CSS);
console.log('env veriables==BASIC_CODE', process.env.BASIC_CODE);
console.log('env veriables==NETLIFY_AUTH_TOKEN', process.env.NETLIFY_AUTH_TOKEN);
console.log('env veriables==SANITY_AUTH_TOKEN', process.env.SANITY_AUTH_TOKEN);

export default () =>
//S.documentTypeList("campaign").title("CAMPAIGNS");
/* POC for listing campaign within brand
  S.list()
.title('Content')
.items([
  S.listItem()
    .title('Campaign')
    .icon(DocumentIcon)
    //.child(
    //  S.documentTypeList("campaign").title("CAMPAIGNS")
    //),
    .child(() => {
      const type = 'campaign'
      return client.fetch('* [_type == $type] {_id, _type, content}', {
        type
      })
        .then(docs => {
          // Create a map of years
          var brands = {}
          docs.forEach(d => {
            const brand = d.content.brand.brandName
            if (!brands[brand]) { brands[brand] = [] }
            brands[brand].push(d._id)
          })
          return S.list()
            .title('Campaign by Brand')
            .id('brand')
            .items(
              Object.keys(brands).map(brand => {
                return S.listItem()
                  .id(brand)
                  .title(brand)
                  .child(
                    S.documentList()
                      .id(type)
                      .title(`Campaign of ${brand}`)
                      .filter(`_id in $ids`)
                      .params({ ids: brands[brand] })
                  )
              }
              )
            )
        })
    }),
S.listItem()
    .title('Setting')
    .icon(FiSettings)
    .child(
      S.list()
        .id('setting')
        .title('GLOBAL SETTING')
        .items(
          [
            S.documentTypeListItem('translations')
              .icon(IoLanguage),
          ]
        )
    ),
])
*/
  
S.list()
.title('Content')
.items([
  S.listItem()
    .title('Campaign')
    .icon(DocumentIcon)
    .child(
      S.documentTypeList("campaign").title("CAMPAIGNS")
    ),
S.listItem()
    .title('Setting')
    .icon(FiSettings)
    .child(
      S.list()
        .id('setting')
        .title('GLOBAL SETTING')
        .items(
          [
            S.documentTypeListItem('translations')
              .icon(IoLanguage),
          ]
        )
    ),
])


