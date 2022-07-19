export default function resolveProductionUrl(document) {
    //console.log('preview document123', document);
    return `https://cw-shoppable-studio.netlify.app/preview?${document._id}`
}