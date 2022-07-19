import React, { useState,useEffect,useRef} from 'react'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import client from 'part:@sanity/base/client';
import {withDocument} from 'part:@sanity/form-builder';
import { useDocumentOperation } from "@sanity/react-hooks";
import SearchableSelect from 'part:@sanity/components/selects/searchable'


const SearchBrandInput = React.forwardRef((props, ref) => {
       if (props.document.content.hasOwnProperty('country') ) {
         var countryName=props.document.content.country.countryName;
       }
       // alert(countryName)

      const prevItemIdRef = useRef();
      useEffect(() => {
      if(props.document.content.hasOwnProperty('country')){
           prevItemIdRef.current = props.document.content.country.countryName;
        }
        // var prevItemId = prevItemIdRef.current;
        // console.log("prevItemId",prevItemId)
      },[]);

       useEffect(() => {
        const BRAND_URL=`https://app.cartwire.co/CW_API/market_to_brand_mapping/${countryName}`
        setIsFetching(true);
          try{
            fetch(BRAND_URL)
            .then(res => res.json())
            .then(response => {
                if ( !response ) return "no response";
             
                setFiles([...response])
                search(""); 
                setIsFetching(false);
                if(prevItemIdRef.current !== props.document.content.country.countryName) {
                  console.log('diff country name');
                  handleClear();
                  setInputValue('');
                }
                
            })
        }catch(e){
            console.error(e);
            setIsFetching(false);
        }
          
      }, [countryName]);

       const {
        compareValue,
        focusPath,
        markers,
        onBlur,
        onChange,
        onFocus,
        presence,
        type,
        value,
        level
      } = props

        const [inputValue, setInputValue] = useState(null);
        const [isFetching, setIsFetching] = useState(false);
        const [hits, setHits] = useState([]);
        const [files, setFiles] = useState([]);
        const [country, setCountry] = useState("");
        

        function getBrand(){
          setInputValue(null);
          // setFiles(...files,[]);
          const BRAND_URL=`https://app.cartwire.co/CW_API/market_to_brand_mapping/${countryName}`
          setIsFetching(true);
          try{
            fetch(BRAND_URL)
            .then(res => res.json())
            .then(response => {
                if ( !response ) return "no response";
             
               
                setFiles([...response]);
              console.log("agdjs",files);
                search("");
              
                setIsFetching(false);
            })
        }catch(e){
            console.error(e);
            setIsFetching(false);
        }
        }

        function handleOpen() {
          getBrand();
        }

      function search(query) {
       console.log("files data =======",files);
          setHits(
            files
              .filter(
                ({ brand }) =>
                brand.toLowerCase().indexOf(query.toLowerCase()) > -1
              )
              .map(({ brand, brandId }) => (
                <div
                  style={{ display: "flex" }} 
                >
                  <div id={brandId}>{brand}</div>
                </div>
              ))
          );
        }

        function renderItem(brandName) {
          //console.log("renderItem",brandName)
          return brandName;
        }

        function handleClear() {
          onChange(PatchEvent.from(unset()));
        }

                 
        function handleFocus() {
          console.log("onFocus")
          onFocus();
          handleOpen()
        }

        function handleBlur() {
          console.log("onBlur")
          onBlur();
          handleOpen()
        }

        function handleChange({ props }) {
          console.log("on change called ",props)
          const  brand = props.children.props.children;
          onChange(PatchEvent.from(set({ brandName:brand,_type:type.name,brandId: props.children.props.id})));
          setInputValue(null);
        }

        function handleSearch(query) {
          console.log("query======",query)
          search(query);
        }
    
        return (
          <div>
           {  props.document.content.hasOwnProperty('country') &&(
            <FormField
            markers={markers}
            label={type.title}
            level={level}
            description={type.description}
          >
            
                  <SearchableSelect
                  placeholder="Type to search…"
                  onOpen={handleOpen}
                  renderItem={renderItem}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onSearch={handleSearch}
                  onBlur={handleBlur}
                  onClear={handleClear}
                  title={inputValue}
                  value={value}
                  inputValue={ inputValue === null ? value?.brandName : inputValue}
                  isLoading={isFetching}
                  items={hits}
                  ref={ref}
                />
          </FormField>
          )
        }
          </div>
        
          );
    }

)

export default withDocument(SearchBrandInput)