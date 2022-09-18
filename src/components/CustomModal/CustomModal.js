import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { Modal, ModalBody, ModalContent , ModalItem} from './styles/custom-modal'

const CustomModal = ({children, dispatch, maxWidth, showModal, width}) => {
    return (
        <Modal maxWidth={maxWidth}>

            <ModalBody>
                <ModalContent>
                <FeatherIcon icon='x-circle' className='cancel' onClick={()=>dispatch({
                    type:'OPEN_MODAL',
                    payload:false
                })} />
                    <ModalItem width={width}>
                    {children}
                    </ModalItem>
                </ModalContent>
            </ModalBody>
            
        </Modal>
    )
}

export default  CustomModal