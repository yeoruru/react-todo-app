import React from "react"; 

export default function App() {

  const listStyle = {
    padding:"10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: "none"
  }
  const btnStyle = {
    color:"#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  // 1. 할일 목록을 배열에 저장
  const todoList = [
    { id:"1", title:"공부하기",completed: true},
    { id:"2", title:"청소하기",completed: false}
  ]
  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할 일 목록</h1>
            </div>
            {/* 2. map() 메서드를 이용해 배열 내의 요소를 함수를 호출한 결과를 모아 새로운 배열을 반환 한다 
             -> 리스트가 여러개 일때 리액트가 변경, 또는 추가 제거 된 항목을 식별하는데 도움이 되도록  고유한 key값을 넣어줘야 한다 */}
            {todoList.map((data) => 
              <div style={listStyle} key={data.id}>
                <input type="checkbox" defaultChecked={false}/>
                {data.title}
                <button style={btnStyle}>X</button>
              </div>
            )}
        </div>
    </div>

  )
}