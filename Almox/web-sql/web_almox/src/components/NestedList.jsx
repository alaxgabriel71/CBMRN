import { useEffect } from 'react'
import NestedListItem from './NestedListItem'
import NestedListSubItem from './NestedListSubItem'
import { useState } from 'react'

export default function NestedList() {
    
    var listExample = [
        /* {id: 0, name: "martelo", childs: ''},        
        {id: 8, name: '', childs: ''},
        {id: 1, name: "gaveta 1", childs: [
            {id: 2, name: "cilindro", childs: ''}, 
            {id: 3, name: "mascara", childs: ''}, 
            {id: 4, name: "luva", childs: ''}, 
            {id: 5, name: "maleta", childs: [
                {id: 6, name: "alicate", childs: ''},
                {id: 7, name: "chave de fenda", childs: ''}
            ]}, 
        ]} */
        {id: 0, name: "martelo", father: '', childs: []},
        {id: 1, name: "machado", father: '', childs: []},
        {id: 2, name: "gaveta 1", father: '', childs: [3, 4, 5, 6]},
        {id: 3, name: "cilindro", father: 2, childs: []},
        {id: 4, name: "mascara", father: 2, childs: []},
        {id: 5, name: "luva", father: 2, childs: []},
        {id: 6, name: "maleta", father: 2, childs: [7, 8]},
        {id: 7, name: "alicate", father: 6, childs: []},
        {id: 8, name: "chave de fenda", father: 6, childs: []},
        {id: 9, name: "cone", father: '', childs: []},
        {id: 10, name: "escada", father: '', childs: []},
        {id: 11, name: "motosserra", father: '', childs: []},
    ]

    const [list, setList] = useState(listExample)

    useEffect(()=>{
        console.log(list)
    }, [list])

    function addItem(id, vector){
        vector.forEach((item, k) => {
            if(item.id === id){
                console.log(item.name)
                vector.splice(k+1, 0, {id: `${list.length}-newitem`, name: '', childs: ''})
            } else if(item.childs.lenght !== 0){
                addItem(id, item.childs)
            }
        })
        return vector
    }

    function modifyList(id){
        list.forEach((item, index, arr) => {
        if (item.id === id) {
            arr[index].childs.push = list.length
        }
       })
        //setList([...list, {id: list.length, name: '', father: id, childs: ''}])
        console.log(list)
    }

    const showItem = item => {
        /* if(Array.isArray(item.childs).length !== 0) {
            return (<NestedListSubItem key={item.id+'list-subitem'} name={item.name} childs={item.childs} id={item.id} showItem={showItem} />)
        } else {
            return (<NestedListItem key={item.id+'list-item'} name={item.name} id={item.id} modifyList={modifyList} />)
        } */
        if(item.childs.length !== 0) {
            console.log("subitem")
            return (<NestedListSubItem key={item.id+'list-subitem'} list={list} name={item.name} childs={item.childs} id={item.id} showItem={showItem} />)
        } else {
            console.log("item")
            return (<NestedListItem key={item.id+'list-item'} name={item.name} id={item.id} modifyList={modifyList} />)
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