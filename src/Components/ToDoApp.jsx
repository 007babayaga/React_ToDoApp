import { useState } from "react";
import "./ToDoApp.css";
const ToDoApp = ()=>{

    const[todo,setTodo] = useState(()=>{
        const oldtodoString = localStorage.getItem("todos");
        if(oldtodoString===null) return [];
        else{
        const oldtoDoArr = JSON.parse(oldtodoString);
        return oldtoDoArr;
        }
    });
    const[edit,setEdit] =  useState(-1);

    // >>>>>>>> Using a local Storage
    localStorage.setItem('todos',JSON.stringify(todo));

    const HandleSubmit = (e) =>{
        e.preventDefault();
        // const temp =[...todo];
        // temp.push({
        //     title:e.target.title.value,
        //     description:e.target.description.value,
        //     option:e.target.option.value,
        // })
        // setTodo(temp);
        // const temp =[...todo];
        // temp.push({
        //     title:e.target.title.value,
        //     description:e.target.description.value,
        //     option:e.target.option.value,
        // })
        // setTodo([...todo,{
        //     title:e.target.title.value,
        //     description:e.target.description.value,
        //     option:e.target.option.value,
        // }]);
        // setTodo([...todo,{
        //     title:e.target.title.value,
        //     description:e.target.description.value,
        //     option:e.target.option.value,
        // }]);

        // />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>-------<<<<<<<<<<<<<<<
        // best way to set to do using a callback

        // setTodo(()=>{
        //     return(
        //         [...todo,{
        //             title:e.target.title.value,
        //             description:e.target.description.value,
        //             option:e.target.option.value,
        //         }]
        //     )
        // })
        // Ye wale method se previous value Store ho jati hai
        // >>>pehle empty array tha []
        // setTodo((prev)=>{
        //     return(
        //         [...prev,{
        //             title:e.target.title.value,
        //             description:e.target.description.value,
        //             option:e.target.option.value,
        //         }]
        //     )
        // })
        // Iske Khatam hone ke bad ek array ke andar  [{}] ek object pehele se milega
        setTodo((prev)=>{
            return(
                [...prev,{ // [{},{}]
                    title:e.target.title.value,
                    description:e.target.description.value,
                    option:e.target.option.value,
                }]
            )
        })
        
    }
    const HandleDelete =(i)=>{
        setTodo((prev)=>{
            const temp = [...prev];
            temp.splice(i,1);
            return temp;
        })
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedTitle = e.target[0].value;
        const updatedDescription = e.target[1].value;
        const updatedPriority = e.target[2].value;

        setTodo((prev) => {
            const updatedTodos = [...prev];
            updatedTodos[edit] = {
                title: updatedTitle,
                description: updatedDescription,
                option: updatedPriority,
            };
            return updatedTodos;
        });
        setEdit(-1);
    };
    const HandleEditReset = ()=>{
        setEdit(-1);
    }

    return (
        <>
            <form onSubmit={HandleSubmit} className="to-do-conatiner">
                <div>
                    <label>Enter your title</label><br></br>
                    <input type="text" placeholder="Title" name="title" required/>
                </div>
                <div>
                    <label for="description">Description:</label><br></br>
                    <textarea id="description" name="description" rows="4" placeholder="Enter task details" required></textarea>
                </div>
                <div>
                <label>Priority</label>
                    <select required name="option">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    </select>
                </div>
                <button type="submit" className="add-button">Add</button>
            </form>
            <div className="to-do-card-container">
                {
                    todo.map((elem,idx)=>{
                        if(edit!==idx){
                            return(
                            <div className="to-do-card" key={idx}>
                        <h1>{elem.title}</h1>
                        <h3>{elem.description}</h3>
                        <h1>{elem.option}</h1>
                        <button onClick={()=>{HandleDelete(idx)}} className="delete-button">Delete</button> 
                        <button className="edit-button"onClick={()=>{setEdit(idx)}}>Edit</button>
                        </div>
                            )
                        }
                        else{
                            return(
                                <div className="to-do-card" key={idx}>
                                    <form onSubmit={handleEditSubmit} onReset={HandleEditReset}>
                                        <div>
                                        <label>Title:</label>
                                        <input defaultValue={elem.title}></input>
                                        </div>
                                        <div>
                                        <label>Description:</label>
                                        <input defaultValue={elem.description}></input>
                                        </div>
                                        <div>
                                        <label>Priorty:</label>
                                        <input defaultValue={elem.option}></input>
                                        </div>
                                        <button className="save-button" type="submit">Save</button>
                                        <button className="cancel-button" type="reset">Cancel</button>
                                    </form>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
    )
}
export{ToDoApp};