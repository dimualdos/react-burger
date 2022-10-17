import { useEffect, useState } from 'react';
import { PropTypes } from "prop-types";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/modal-overlay';



import styles from './modal.module.css';

const modalItems = document.getElementById('modals');


const Modal = ({ title, children, onClose }) => {
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        const removeModal = (e) => {
            e.key === 'Escape' && onClose();
        }
        setOverlay(true);
        modalItems.classList.add('modalWrapper');
        document.addEventListener('keydown', removeModal);
        document.addEventListener('click', removeModal);
        return () => {
            document.removeEventListener('keydown', removeModal);
            modalItems.classList.remove('modalWrapper');
            document.addEventListener('click', removeModal);
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={`${styles.title} text text_type_main-large`}>
                        {title}
                    </div>
                    <button type='button'
                        className={styles.icon}
                        onClick={onClose}>
                        <CloseIcon type="primary" />

                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
            {overlay ? (<ModalOverlay data={onClose} />) : null}

        </>, modalItems
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,

}

export default Modal;