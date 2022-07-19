import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function SEO({lang, title }) {
  const siteTitle = title || "";
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title === siteTitle ? "%s" : `%s | ${siteTitle}`}
      meta={[
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:type",
          content: "website",
        },
      ]}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default SEO;

