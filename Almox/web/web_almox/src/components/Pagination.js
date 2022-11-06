import { Button, FloatingLabel, Form } from 'react-bootstrap'

import styles from './Pagination.module.css'

export default function Pagination({ itemsPerPage, totalItems, paginate, setMaterialsPerPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <FloatingLabel className={styles.FloatingLabel} controlId="floatingSelect" label="Itens por página">
                <Form.Select 
                    aria-label="Floating label select example" 
                    defaultValue={itemsPerPage}
                    onChange={e => setMaterialsPerPage(e.target.value)}
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
                    <li key={number} className={styles.Item}>
                        <Button
                            className="btn btn-danger btn-sm"
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}