import React, { useState } from "react"; 
import Form from "./components/Form";
import Lists from "./components/Lists";

const localTodoList = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];

export default function App() {

  const [ todoList, setTodoList ] = useState(localTodoList);
  const [ value, setValue ] = useState(""); 


  const btnSubmit = (e) => {
    
    e.preventDefault(); 

    let newTodo = { 
      id: Date.now(), 
      title: value, 
      completed: false, 
    }

    // 1-1. 인풋 텍스트에 빈값을 넣고 할일 추가 해도 할일 리스트가 추가 되는게 별로 안이쁘다 그래서 if문으로 감싸서 빈값일땐 alert 띄워준다
    if (value.trim().length !== 0) { // 1-2. value가 trim()으로 공백을 제거하고도 length 길이가 0 불일치 한다면
      setTodoList(prev => [...prev, newTodo]); 
      localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
      setValue("");
    } else { // 1-3. 0 일치 한다면 (빈값이면) alert 띄워준다 
      alert("해야 할 일을 입력하세요.");
    }
    // 1-4. 빈값인 상태에서 입력 눌렀을때 alert 뜨면 성공! 수업끝!
  }

  const deleteAll = () => {
    setTodoList([]); 
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  
  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할일 목록</h1>
                <button className="deleteBtn" onClick={deleteAll}>Delete All</button>
            </div>
              <Lists todoList={todoList} setTodoList={setTodoList}/>
              <Form value={value} setValue={setValue} btnSubmit={btnSubmit}/>
        </div>
    </div>

  )
}