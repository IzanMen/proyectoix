import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}
