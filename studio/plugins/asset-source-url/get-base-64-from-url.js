export async function getBase64ImageFromUrl(imageUrl) {
  var res;
  await fetch(imageUrl)
  .then(function (response) {
    res = response;
  })
  .catch((error) => {
    //console.log('fetch error', error);
    res = 'error';
  });
  if(res != 'error'){
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        console.log('reader error');
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }else{
    return 'error';
  }
}
