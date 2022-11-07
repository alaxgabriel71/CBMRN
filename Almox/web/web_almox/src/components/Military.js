import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronUp, FaChevronDown, FaTrash } from 'react-icons/fa'

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
            <h5 className={styles.Title}>{name}</h5>

            {isHovering && (
                <div className={styles.Options_container}>
                    <div className={styles.Rank_container}>
                        <Button className="btn btn-light btn-sm" onClick={handleClickInc}
                        >
                            <FaChevronUp icon="fa-solid fa-chevron-up" />
                        </Button>
                        <Button className="btn btn-light btn-sm" onClick={handleClickDec}
                        >
                            <FaChevronDown icon="fa-solid fa-chevron-down" />
                        </Button>
                    </div>
                    <Button className="btn btn-light btn-sm" onClick={handleClickDel}
                    >
                        <FaTrash icon="fa-solid fa-trash" />
                    </Button>
                </div>
            )}
        </div>

    )
}