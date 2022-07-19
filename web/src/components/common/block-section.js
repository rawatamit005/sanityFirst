import React from "react"
import PortableText from '@sanity/block-content-to-react'
import { urlFor } from "../../lib/helpers"

const serializer = {
    types: {
        figure: props => (
        <figure>
            <picture
                classeName="bp-image__placeholder"
                style={{
                    paddingTop: `100%`,
                    background: `url(${urlFor(props.node)})`,
                    backgroundSize: 'cover',
                }}
            />
            <img src={urlFor(props.node)} alt={props.node.alt} width="210" height="210"/>
        </figure>),
        undefined : props => (<span></span>),
    },
    marks: {
        superscript: props => (<sup>{props.children}</sup>),
        subscript: props => (<sub>{props.children}</sub>)
    }
}

function blockContent(props) {
    var introText;
    if(props._rawIntroText){
        introText = props._rawIntroText;
    }else if(props.introText){
        introText = props.introText;
    }
  return (
      <div className="category_sub_title">
        {introText && <PortableText
            blocks={introText}
            serializers={serializer}
        />}
    </div>
  );
}

export default blockContent;
