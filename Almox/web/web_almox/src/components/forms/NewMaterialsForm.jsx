import { useState, useEffect } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

import styles from './NewMaterialsForm.module.css'

import api from '../../services/api'
import StatusMessage from '../StatusMessage'

export default function NewMaterialsForm() {
    const [materials, setMaterials] = useState([]);
    const [newName, setNewName] = useState();
    const [newQuantity, setNewQuantity] = useState();
    const [newRemark, setNewRemark] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [variant, setVariant] = useState('');
    const [visible, setVisible] = useState(false);

    const { user } = useContext(UserContext)
    
    api.defaults.headers.Authorization = `Bearer ${user.token}`

    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    // const today = formatedDate+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear()
    const date = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    function cancelSubmit() {
        // event.preventDefault();
        setNewName('')
        setNewQuantity('')
    }

    useEffect(() => {

        api.get('/materials')
            .then(({ data }) => {
                setMaterials(data.materials)
            })
            .catch(err => console.error(err))

    }, [])


    function insertNewMaterial(event) {
        event.preventDefault();
        const mili = dateObject.getTime()
        var materialExists = false;
        var currentName = ''
        var currentQuantity = 0;
        var currentMaterialID = '';
        var currentRemark = '';
        var description = '';


        materials.forEach(material => {
            if (material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentName = material.name
                currentQuantity = material.quantity
                currentRemark = material.remark
                currentMaterialID = material._id
                console.log(`Quantidade atual = ${currentQuantity}; Nova quantidade = ${newQuantity}`)
            }
        })


        if (materialExists) {
            const totalQuantity = Number(currentQuantity) + Number(newQuantity)
            var finalRemark = ''
            if(newRemark) finalRemark = " *" + newRemark
            else finalRemark = currentRemark
            console.log(`finalRemark = ${finalRemark}`)
            const newMaterial = {
                name: currentName,
                quantity: totalQuantity,
                remark: finalRemark
            }
            api.put(`/materials/${currentMaterialID}`, newMaterial)
                .then((response) => {
                    console.log("Update status: " + response.status)
                    description = `A quantidade do material: ${currentName} passou de ${currentQuantity} para ${newQuantity}`
                    api.post('/movements', {
                        operation: "Atualização",
                        date,
                        mili,
                        description,
                        remark: finalRemark
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage('O material já existia e foi atualizado e registrado com sucesso.')
                            setVariant('success')
                            setVisible(true)
                        })
                        .catch(err => {
                            console.error(err)
                            setStatus('Falha')
                            setMessage('Não foi possível realizar a operação.')
                            setVariant('dark')
                            setVisible(true)
                        })
                })
                .catch(err => {
                    console.error(err)
                    setStatus('Falha')
                    setMessage('Não foi possível realizar a operação.')
                    setVariant('dark')
                    setVisible(true)
                })
        }
        else {
            console.log(newRemark)
            const newMaterial = {
                name: newName[0].toUpperCase() + newName.substring(1).toLowerCase(),
                quantity: newQuantity,
                remark: " *" + newRemark
            }
            api.post('/materials', newMaterial)
                .then(response => {
                    console.log("STATUS: " + response.status)

                    description = `${newQuantity}x ${newName[0].toUpperCase() + newName.substring(1).toLowerCase()} foi(foram) adicionados ao almoxarifado`
                    api.post('/movements', {
                        operation: "Recebimento",
                        date,
                        mili,
                        description,
                        remark: " *" + newRemark
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage('O recebimento foi registrado.')
                            setVariant('success')
                            setVisible(true)
                        })
                        .catch(err => {
                            console.error(err)
                            setStatus('Falha')
                            setMessage('Não foi possível realizar a operação.')
                            setVariant('dark')
                            setVisible(true)
                        })
                })
                .catch(err => {
                    console.log("error: " + err)
                    setStatus('Falha')
                    setMessage('Não foi possível realizar a operação.')
                    setVariant('dark')
                    setVisible(true)
                })
        }
        setVisible(false)
    }

    return (
        <>
            <form id="new-material-form" method="get" onSubmit={(e) => {
                insertNewMaterial(e);
                cancelSubmit();
            }}>
                <fieldset>
                    <StatusMessage show={visible} variant={variant} message={message} status={status} />
                    <h5 className={styles.FieldsetTitle}>Cadastrar Novo Material</h5>
                    <FloatingLabel
                        label="Nome do Material"
                        className="mb-3"
                        value={newName}
                        onChange={event => setNewName(event.target.value)}
                    >
                        <Form.Control type="text" placeholder="Informe o nome do material" />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Quantidade do Material"
                        className="mb-3"
                        value={newQuantity}
                        onChange={event => setNewQuantity(event.target.value)}
                    >
                        <Form.Control type="number" min="1" placeholder="Informe a quantidade do material" />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Obeservações"
                        className="mb-3"
                        value={newRemark}
                        onChange={e => setNewRemark(e.target.value)}
                    >
                        <Form.Control type="text-area" placeholder="Se houverem observações, escreva aqui." />
                    </FloatingLabel>
                    <div className="form-btn-area">
                        <Button
                            id="cancel"
                            className="form-btn"
                            variant="secondary"
                            type="reset"
                            onClick={() => {
                                cancelSubmit()
                            }}
                        >
                            Limpar
                        </Button>
                        <Button
                            type="submmit"
                            disabled={!newName || !newQuantity || !newRemark}
                            className="form-btn"
                            variant="danger"
                            id="confirm"
                        >
                            Cadastrar Material
                        </Button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}