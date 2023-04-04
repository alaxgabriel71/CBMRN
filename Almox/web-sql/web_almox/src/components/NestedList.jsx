import { useEffect } from 'react'
import NestedListItem from './NestedListItem'
import NestedListSubItem from './NestedListSubItem'
import { useState } from 'react'

export default function NestedList() {
    
    var listExample = [
        {id: 0, name: "martelo", childs: ''},        
        {id: 8, name: '', childs: ''},
        {id: 1, name: "gaveta 1", childs: [
            {id: 2, name: "cilindro", childs: ''}, 
            {id: 3, name: "mascara", childs: ''}, 
            {id: 4, name: "luva", childs: ''}, 
            {id: 5, name: "maleta", childs: [
                {id: 6, name: "alicate", childs: ''},
                {id: 7, name: "chave de fenda", childs: ''}
            ]}, 
        ]}
    ]

    const [list, setList] = useState(listExample)

    useEffect(()=>{
        console.log(list)
    }, [list])

    function addItem(id){
        console.log("add...", id)
        setList([...list, {id: list.length, name: '', childs: ''}])
    }

    const showItem = item => {
        if(Array.isArray(item.childs)) {
            return (<NestedListSubItem key={item.id+'list-subitem'} name={item.name} childs={item.childs} id={item.id} showItem={showItem} />)
        } else {
            return (<NestedListItem key={item.id+'list-item'} name={item.name} id={item.id} addItem={addItem}/>)
        }
    }
    return(
        <ul>{list.map(showItem)}</ul>
    )
}

    /* const Item = ({name, id}) => (
        <li key={id} onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)} >             
            <p>{name}</p>
            {show && (
                <div>
                    <button>Add Item</button>
                    <button>Add SubItem</button>
                </div>
            )}
        </li>
    ) */

    /* const SubItem = ({name, childs, id}) => (
        <li key={id}>
            {name}
            <ul key={name}>
                {childs.map(showItem)}
            </ul>
        </li>
    ) */