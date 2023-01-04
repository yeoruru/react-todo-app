import React, { useState } from "react"; 

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

  // 1-1. filter() 메서드를 사용해서 할 일 목록 지우기 (지울때 사용 / 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환)
  // 1-2. 밑에 button에도 onClick={() => btnClick(data.id) 추가 해주기
  const btnClick = (id) => { // 파라미터를 id 값을 가져온다 
    let newTodoList = todoList.filter(data => data.id !== id) // 아이디값이 일치할때 제거 해라
    
    console.log('newTodoList', newTodoList); // 1-3. 콘솔로 확인해 보면 삭제 버튼 누르면 콘솔에서의 배열에는 리스트가 지워진게 확인된다 

    setTodoList(newTodoList);// 1-4. 화면상에서도 삭제 되도록 State로 적용
  }
  
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
                <button style={btnStyle} onClick={() => btnClick(data.id)}>X</button> 
                {/* 1-2. onClick={() => btnClick(data.id)} 온클릭 이벤트 삭제 버튼에 추가 */}
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