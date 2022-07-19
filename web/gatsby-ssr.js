/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react")
import { withPrefix } from "gatsby"


const headComponents = [];
const jqueryUrl = withPrefix('jquery-1.7.1.js');

headComponents.push(
  <script
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `if((window.location.href).includes('dove-rechargeable-target-test')){ var targetEnabled = true;(function(win, doc, style, timeout) { var STYLE_ID = 'at-body-style'; function getParent() { return doc.getElementsByTagName('head')[0]; } function addStyle(parent, id, def) { if (!parent) { return; } var style = doc.createElement('style'); style.id = id; style.innerHTML = def; parent.appendChild(style); } function removeStyle(parent, id) { if (!parent) { return; } var style = doc.getElementById(id); if (!style) { return; } parent.removeChild(style); } addStyle(getParent(), STYLE_ID, style); setTimeout(function() { removeStyle(getParent(), STYLE_ID); }, timeout); }(window, document, "body {opacity: 0 !important}", 3000)); var launchJs = document.createElement('script');launchJs.src = "https://assets.adobedtm.com/e6bd1902389a/8de9a6a4bf99/launch-3783f09538ac.min.js";launchJs.async = "async";launchJs.id = "launch";launchJs.type = "text/javascript";document.getElementsByTagName("head")[0].appendChild(launchJs);}
    `,
  }}
  />,
  <script src={jqueryUrl}></script>
);
export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents(headComponents)
}