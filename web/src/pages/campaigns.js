import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes} from "../lib/helpers";
import GraphQLErrorList from "../components/graphql-error-list";
import * as styles from "./campaign.module.css";
import { getCampaignUrl } from "../lib/helpers";

export const query = graphql`
  query IndexPageQuery {
    campaigns: allSanityCampaign(
      sort: { fields: [_createdAt], order: DESC }
      filter: { _createdAt: { ne: null } ,content: {publishedAt: {ne: null}}}
    ) {
      edges {
        node {
          id
          _createdAt
          content {
            title
            publishedAt
            slug {
              current
            }
            country{
              countryCode
            }
            locale
            {
              languageCode
              localeName
            }
            brand {
              brandName
            }
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  
  const { data, errors } = props;
  if (errors) {
    return (
        <GraphQLErrorList errors={errors} />
    );
  }
  const campaignNodes = (data || {}).campaigns ? mapEdgesToNodes(data.campaigns) : [];
  return (
    <>
      <h1 hidden>Welcome</h1>
      <div className={styles.previewList}>
        <h2 className={styles.headline}>Latest Campaigns</h2>
        <ul className={styles.grid}>
          {campaignNodes &&
            campaignNodes.map((node) => (
              <li key={node.id}>
                <i className="copy_icon"></i>
                <a href={getCampaignUrl(node.content, node.content.slug.current)} target="_blank">
                  {node.content.title} <span>({node.content.brand.brandName} | {node.content.country.countryCode})</span>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default IndexPage;
