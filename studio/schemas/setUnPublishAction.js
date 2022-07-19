  
import {useDocumentOperation} from '@sanity/react-hooks'
import CloseIcon from 'part:@sanity/base/close-icon'
import {inferMetadataState} from '../lib/workflow/helpers'
import {useWorkflowMetadata} from '../lib/workflow/metadata'

export function unpublishAction(props) {
  const ops = useDocumentOperation(props.id, props.type)
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props))
  const campaignops=useDocumentOperation('imported-CampaignProductItem-'+props.id, 'campaignProductItem')
  const campaignStyleops=useDocumentOperation('imported-campaignStyle-'+props.id, 'campaignStyle')
  if (metadata.data.state !== 'published') {
    return null
  }

  const onHandle = () => {
    if (ops.unpublish.disabled) {
      props.onComplete()
      return
    }
    campaignops.delete.execute()
    campaignStyleops.delete.execute()
    metadata.setState('draft')
    ops.unpublish.execute()
    props.onComplete()
  }

  return {
    disabled: ops.unpublish.disabled,
    icon: CloseIcon,
    shortcut: 'mod+shift+u',
    label: 'Unpublish',
    onHandle
  }
}