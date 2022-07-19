/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from 'react';
import Dialog from 'part:@sanity/components/dialogs/fullscreen';
import TextInput from 'part:@sanity/components/textinputs/default';
import Button from 'part:@sanity/components/buttons/default';
import Spinner from 'part:@sanity/components/loading/spinner';
import { getBase64ImageFromUrl } from './get-base-64-from-url';
import styles from './searchImageURL.css';


const SearchInput = ({ errorMessage, onChange, onEnter, value }) => {
  const onKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') onEnter(event);
    },
    [onEnter]
  );
  return (
    <div className={styles['c-search']}>
      <label className={styles['c-search__label']}>
        <TextInput onChange={onChange} onKeyPress={onKeyPress} value={value} placeholder="Enter image URL" />
      </label>
    </div>
  );
};

const SearchImageByUrl = ({ onClose, onSelect }) => {
  const [searchTerms, setSearchTerms] = useState({
    assetId: '',
    search: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [foundAssets, setFoundAssets] = useState();
  const [loading, setLoading] = useState(false);
  const errrText = 'Image cannot be accessed by URL. You can try adding image by TAB ID, or downloading the image to your device and using Upload method to add image';
  const onSearchTermChange = useCallback(
    (key) => (val) => {
      setSearchTerms({
        ...searchTerms,
        [key]: val.target.value,
      });
    },
    [searchTerms, setSearchTerms]
  );

  const onSearch = useCallback(
    async (pageToFetch) => {
      const base64Image = await getBase64ImageFromUrl(searchTerms.assetId);
      if(base64Image == 'error'){
        setErrorMessage(errrText);
      }else{
        // if the selected image is in format application/octet-stream it will convert it to tiff
        const uploadBase64 = base64Image.replace('application/octet-stream', 'image/tiff');
        //console.log(uploadBase64);
        const selectedItem = {
          kind: 'base64',
          value: uploadBase64,
          assetDocumentProps: {
            source: {
              name: 'image-url',
              id: 'urlImage'
            },
          },
        };
        onSelect([selectedItem]);
        const searchButtonEvent = typeof pageToFetch !== 'number';
        const page = searchButtonEvent ? 1 : pageToFetch;
        try {
          setLoading(true);
          if (foundAssets && !searchButtonEvent) {
            setFoundAssets({ ...resp.data, assets: [...foundAssets.assets, ...resp.data.assets] });
          } else {
            setFoundAssets(resp.data);
          }
        } catch (err) {
          setErrorMessage('image can not be fetched');
        } finally {
          setLoading(false);
        }
      }
    },
    [searchTerms, foundAssets, setFoundAssets, setErrorMessage, setLoading]
  );

  return (
    <Dialog title="Select image from URL" onClose={onClose} isOpen>
      <div className={styles.container}>
        <SearchInput
          onChange={onSearchTermChange('assetId')}
          onEnter={onSearch}
          value={searchTerms.assetId}
        />
        <div className={styles['c-button']}>
          <Button onClick={onSearch}>Get Image</Button>
        </div>
      </div>
      <div id="imageBox" className={styles['c-results-container']}>
        <span className={styles['c-error__text']}>{errorMessage}</span>
        {loading && <Spinner />}
      </div>
    </Dialog>
  );
};

export default SearchImageByUrl;