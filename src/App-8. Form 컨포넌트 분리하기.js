import React, { useState } from "react"; 
import Form from "./components/Form";
import Lists from "./components/Lists";

export default function App() {

  const [ todoList, setTodoList ] = useState([]);
  const [ value, setValue ] = useState(""); 

  // 입력버튼 이벤트
  const btnSubmit = (e) => {
    
    e.preventDefault(); 

    let newTodo = { 
      id: Date.now(), 
      title: value, 
      completed: false, 
    }

    setTodoList(prev => [...prev, newTodo]); 
    setValue("");

  }

  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할 일 목록</h1>
            </div>

            <Lists todoList={todoList} setTodoList={setTodoList}/> 

            {/* 4-3. <Form 치면 자동으로 맨윗줄에에 경로를 불러와진다 -> "./components/Form"; */}
            {/* 4-4. value={value} setValue={setValue} btnSubmit={btnSubmit}  props로 내려주고 결과물 확인 */}
            <Form value={value} setValue={setValue} btnSubmit={btnSubmit}/>
        </div>
    </div>

  )
}