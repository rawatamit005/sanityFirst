/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import qs from 'qs';
import Dialog from 'part:@sanity/components/dialogs/fullscreen';
import TextInput from 'part:@sanity/components/textinputs/default';
import Button from 'part:@sanity/components/buttons/default';
import Spinner from 'part:@sanity/components/loading/spinner';

import { TabImage } from './TabImage';
import styles from './TabAssetSource.css';


const SearchInput = ({ label, onChange, onEnter, value }) => {
  const onKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') onEnter(event);
    },
    [onEnter]
  );

  return (
    <div className={styles['c-search']}>
      <label className={styles['c-search__label']}>
        <span className={styles['c-search__text']}>{label}</span>
        <TextInput onChange={onChange} onKeyPress={onKeyPress} value={value} />
      </label>
    </div>
  );
};

const TabImageSearch = (props) => {
  //console.log('tab logs', props);
  const onClose = props.onClose;
  const onSelect = props.onSelect;
  const [searchTerms, setSearchTerms] = useState({
    assetId: '',
    search: '',
  });
  const [hasError, setHasError] = useState(false);
  const [hasNoResult, setHasNoResult] = useState(false);
  const [hasErrorCountry, setHasErrorCountry] = useState(false);
  const [foundAssets, setFoundAssets] = useState();
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const imagePerPage = 8;

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
      const searchButtonEvent = typeof pageToFetch !== 'number';
      const page = searchButtonEvent ? 1 : pageToFetch;
      setHasError(false);
      setHasNoResult(false);
      setHasErrorCountry(false);
      //if(props.document.content.brand && props.document.content.country){
        try {
          setLoading(true);
          setLoadMore(false);
          setPageNumber(page);
            const resp = await axios.get(
              `https://qancgds6x3.execute-api.eu-west-1.amazonaws.com/staging/assets?${qs.stringify({
                ...(searchTerms.assetId && { assetID: searchTerms.assetId }),
                ...(searchTerms.search && { search: searchTerms.search }),
                pageSize: imagePerPage,
                pageNumber: page
              })}`,
              {
                headers: {
                  'x-api-key': '6IDG0m8iocajUjD4YlKYk4WznBXZHUBNa6hIjobp'
                }
              }
            )
            
            if(parseInt(resp.data.pageNumber) == 1 && parseInt(resp.data.totalResults) == 0){
              setHasNoResult(true);
            }
            if(parseInt(resp.data.numberOfPages) == 0 || parseInt(resp.data.pageNumber) == parseInt(resp.data.numberOfPages)){
              setLoadMore(false);
            }else{
              setLoadMore(true);
            }
            if (foundAssets && !searchButtonEvent) {
              setFoundAssets({ ...resp.data, assets: [...foundAssets.assets, ...resp.data.assets] });
            } else {
              setFoundAssets(resp.data);
            }
        } catch (err) {
          setHasError(true);
        } finally {
          setLoading(false);
        }
      //}else{
        //setHasErrorCountry(true);
      //}
    },
    [searchTerms, pageNumber, foundAssets, setFoundAssets, setHasError, setLoading, setHasErrorCountry, setHasNoResult]
  );

  const handSearchClick = useCallback(() => {
    setFoundAssets(false);
    onSearch();
  }, [onSearch, setPageNumber]);

  const onIntersection = useCallback(() => {
    if (pageNumber === foundAssets.numberOfPages) {
      setLoadMore(false);
      return
    };

    onSearch(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  }, [onSearch, setPageNumber]);

  return (
    <Dialog title="Select image from TAB" onClose={onClose} isOpen>
      <div className={styles.container}>
        <SearchInput
          onChange={onSearchTermChange('assetId')}
          onEnter={handSearchClick}
          value={searchTerms.assetId}
          label="Asset ID"
        />
        <p className={styles.container__divider}>Or</p>
        <SearchInput
          onChange={onSearchTermChange('search')}
          onEnter={handSearchClick}
          value={searchTerms.search}
          label="Keyword"
        />
        <div className={styles['c-button']}>
          <Button className={styles['main-button']} onClick={handSearchClick}>Search</Button>
        </div>
      </div>
      <div className={styles['c-results-container']}>
        {hasErrorCountry && <span className={styles['c-error-text']}>Please select Country and Brand from "Campaign Detail" section</span>
        }
        {hasError && <span className={styles['c-error-text']}>Sorry an error has occured</span> }
        {hasNoResult && <span className={styles['c-result-text']}>No asset found</span> }
        {foundAssets &&
          foundAssets.assets.map((asset, index) => {
            //console.log('image aaset', asset);
            if (asset.OriginalURL !== 'null')
              return (
                <TabImage
                  key={asset.assetID}
                  asset={asset}
                  onSelect={onSelect}
                  // Only add intersection to 2nd to last result
                  onIntersection={
                    foundAssets.assets.length - 2 === index ? onIntersection : undefined
                  }
                />
              );
          })}
      </div>
      <div className={styles['spinner-load']}>
        {loading && <div className={styles['c-result-spinner']}><Spinner /></div>}
        {loadMore && <button className={styles['load-more']} onClick={onIntersection}>Load More</button>}
      </div>
    </Dialog>
  );
};

export default TabImageSearch;
