import { Button, FloatingLabel, Form } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'

import styles from './Modal.module.css'

export default function PasswordModal({ show, onClose, save, reg, pass }) {

    if (!show) return null

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Confirme os dados</h4>
                </div>
                <div className={styles.modal_body}>
                    <form id="form1" onSubmit={event => {
                        event.preventDefault()
                        save()
                    }}>
                        <FloatingLabel
                            label="Matrícula"
                            //placeholder="Matrícula"
                        >
                            <MaskedFormControl
                                type="text"
                                mask="111.111-1"
                                pattern="[0-9]{3,}\+?.+[0-9]{3,}\+?-+[0-9]{1,}"
                                onChange={e => reg(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Senha"
                            required={true}
                        >
                            <Form.Control type="password" onChange={e => pass(e.target.value)} placeholder="Senha" required={true} />
                        </FloatingLabel>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <Button variant='secondary' onClick={onClose} className={styles.button}>Cancelar</Button>
                    <Button type="submit" form="form1" variant='danger' className={styles.button}>Confirmar</Button>
                </div>
            </div>
        </div>
    )
}