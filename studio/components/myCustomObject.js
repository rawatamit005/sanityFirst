
import React, { useState} from 'react'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import Fieldset from 'part:@sanity/components/fieldsets/default'
// Utilities for patching
import PatchEvent,{ setIfMissing, set } from '@sanity/form-builder/PatchEvent'
import {withDocument} from 'part:@sanity/form-builder';
import { MdCheck } from "react-icons/md"
import {MdClear,MdSearch} from "react-icons/md"

 const MyCustomObject = React.forwardRef((props, ref) => {
  
  var countryId= props.document.content.country.countryId;
  var langCode= props.document.content.locale.languageCode;
  const [ data , setData ] = useState({});
  const [ isDataAvailable , setIsDataAvailable ] = useState(null);
  const [ valueSet , setValueSet] = useState({ "smartProductId":null, "productCode": null, "title":null });
   // const [ valueSet , setValueSet] = useState({})
    // destructure props for easier use
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
    console.log(value);

    // var currentSmartId=value[type.fields[1].name]==undefined?null :value[type.fields[1].name];
  //   var currentProductCode=value[type.fields[0].name]==undefined?null :value[type.fields[0].name];
 //    var currentTitle=value[type.fields[2].name]==undefined?null :value[type.fields[2].name];
  //  const [ valueSet , setValueSet] = useState({ "smartProductId":currentSmartId, "productCode":currentProductCode, "title": currentTitle });
    const handleFieldChange = React.useCallback(
      (field, fieldPatchEvent) => {
     onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({ _type: type.name })));
           if(field.name == 'productCode'  ){
          let inputValue =(fieldPatchEvent.patches[0].value);
         
         
          if ( inputValue==undefined || (inputValue && inputValue.length < 13) ) { 
            
            setData({});
            if(inputValue==undefined)
            {
              setIsDataAvailable(null); 
            }
            else{
              setIsDataAvailable(false); 
            }
            //props.onChange(PatchEvent.from(unset()));
            fieldPatchEvent.patches[0].value=null;
            onChange(fieldPatchEvent.prefixAll("smartProductId").prepend(setIfMissing({ _type: type.name })));
            
            fieldPatchEvent.patches[0].value=null;
            onChange(fieldPatchEvent.prefixAll("title").prepend(setIfMissing({ _type: type.name })));
            
            fieldPatchEvent.patches[0].value=null;
            onChange(fieldPatchEvent.prefixAll("productImage").prepend(setIfMissing({ _type: type.name })));
          }
              
          
          const API_URL=`https://app.cartwire.co/Product_rest/details?ean_no=${inputValue}&country_id=${countryId}&lang_code=${langCode}`
      
            try{
                fetch(API_URL)
                .then(res => res.json())
                .then(response => {
                            if ( !response ) return "no response";
                            console.log("resData=======",response)
                            if(response.message=="Data Available")
                            {
                              response.data && response.data.length ? setIsDataAvailable(true) : setIsDataAvailable(false);
                              if(response.data.length)
                               {   
                           
                                fieldPatchEvent.patches[0].value=response.data[0].smart_prduct_id;
                                onChange(fieldPatchEvent.prefixAll("smartProductId").prepend(setIfMissing({ _type: type.name })));
                                fieldPatchEvent.patches[0].value=response.data[0].productTitle;
                                onChange(fieldPatchEvent.prefixAll("title").prepend(setIfMissing({ _type: type.name })));
                                fieldPatchEvent.patches[0].value=response.data[0].image_url;
                                onChange(fieldPatchEvent.prefixAll("productImage").prepend(setIfMissing({ _type: type.name })));
                               }


                            }
                         else{
                     
                          setIsDataAvailable(false)
                          fieldPatchEvent.patches[0].value=null;
                          onChange(fieldPatchEvent.prefixAll("smartProductId").prepend(setIfMissing({ _type: type.name })));
                          
                          fieldPatchEvent.patches[0].value=null;
                          onChange(fieldPatchEvent.prefixAll("title").prepend(setIfMissing({ _type: type.name })));
                          
                          fieldPatchEvent.patches[0].value=null;
                          onChange(fieldPatchEvent.prefixAll("productImage").prepend(setIfMissing({ _type: type.name })));
                          }
                            
                          })
            }catch(e){
                console.error(e);
                setData({});
                setIsDataAvailable(false);
            }
        }
      },
      [onChange]
    )

    // Get an array of field names for use in a few instances in the code
    const fieldNames = type.fields.map((f) => f.name)

    // If Presence exist, get the presence as an array for the children of this field
    const childPresence =
      presence.length === 0
        ? presence
        : presence.filter((item) => fieldNames.includes(item.path[0]))

    // If Markers exist, get the markers as an array for the children of this field
    const childMarkers =
      markers.length === 0 
        ? markers 
        : markers.filter((item) => fieldNames.includes(item.path[0]))

    return (
      <Fieldset
        legend={type.title} // schema title
        description={type.description} // schema description
        markers={childMarkers} // markers built above
        presence={childPresence} // presence built above
      >
        {type.fields.map((field, i) => {
          return (
            // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
            // for the given field type
            <FormBuilderInput
              level={level + 1}
              // ref={i === 0 ? firstFieldInput : null}
              key={field.name}
              type={field.type}
              value={ (value && value[field.name])}
              //value={valueSet  && valueSetfield.name]}
              
              onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
              path={[field.name]}
          
              
              readOnly={field.readOnly}
              presence={presence}
              onFocus={onFocus}
              onBlur={onBlur}
              compareValue={compareValue}
              ref={ref}
            />
          )
        })}
         {isDataAvailable==true && <MdCheck style={{position:'absolute',zIndex: '11',top:50,right:10,color:'green',fontSize:22}}/>}
        {isDataAvailable===false && <MdClear style={{position:'absolute',zIndex: '11',top:50,right:10,color:'red',fontSize:22,cursor:'pointer'}} />}
        {isDataAvailable===false && <span style={{color:'red', position: 'absolute', top:84,fontSize: 15,left: 10}}>{'No Data Found'}</span>}
      </Fieldset>
    )
  }
)

export default withDocument(MyCustomObject)