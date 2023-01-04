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
  // 2. deleteAll 모두 삭제 함수 만들기
  const deleteAll = () => {
    setTodoList([]); // todoList 리스트의 배열을 빈값으로 넣어주면 끝
  }
  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할 일 목록</h1>
                {/* 1. 모두 삭제 버튼 UI를 만들고 app.css 가서 스타일링 */}
                <button className="deleteBtn" onClick={deleteAll}>Delete All</button>
            </div>

            <Lists todoList={todoList} setTodoList={setTodoList}/> 
            <Form value={value} setValue={setValue} btnSubmit={btnSubmit}/>
        </div>
    </div>

  )
}