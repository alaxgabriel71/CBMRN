import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading({ loading }) {
    const [loadMessage, setLoadMessage] = useState('Carregando')

    useEffect(() => {
        function loop() {
            if (loadMessage.length < 13) {
                setTimeout(() => {
                    setLoadMessage(loadMessage + '.')
                }, 500)
            } else {
                setTimeout(() => {
                    setLoadMessage('Carregando')
                }, 500)
            }
        }
        loop()
    }, [loadMessage])

    return (
        <div className="loading-area">
            {loading && 
                <>
                    <Spinner animation="border" role="status" variant="danger" />
                    <span className="text-danger"><h4>{loadMessage}</h4></span>
                </>
            }
        </div>
    )
}