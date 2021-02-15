import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Todo.module.css'

const Todo = ({ avatar_url, login }) => {

    const [gundam, setgundam] = useState([])
    // { id: 1, namegundam: 'Do homework' },
    // { id: 2, namegundam: 'Read book' }])

    const [namegundam, setnamegundam] = useState('')
    const [age, setAge] = useState('')
    const [idEdit, setidEdit] = useState(0)

    useEffect(async () => {
        let ts = await getgundam();
        console.log(ts)
        setgundam(ts)
    }, [])


    const rendergundam = () => {
        if (gundam && gundam.length)
            return gundam.map((task, index) => (
                <li key={index} class={styles.listItem}>
                    {index + 1})
                    {(idEdit !== task.id) ?
                        task.namegundam :
                        (<input
                            class={styles.text}
                            type="text"
                            namegundam="namegundam"
                            value={namegundam}
                            onChange={(e) => setnamegundam(e.target.value)}
                        />)
                    } age:
                    {(idEdit !== task.id) ?
                        task.age :
                        (<input
                            class={styles.text}
                            type="text"
                            namegundam="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />)
                    }
                    <div class={styles.buttonContainer}>
                        <button
                            class={`${styles.button} ${styles.btnEdit}`}
                            onClick={() => editTask(task.id)}>
                            Edit
                       </button>
                        <button
                            class={`${styles.button} ${styles.btnDelete}`}
                            onClick={() => deleteTask(task.id)}>
                            Delete
                       </button>
                    </div>
                </li>))
    }

    const editTask = (id) => {
        setidEdit(id)
        let t = gundam.find((task) => +task.id === +id)
        console.log(t)
        setnamegundam(t.namegundam)
        if (+idEdit === +id) { //Press Edit again
            let newgundam = gundam.map((task, index) => {
                if (+task.id === +id) {
                    gundam[index].namegundam = namegundam
                    gundam[index].age = age
                }

                return task
            })
            setgundam(newgundam)
            setidEdit(0)
        }
    }

    const deleteTask = (id) => {
        console.log('delete id: ', id)
        let newgundam = gundam.filter((task) => task.id !== +id)
        setgundam(newgundam)
    }

    const addTask = (namegundam,age) => {
        if(namegundam.trim() == "" || age.trim() == "" ){
            alert("NOT NULL");
        }
        else if(gundam.length <= 9){
           setgundam([...gundam, { id: [gundam.length] <= 0 ? 1 : gundam[gundam.length - 1].id + 1, namegundam, age }])
        }
        else
        alert("ห้ามเกิน 10นะคับ")
        console.log(gundam)
    }

    return (
        <div class={styles.container}>
            <div class={styles.topRight}>
                <Link href="/"><a></a></Link>
            </div>
            <h1 class={styles.title}>

                <img src={avatar_url} width="80" />
               GUNDAM !! <span>{login} </span>

            </h1>

            <div class="addContainer">
                <input
                    class={styles.text}
                    type="text"
                    namegundam="addTask"
                    onChange={(e) => (setnamegundam(e.target.value))}
                />
                <input
                    class={styles.text}
                    type="number"
                    namegundam="addTask"
                    onChange={(e) => (setAge(e.target.value))}
                />
                <button
                    class={`${styles.button} ${styles.btnAdd}`}
                    onClick={() => addTask(namegundam,age)}>Add</button>
            </div>
            <ul class={styles.list}>
                {rendergundam()}
            </ul>
        </div>
    )
}

const getgundam = async () => {
    const res = await fetch('http://localhost:8000/')
    const json = await res.json()
    console.log(json)
    return json;
}



export default Todo