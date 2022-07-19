/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import styles from "./IframePreview.module.css";

/**
 * Explore more examples of previews:
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */

const assemblePostUrl = ({ displayed, options }) => {
  console.log('displayed 1', options);
  const { slug, publishedAt } = displayed.content;
  const campId = displayed._id;
  const { previewURL } = options;
  if (!slug || !previewURL) {
    console.warn("Missing slug or previewURL", { slug, previewURL });
    return "";
  }
  //const path = `/${dateSegment}/${slug.current}/`;
 // return `${previewURL}/blog${path}`;
  return `${previewURL}smc/preview/?${campId}`;
};

const IframePreview = (props) => {
  console.log(props);
  const { options } = props;
  const { displayed } = props.document;

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    );
  }

  const url = assemblePostUrl({ displayed, options });

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    );
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <div className={styles.LinkClass}>
            <a href={url} target="_blank">Open in New Window</a>
        </div>
        <iframe src={url} frameBorder={"0"} />
      </div>
    </div>
  );
};

IframePreview.propTypes = {
  document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

IframePreview.defaultProps = {
  document: null,
};

export default IframePreview;
