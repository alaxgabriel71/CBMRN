import { useState } from 'react'

import api from '../services/api'
import styles from './Military.module.css'

export default function Military({ id, name, rank, handleClick }) {
    const [isHovering, setIsHovering] = useState(false)
    var [milRank, setRank] = useState(rank)

    const handleClickInc = () => {
        setRank(milRank + 1)
        api.put(`/military/${id}`, {
            name: name,
            rank: rank + 1
        })
            .then(response => {
                console.log(response.status)
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    const handleClickDec = () => {
        setRank(milRank - 1)
        api.put(`/military/${id}`, {
            name: name,
            rank: rank - 1
        })
            .then(response => {
                console.log(response.status)
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    const handleClickDel = () => {
        api.delete(`/military/${id}`)
            .then(response => {
                console.log(response.status)
                window.location.reload(false)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={styles.Item_container} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
            <h3 className={styles.Title}>{name}</h3>

            {isHovering && (
                <div className={styles.Options_container}>
                    <div className={styles.Rank_container}>
                        <button className={styles.UpButton} onClick={handleClickInc}>^</button>
                        <button className={styles.DownButton} onClick={handleClickDec}>v</button>
                    </div>
                    <button className={styles.DeleteButton} onClick={handleClickDel}>x</button>
                </div>
            )}
        </div>

    )
}