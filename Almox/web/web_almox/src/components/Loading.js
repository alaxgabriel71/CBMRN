import { useState, useEffect } from 'react'

export default function Loading({ loading }) {
    const [loadMessage, setLoadMessage] = useState('Carregando')

    useEffect(() => {
        function loop(){
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
        <div>
            {loading && (
                (<h4>{loadMessage}</h4>)
            )}
        </div>
    )
}