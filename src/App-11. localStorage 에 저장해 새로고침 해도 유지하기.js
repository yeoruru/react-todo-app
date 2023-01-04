import React, { useState } from "react"; 
import Form from "./components/Form";
import Lists from "./components/Lists";

// 1-1. localStorage에 todoList 값을 담아서 페이지를 refresh 해도 todoList 계속 남아 있도록 해줄껀데
//      현재 DB가 없으니까 로컬스토리지로 브라우저 내에 키-값 형태로 저장한다
//      https://velog.io/@rmaomina/LocalStorage-setItem-getItem 로컬스토리지 설명참고 
//      localStorage.setItem('test', 1); -> localStorage에 저장하기
//      localStorage.getItem('test') -> localStorage에서 가져오기
//      JSON.stringify() -> localStorage에 저장시 JSON 메서드 stringify를 사용해 객체를 텍스트로 바꿔서 저장한다
//      JSON.parse() ->  stringify를 사용해 객체를 텍스트로 바꿔 저장한걸 localStorage에서 불러올 때 

// 방법은  State로 todoList 를 바꿔줄 때 마다  localStorage 에도 동시에 저장해준다 -> setTodoList(newTodoList); 이부분 찾아서 전부 수정 (1-7 까지)
// 1-2. Lists.js 로 이동

// 2-1. 1-7.까지는 저장해주는 과정이었고 마지막으로 localStorage에 저장된 todoList 를 가져와와서 활용 한다
// 2-2. 로컬스토리지 안에 todoList 키-값으로 저장된게 있다면 JSON.parse 로 todoList 를 가져오고 아니라면 빈값으로 둬라
const localTodoList = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];

export default function App() {
  // 2-3. localTodoList 를 todoList 안에 넣어주고 실행 해보면 
  // 2-4. 삭제/할일새로추가/모두 삭제 후 새로고침 하면 적용이 되지만 체크박스는 사라진다 그래서 Lists.js 에서 한가지 수정해준다 (2-5)
  const [ todoList, setTodoList ] = useState(localTodoList);
  const [ value, setValue ] = useState(""); 


  const btnSubmit = (e) => {
    
    e.preventDefault(); 

    let newTodo = { 
      id: Date.now(), 
      title: value, 
      completed: false, 
    }

    setTodoList(prev => [...prev, newTodo]); 
    // 1-6. 여기도 역시 localStorage 에도 저장 해주는데  위처럼 [...prev, newTodo] -> 즉 todoData + newTodo 가 되어야 한다
    localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
    setValue("");

  }

  const deleteAll = () => {
    setTodoList([]); 

    // 1-7. 여기는 모두 삭제 버튼이라 빈값으로 넣어준다
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