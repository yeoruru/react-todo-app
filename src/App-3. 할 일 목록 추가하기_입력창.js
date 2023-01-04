import React, { useState } from "react"; // 2-1. 리액트 hook의 기능중 useState를 라이브러리에서 가져온다

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

  const todoList = [
    { id:"1", title:"공부하기",completed: true},
    { id:"2", title:"청소하기",completed: false}
  ]


  // 1-4. 입력창에 입력한 내용이 변하는 이벤트 (1-3에 인풋에도 onChange={textChange} 넣어준다)
  const textChange = (e) => {
    //console.log('e', e.target.value); // 콘솔로 확인하면 입력한 값이 나오나 화면상의 변화는 없다 ( 확인 후 주석처리 )

    // 2-2. setValue 실행 타겟은 value ->입력한 value 값 넣어줌
    setValue(e.target.value); 
  } 

  // 2-1. 입력한 값이 화면상에서도 변해 리랜더링 되도록 State 를 이용한다 (맨위 첫번째줄 리액트 불러 오는곳도 수정)
  const [ value, setValue ] = useState(""); // 2-1. (1-3에 인풋에  value="" 빈 값 지우고 value={value} 넣어준다)
  /*  
  const [ value, setValue ] = useState([]);
  value ->  변수 이름
  setValue -> State를 정하는 함수
  */

  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할 일 목록</h1>
            </div>
            {todoList.map((data) => 
              <div style={listStyle} key={data.id}>
                <input type="checkbox" defaultChecked={false}/>
                {data.title}
                <button style={btnStyle}>X</button>
              </div>
            )}

            {/* 1-1. 할 일 목록 추가 하기 위해 입력창 만들기  */}
            {/* 1-2. form과 input text 생성 해준다*/}
            <form style={{display: 'flex'}}>
            {/* 1-3. input text의 value는 일단 빈값으로 해준다 그러면 입력 해보면 내용이 바뀌지 않음 value="" */}
            <input type="text" name="value" style={{flex: '10', padding: '5px'}} placeholder="해야 할 일을 입력하세요." onChange={textChange} value={value}/>
            </form>
        </div>
    </div>

  )
}