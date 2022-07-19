import React from 'react'
import styles from './Cats.css'
import { Link } from "part:@sanity/base/router";
class CreateCampaign extends React.Component {
  

  render() {
  
    return (
      <div  data-width="full">

<div className={styles.copyright}>
<div>
                <a  className={styles.linkStyle} href="/intent/create/type=campaign/">
                
                  <div>Create New Campaign0</div>
                </a>
              </div>
    </div>
      </div>
 
   
    )
  }
}

export default {
  name: 'create-new-campaign',
  component: CreateCampaign
}
