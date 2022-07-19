import React from 'react'
import TrashIcon from 'part:@sanity/base/trash-icon'
import {inferMetadataState} from '../lib/workflow/helpers'
import {useWorkflowMetadata} from '../lib/workflow/metadata'
import {useDocumentOperation} from '@sanity/react-hooks'

export function deleteAction(props) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const ops = useDocumentOperation(props.id, props.type)
  const campaignops=useDocumentOperation('imported-CampaignProductItem-'+props.id, 'campaignProductItem')
  const campaignStyleops=useDocumentOperation('imported-campaignStyle-'+props.id, 'campaignStyle')
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props))
  const onHandle = () => {
    if (ops.delete.disabled) {
      props.onComplete()
      return
    }

    if (!showConfirmDialog) {
      setShowConfirmDialog(true)
      return
    }

    setShowConfirmDialog(false)
 
    metadata.delete()
    campaignops.delete.execute()
    campaignStyleops.delete.execute()
    ops.delete.execute()
    props.onComplete()
  }

  return {
    dialog: showConfirmDialog && {
      type: 'confirm',
      message: <div>Sure you want to delete?</div>,
      onConfirm: onHandle,
      onCancel: () => setShowConfirmDialog(false)
    },
    disabled: ops.delete.disabled,
    icon: TrashIcon,
    shortcut: 'Ctrl+shift+d',
    label: 'Delete',
    onHandle
  }
}