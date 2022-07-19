import React from 'react'
import SearchableSelect from 'part:@sanity/components/selects/searchable'
import FormField from 'part:@sanity/components/formfields/default'
import {PatchEvent, set, unset} from 'part:@sanity/form-builder/patch-event'


const RadioOptions = React.forwardRef((props, ref) => {
   
    const {
      type,
      value,
      onFocus,
      onChange
    } = props
    return (
        <FormField label={type.title} description={type.description}>
        <SearchableSelect
          placeholder="Type to search…"
          value={value}
        />
      </FormField>
    )
});

export default RadioOptions;
