import { useState, useEffect } from 'react'

export default function StatusMessage({message, status}){
    const [visible, setVisible] = useState(true)
    
    // console.log(`Visible = ${visible}; message = ${message}`)
    
    useEffect(() => { 
        if(!message){
            setVisible(false)
            return
        } else {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
                window.location.reload(false)
            }, 1500)
    
            return () => clearTimeout(timer)
        }


    }, [message])
    
    return(
        <>
            {visible && (
                <h4>{status} na operação</h4>
            )}
        </>
    )
}