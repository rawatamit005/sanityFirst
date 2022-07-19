// The languages you want to support.
// They need 'id' and 'title'

export const languages = [
  { id: 'en', title: 'English (UK)' ,  isDefault: true},
  { id: 'no', title: 'Norwegian' },
  { id: 'es', title: 'Spanish' },
  { id: 'fr', title: 'French' },
  { id: 'nl', title: 'Dutch' },
  { id: 'it', title: 'Italian' },
  { id: 'tr', title: 'Turkish' },
  { id: 'de', title: 'German' },
  { id: 'pt', title: 'portuguese' },
  { id: 'th', title: 'Thailand' },
  { id: 'id', title: 'Indonesian' },
  { id: 'ru', title: 'Russian' },
  { id: 'ar', title: 'Arabic' },
  { id: 'el', title: 'Greek' },
  { id: 'fi', title: 'Finnish' }
  
];
// console.log(languages);
 export const baseLanguage =languages.find(l => l.isDefault)


// const sanityClient = require('@sanity/client');
// const configSetting = require("../../config");
// const client = sanityClient
// (
//   {
//     projectId: '8gjfptsf',
//     dataset:  process.env.SANITY_STUDIO_API_DATASET || configSetting.sanity.dataset,
//     token:configSetting.sanity.token,
//     apiVersion: '2021-03-25', 
//     useCdn: false
//   }
// )

// const   getAllLanguage = () => {
 
//  return  client.fetch(
//     `*[_type == "languages"]`
//   ).then (a=> a);

  
// }


// const myRandomArray=getAllLanguage().then(a=>a);

// export { myRandomArray}


// export const languagefetch = client.fetch(
//        `*[_type == "languages"]`
//     ).then (a=> a);

//  export const abcs= async function () { let data=await languagefetch;
//   console.log(data);
//  return data }()

   
// export const getlanguage = async () => {
//    const avalue = await languagefetch;
//   console.log(avalue);
 
//   return avalue;
// };
// getlanguage();


