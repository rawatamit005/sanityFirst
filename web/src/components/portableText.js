import React from "react";
import clientConfig from "../../config/client-config";
import BasePortableText from "@sanity/block-content-to-react";
import serializers from "./serializers";

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializers}
    {...clientConfig.sanity}
  />
);

export default PortableText;
