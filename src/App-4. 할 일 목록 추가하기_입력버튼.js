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

  // 1-1. 할 일 목록을 추가 하고 결과물에 영향을 주어 리랜더링 되도록 State 를 이용
  const [ todoList, setTodoList ] = useState([ //  todoList ->  변수 이름 , setTodoList -> State를 정하는 함수
      // 먼저 작성해둔 리스트들은 이제 지워도 된다
  ]);

  const textChange = (e) => {
    //console.log('e', e.target.value); 
    setValue(e.target.value); 
  } 

  const [ value, setValue ] = useState(""); 

// 1-3. 입력 버튼 누르면  할 일 목록 추가 & 입력창 내용 지우기 이벤트
  const btnSubmit = (e) => {
    
    e.preventDefault(); // 1-4. form 안에 input을 전송할 때 클릭시 페이지 새로고침 방지

    // 1-5. 새로운 할 일 데이터 생성
    let newTodo = { 
      id: Date.now(), // 고유한 id 값으로 Date.now() 를 넣어준다 ( Date.now() 메소드는 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환함 )
      title: value, // 입력하는 값 value 를 title 에 넣어준다
      completed: false, // 할 일 아직 완료되지 않았으니 체크 박스는 false
    }
    // 1-6. 새로운 할 일 목록 추가 (전개 연산자 이용)
    // 전개 연산자 -> 특정 객체 또는 배열의 값을 가른 객체나 배열로 복제 하거나 옮길때 사용 (연산자 모양 -> ...)
    setTodoList(prev => [...prev, newTodo]); // 즉 원래 있던 todoList 할 일 목록에 새로운 할 일 목록인 배열을 복제 해준다

    // 1-7. 이제 할 일 목록이 추가 되니까 마지막으로 입력창에 글씨 지워주기 (value: "")
    setValue("");

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
                <button style={btnStyle}>X</button>
              </div>
            )}

            <form style={{display: 'flex'}} onSubmit={btnSubmit}>
            <input type="text" name="value" style={{flex: '10', padding: '5px'}} placeholder="해야 할 일을 입력하세요." onChange={textChange} value={value}/>
            {/* 1-2. 입력한 내용을 할 일 목록에 추가하기 위해 입력 버튼 만들기 */}
            {/* 1-2. 버튼 만든 후  form 안에 input을 전송하기 위해  onSubmit={btnSubmit} 추가 */}
            <input type="submit"  value="입력" style={{flex: '1'}} />
            </form>
        </div>
    </div>

  )
}