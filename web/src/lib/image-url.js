import clientConfig from "../../config/client-config";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(clientConfig.sanity);

export const urlFor = source => {
  return builder.image(source);
};
