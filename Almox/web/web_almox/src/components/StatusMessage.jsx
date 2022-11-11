import { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

export default function StatusMessage({ message, status, variant, show }) {
    const [visible, setVisible] = useState(false)

    // console.log(`Visible = ${visible}; message = ${message}`)

    useEffect(() => {
        if (!show) {
            setVisible(false)
            return
        } else {
            setVisible(true)

            if (status === 'Sucesso') {
                const timer = setTimeout(() => {
                    setVisible(false)
                    window.location.reload(false)
                }, 1500)

                return () => clearTimeout(timer)
            }
        }


    }, [show, status])


    return (
        <>
            {visible && (
                <Alert variant={variant}>
                    <Alert.Heading>{status}</Alert.Heading>
                    <p>{message}</p>
                </Alert>
            )}
        </>
    )
}