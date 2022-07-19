import React, { useState} from 'react'
import { FormField } from '@sanity/base/components'
import { TextInput } from '@sanity/ui'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { MdCheck } from "react-icons/md"
import {MdClear,MdSearch} from "react-icons/md"
import client from 'part:@sanity/base/client';
import {withDocument} from 'part:@sanity/form-builder';
import { useDocumentOperation } from "@sanity/react-hooks";
const EanValidator = React.forwardRef((props, ref) => {
    
    var countryId= props.document.content.country.id;
  
     const {patch} = useDocumentOperation(props.document._id.replace("drafts.", ""), props.document._type)
    console.log(countryId);
    const [ data , setData ] = useState({});
    const [ isDataAvailable , setIsDataAvailable ] = useState(null);
    const { 
            type,         // Schema information
            value,        // Current field value
            readOnly,     // Boolean if field is not editable
            placeholder,  // Placeholder text from the schema
            markers,      // Markers including validation rules
            presence,     // Presence information for collaborative avatars
            compareValue, // Value to check for "edited" functionality
            onFocus,      // Method to handle focus state
            onBlur,       // Method to handle blur state
            onChange,
            id  
          } = props
          console.log("zczxc",props);
    const handleChange = React.useCallback(
        // useCallback will help with performance
        (event) => {
            const inputValue = event.currentTarget.value // get current value
            // if the value exists, set the data, if not, unset the data
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
            // patch.execute([{set: { "productInput.smartProductId" : "HHJG"}}])
            if ( inputValue && inputValue.length < 11 ) { setData({});setIsDataAvailable(false);  return false; }
              const API_URL=`http://app.cartwire.co/Product_rest/details?ean_no=${inputValue}&country_id=${countryId}`
            //const API_URL = `https://app.cartwire.co/Product_rest/details?ean_no=${inputValue}`;
            try{
                fetch(API_URL)
                .then(res => res.json())
                .then(response => {
                            if ( !response ) return "no response";
                            console.log("resData=======",response)
                            setData(response.data);
                            response.data && response.data.length ? setIsDataAvailable(true) : setIsDataAvailable(false);
                })
            }catch(e){
                console.error(e);
                setData({});
                setIsDataAvailable(false);
            }
            
        },
        [onChange]
    )
    
    return (
      <FormField
        description={type.description}  // Creates description from schema
        title={type.title}              // Creates label from schema title
        __unstable_markers={markers}    // Handles all markers including validation
        __unstable_presence={presence}  // Handles presence avatars
        compareValue={compareValue} 
        id={id}    // Handles "edited" status
      >
        <TextInput
          value={value}                 // Current field value
          readOnly={readOnly}           // If "readOnly" is defined make this field read only
          placeholder={placeholder}     // If placeholder is defined, display placeholder text
          onFocus={onFocus}             // Handles focus events
          onBlur={onBlur}               // Handles blur events
          ref={ref}
          onChange={handleChange}
          icon={MdSearch}
        />
          
        {isDataAvailable==true && <MdCheck style={{position:'absolute',top:5,right:10,color:'green',fontSize:22}}/>}
        {isDataAvailable===false && <MdClear style={{position:'absolute',top:5,right:10,color:'red',fontSize:22,cursor:'pointer'}} />}
        {isDataAvailable===false && <span style={{color:'red'}}>{'No data found'}</span>}
        
      </FormField>
      
      
    )
  }
)

// Create the default export to import into our schema
export default withDocument(EanValidator)