import React, { useState } from "react"; 

export default function App() {

  // 1-1. 체크박스 밑줄 처리 위해서 completed 체크해서 기존 listStyle 변경을 함수처럼 변경 해주기 
  // 밑에 리스트도 {listStyle(data.completed)} 로 변경해준다
  const listStyle = (completed) => { // 파라미터를 배열에 있는 completed 값을 가져온다
    return {
      padding:"10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none" //조건부 삼항 연산자 completed 가 true 일때 line-through(선 처리) 아닐때 none
      // 조건부 삼항 연산자 : if문을 한줄의 코드로 작성함
    }
  }

  const btnStyle = {
    color:"#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

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

  // 삭제 버튼 이벤트
  const btnClick = (id) => {
    let newTodoList = todoList.filter(data => data.id !== id)    
    console.log('newTodoList', newTodoList); 
    setTodoList(newTodoList);
  }

  // 1-2. 완료한일 체크박스 선 처리 (체크박스에도  온체인지 이벤트 onChange={() => checkboxCompleted(data.id) 추가 해주기)
  const checkboxCompleted = (id) => { // 파라미터를 id 값을 가져온다
    let newTodoList = todoList.map(data => {
      if(data.id === id) { // 어떤 id가 클릭이 됐는지
        data.completed = !data.completed; // true / false 각각 반대로 변경해 준다
      }
      return data;
    })
    setTodoList(newTodoList); // 적용
  }

  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할 일 목록</h1>
            </div>
            {todoList.map((data) => 
              <div style={listStyle(data.completed)} key={data.id}>
                <input type="checkbox" defaultChecked={false} onChange={() => checkboxCompleted(data.id)}/>
                {data.title}
                <button style={btnStyle} onClick={() => btnClick(data.id)}>X</button> 
              </div>
            )}

            <form style={{display: 'flex'}} onSubmit={btnSubmit}>
            <input type="text" name="value" style={{flex: '10', padding: '5px'}} placeholder="해야 할 일을 입력하세요." onChange={textChange} value={value}/>
            <input type="submit"  value="입력" style={{flex: '1'}} />
            </form>
        </div>
    </div>

  )
}