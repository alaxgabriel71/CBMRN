// import { useState } from 'react'
import { ToggleButton, FloatingLabel, Form } from 'react-bootstrap'

import styles from './Pagination.module.css'

export default function Pagination({ itemsPerPage, totalItems, paginate, setItemsPerPage }) {
    // const [active, setActive] = useState(localStorage.getItem('active') || '1')

    const pageNumbers = []
    var defaultCurrentPage = 1;

    function updatePageNumber() {
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push({
                name: `${i}`,
                value: `${i}`
            })
        }
        localStorage.setItem('totalPages', `${pageNumbers.length}`)
        // defaultCurrentPage = Number(localStorage.getItem('active')) <= Number(localStorage.getItem('totalPages')) ? localStorage.getItem('active') : '1'
        // localStorage.setItem(`active`, `${defaultCurrentPage}`)
        // return defaultCurrentPage
    }

    updatePageNumber()
    // console.log(active)

    return (
        <nav>
            <FloatingLabel className={styles.FloatingLabel} controlId="floatingSelect" label="Itens por página">
                <Form.Select
                    aria-label="Floating label select example"
                    defaultValue={itemsPerPage}
                    onChange={e => {
                        setItemsPerPage(e.target.value)
                        localStorage.setItem('itemsPerPage', `${e.target.value}`)                        
                        paginate(1)
                        console.log('opa!')
                    }}
                    className={styles.FormSelect}
                >
                    <option disabled>-- Quantidade --</option>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </Form.Select>
            </FloatingLabel>
            <ul className={styles.Navbar_item}>
                {pageNumbers.map(number => (
                    <li key={number.value} className={styles.Item}>
                        <ToggleButton
                            key={number.name}
                            className="btn btn-danger btn-sm"
                            value={number.value}
                            onClick={() => {
                                paginate(number.value)
                                localStorage.setItem('active', `${number.value}`)
                            }}
                            type="radio"
                            name="radio"
                            checked={localStorage.getItem('active') === number.value}
                        >
                            {number.name}
                        </ToggleButton>
                    </li>
                ))}
            </ul>
        </nav>
    )
}