import React, { useState,useEffect,useRef} from 'react'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import client from 'part:@sanity/base/client';
import {withDocument} from 'part:@sanity/form-builder';
import { useDocumentOperation } from "@sanity/react-hooks";
import SearchableSelect from 'part:@sanity/components/selects/searchable'


const SearchLangCode= React.forwardRef((props, ref) => {
       if (props.document.content.hasOwnProperty('country') ) {
         var countryId=props.document.content.country.countryId;
       }
       if (props.document.content.hasOwnProperty('brand') ) {
        var brandId=props.document.content.brand.brandId;
      }

      const prevItemIdRef = useRef();
      useEffect(() => {
      // if(props.document.content.hasOwnProperty('country')){
      //      prevItemIdRef.current= props.document.content.country.countryId;
      //   }
        if (props.document.content.hasOwnProperty('brand') ) {
            prevItemIdRef.current=props.document.content.brand.brandId;
          }
      },[]);

       useEffect(() => {
        const LANGUAGE_URL= `https://app.cartwire.co/CW_API/locale/${brandId}/${countryId}`
        setIsFetching(true);
          try{
            fetch(LANGUAGE_URL)
            .then(res => res.json())
            .then(response => {
                if ( !response ) return "no response";
             console.log(response.data);
                setFiles([...response.data])
                search(""); 
                setIsFetching(false);
                // if(prevItemIdRef.current !== props.document.content.country.countryId) {
                //   console.log('diff country id');
                //   handleClear();
                //   setInputValue('');
                // }
                if(prevItemIdRef.current !== props.document.content.brand.brandId) {
                    console.log('diff brand id');
                    handleClear();
                    setInputValue('');
                  }
            })
        }catch(e){
            console.error(e);
            setIsFetching(false);
        }
          
      }, [brandId]);

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
      
        

        function getlanguage(){
          setInputValue(null);
          // setFiles(...files,[]);
          const LANGUAGE_URL=`https://app.cartwire.co/CW_API/locale/${brandId}/${countryId}`
          setIsFetching(true);
          try{
            fetch(LANGUAGE_URL)
            .then(res => res.json())
            .then(response => {
                if ( !response ) return "no response";
             
               
                setFiles([...response.data]);
            
                search("");
              
                setIsFetching(false);
            })
        }catch(e){
            console.error(e);
            setIsFetching(false);
        }
        }

        function handleOpen() {
          getlanguage();
        }

      function search(query) {
       console.log("files data =======",files);
          setHits(
            files
              .filter(
                ({ locale}) =>
                locale.toLowerCase().indexOf(query.toLowerCase()) > -1
              )
              .map(({ locale ,languageCode }) => (
                <div
                  style={{ display: "flex" }} 
                >
                  <div id={languageCode}>{locale}</div>
                </div>
              ))
          );
        }

        function renderItem(locale) {
          //console.log("renderItem",brandName)
          return locale;
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
          const  locale = props.children.props.children;
          onChange(PatchEvent.from(set({localeName:locale, languageCode:props.children.props.id,_type:type.name})));
          setInputValue(null);
        }

        function handleSearch(query) {
          console.log("query======",query)
          search(query);
        }
    
        return (
          <div>
           {  props.document.content.hasOwnProperty('country') &&  props.document.content.hasOwnProperty('brand') &&(
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
                  inputValue={ inputValue === null ? value?.localeName : inputValue}
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

export default withDocument(SearchLangCode)