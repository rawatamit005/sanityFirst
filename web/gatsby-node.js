const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");
/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require("path");

const fs = require("fs");

exports.onPostBuild = function () {
  fs.renameSync(path.join(__dirname, "public"), path.join(__dirname, "public-smc"));
  fs.mkdirSync(path.join(__dirname, "public"));
  fs.renameSync(path.join(__dirname, "public-smc"), path.join(__dirname, "public", "smc"));
  const filepath = 'public/index.html';
  const fileContent = '<!doctype html><html><body><h1 style="text-align: center; font-family: arial; color: #2276fc;">Welcome to CW Shoppable Media Campaign</h1></body></html>';
  fs.writeFile(filepath, fileContent, (error) => {
      if(error){
        //console.log('An error occured:', error);
      }else{
        //console.log('Your file is made.');
      }
  });

  
  fs.copyFile('static-data/nexxus-weightless.html', 'public/smc/nexxus-weightless.html', (err) => {
      if (err) 
          throw err;
      console.log('Static-data copied to build folder');
  });
};


async function createCampaignPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityCampaign(
        filter: { _createdAt: { ne: null } }
      ) {
        edges {
          node {
            id
            content {
              publishedAt
              country {
                countryCode
              }
              locale
              {
                localeName
                languageCode
              }
              brand {
                brandName
              }
              slug {
                current
              }
            }
          }
        }
      }
    }
  `);
  if (result.errors) throw result.errors;
  const postEdges = (result.data.allSanityCampaign || {}).edges || [];

  postEdges
  // .filter(edge => !isFuture(edge.node.content.publishedAt))

    .forEach((edge) => {
      const { id, content = {} } = edge.node;
      console.log('gatsby node data', content );
      var countruCode = content.country.countryCode ? content.country.countryCode.toLowerCase() : content.country.countryCode;
      var brandName = content.brand.brandName ? content.brand.brandName.toLowerCase() : content.brand.brandName;
      if(brandName == 'knorr' || brandName == 'tresemme'){
        var path = `/${content.country.countryCode}/${content.locale.languageCode}/${content.slug.current}.html`;
      }else if(brandName == 'dove' || brandName == 'walls'){
        var path = `/${content.country.countryCode}/${content.slug.current}.html`;
      } 
      else{
        var path = `/${content.slug.current}.html`;
      }
      
      
      path = path.toLowerCase();

      createPage({
        path,
        component: require.resolve("./src/templates/campaign.js"),
        context: { id },
      });
    });
}

exports.createPages = async ({ graphql, actions }) => {
  await createCampaignPages(graphql, actions);
};
