// 1. rfc -> 단축키로 함수형 컴포넌트 생성 Lists() -> 괄호 비워둔채로 시작

 import React from 'react'
 
// 3-5. todoList 내려받은것 써주기 -> Lists({todoList})
// 5-3. setTodoList 내려받은것 써주기  -> List({todoList , setTodoList})
 export default function Lists({todoList , setTodoList}) {

  // 2-2. ui를 가져온뒤 btnStyle 가져오기
  const btnStyle = {
    color:"#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  // 4. 나머지 필요한 함수들 가져온다 (listStyle / btnClick / checkboxCompleted)
  
  const listStyle = (completed) => { 
    return {
      padding:"10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }
  const btnClick = (id) => {
      let newTodoList = todoList.filter(data => data.id !== id)    
      console.log('newTodoList', newTodoList); 
      setTodoList(newTodoList);
  }

  const checkboxCompleted = (id) => { 
      let newTodoList = todoList.map(data => {
        if(data.id === id) {
          data.completed = !data.completed; 
        }
        return data;
      })
      setTodoList(newTodoList); 
  }

  /* 5-1. 마지막으로 남은 빨간밑줄 에러표시인 setTodoList 를 해결하기 위해
    todoList 데이터를 업데이트 시켜주는 setTodoList 스테이트 함수도 가져와야한다 아까 처럼 동일하게 app.js 에서 props로 내려받기 */
  // 5-2. app.js로 이동

   return (
     <div>
      {/* 2-1. list에 해당하는 ui 부분을 div 안에 먼저 가져오기 (컨트롤+X 로 app.js 에서는 지워주면서 가져온다) 
       -> 가져오게 되면 빨간 밑줄로 에러표시들이 뜨니까 하나하나 해결한다 */}
            {todoList.map((data) => 
              <div style={listStyle(data.completed)} key={data.id}>
                <input type="checkbox" defaultChecked={false} onChange={() => checkboxCompleted(data.id)}/>
                {data.title}
                <button style={btnStyle} onClick={() => btnClick(data.id)}>X</button> 
              </div>
            )}
        {/* 3-1. todoList 에 해당하는 필요한 State 함수를 가져와야 하는데 -> const [ todoList, setTodoList ] = useState([]);
          여기서 todoList 는 리스트 컴포넌트 뿐만 아니라 입력창이나 X버튼 등 다른부분에도 사용이 되기 때문에
          그대로 가져오기보단 app.js에서 props를 이용해서 컴포넌트에 todoList 데이터를 내려 받는다*/}
        {/* 3-2. app.js로 이동 */}
     </div>
   )
 }
 