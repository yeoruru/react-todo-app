import React, { useState } from "react"; 
import Lists from "./components/Lists";

export default function App() {

  const [ todoList, setTodoList ] = useState([]);

  // 입력창 이벤트
  const textChange = (e) => {
    //console.log('e', e.target.value); 
    setValue(e.target.value); 
  } 
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

            {/* 3-3. <Lists 치면 맨윗줄에 경로가 자동으로 불러와진다 -> "./components/Lists"; */}
            {/* 3-4. todoList={todoList} 작성후 -> Lists.js 로 이동 */}
            {/* 5-2. setTodoList={setTodoList} 작성후 최종적으로 npm run start 아무 이상없이 작동 하는지 체크 */}
            <Lists todoList={todoList} setTodoList={setTodoList}/> 

            <form style={{display: 'flex'}} onSubmit={btnSubmit}>
            <input type="text" name="value" style={{flex: '10', padding: '5px'}} placeholder="해야 할 일을 입력하세요." onChange={textChange} value={value}/>
            <input type="submit"  value="입력" style={{flex: '1'}} />
            </form>
        </div>
    </div>

  )
}