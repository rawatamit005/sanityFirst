import React from 'react'
import styles from './BasicStyle.css'
import {FormField} from '@sanity/base/components'
import {Card, TextInput} from '@sanity/ui'

const configSetting = require("../../config");

const StyleInput = React.forwardRef((props, ref) => {
    
    const {
        type,
        placeholder,
        description,
        initialValue,
        value
    } = props
    var cssPath = configSetting.sanity.sanityCdnUrl+'files/'+process.env.SANITY_STUDIO_PROJECT_ID+'/'+process.env.SANITY_STUDIO_API_DATASET+'/'+process.env.SANITY_STUDIO_BRAND_SAMPLE_CSS+'?dl';
    return (
        <span className={styles.downloadLink}>{type.description} <a href={cssPath}>{type.title}</a></span>
    )
})

export default StyleInput