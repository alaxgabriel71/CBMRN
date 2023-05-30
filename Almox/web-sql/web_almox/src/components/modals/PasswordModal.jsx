import { useState, useEffect } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'

import styles from './Modal.module.css'
import StatusMessage from '../StatusMessage'

export default function PasswordModal({ show, onClose, save, reg, pass, response }) {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [variant, setVariant] = useState('')
    const [showStatus, setShowStatus] = useState(false)

    
    useEffect(() => {
        if(response === 200 || response === 201){
            setMessage('A operação foi concluída.')
            setStatus('Sucesso')
            setVariant('success')
            setShowStatus(true)
        } else if(response === 401) {
            setMessage('Corrija os dados informados.')
            setStatus('Atenção')
            setVariant('warning')
            setShowStatus(true)
        } else if(response === 500) {
            setMessage('Tente novamente mais tarde.')
            setStatus('Falha no servidor')
            setVariant('secondary')
            setShowStatus(true)
        }
    }, [response])
    
    if (!show) return null
    
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Confirme os dados</h4>
                </div>
                <StatusMessage message={message} status={status} variant={variant} show={showStatus} />
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