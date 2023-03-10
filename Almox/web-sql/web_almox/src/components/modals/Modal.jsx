import styles from './Modal.module.css'

export default function Modal({show, onClose}){
    
    if(!show) return null

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Modal Title</h4>
                </div>
                <div className={styles.modal_body}>
                    This is modal content
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Close</button>
                </div>
            </div>
        </div>
    )
}