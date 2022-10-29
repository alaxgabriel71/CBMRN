import { useState, useEffect } from 'react'

import styles from './TakeCareMaterialModal.module.css'
import api from '../../services/api'

export default function TakeCareMaterialModal({show, onClose, materialId, materialName, materialQuantity}){
    /* const options = [
        {value: '', text: "-- Selecione um militar --"},
        {value: "Militar 1", text: "Militar 1"},
        {value: "Militar 2", text: "Militar 2"},
    ] */
    
    const [takeCareQuantity, setTakeCareQuantity] = useState(1)
    const [options, setOptions] = useState([])
    const [military, setMilitary] = useState()

    useEffect(() => {
        api.get('/military')
            .then(({data}) => {
                setOptions(data.military)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    if(!show) return null

    const takeCareMaterial = (event) => {
        // event.preventDefault()

        const finalQuantity = Number(materialQuantity) - Number(takeCareQuantity);

        if(finalQuantity === 0){
            api.delete(`/materials/${materialId}`)
                .then(response => console.log(response))
                .catch(err => console.error(err) )
        }
        else {
            api.put(`/materials/${materialId}`, {
                name: materialName,
                quantity: finalQuantity
            })
                .then(response => console.log(response))
                .catch(err => console.error(err))
        }
        console.log(`${takeCareQuantity}x ${materialName} foi(foram) cautelado(s) pelo ${military}`)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Cautelar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <h3>{materialName}</h3>
                    <form onSubmit={takeCareMaterial} id="take-care-form">
                        <label>
                            Quantidade:
                            <input 
                            type="number" 
                            min="1" 
                            max={materialQuantity} 
                            defaultValue={materialQuantity}
                            value={takeCareQuantity}
                            onChange={e => setTakeCareQuantity(e.target.value)}
                            required
                            />
                        </label>
                        <label>
                            Cautelado por: 
                            <select name="military" value={military} onChange={event => setMilitary(event.target.value)} required>
                                <option value="" key="0">-- Selecione um militar --</option>
                                {options?.map(option => 
                                    <option key={option._id} value={option.name}>{option.name}</option>
                                )}
                            </select>
                        </label>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Cancelar</button>
                    <button type="submit" form="take-care-form">Confirmar cautela de material</button>
                </div>
            </div>
        </div>
    )
}