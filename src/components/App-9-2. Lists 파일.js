import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

 export default function Lists({todoList , setTodoList}) {

  const btnStyle = {
    color:"#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }
  
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

   return (
     <div>
      <DragDropContext>
        {/* 
              설명!
              
              드랍이 올바르게 작동하기 위해 provided (프로바이디드) 함수를 이용해서 
              드랍하는 요소에 innerRef (이너레프) 와 droppableProps (드롭퍼블프랍스) 정보를 제공해야 한다.

              provided.droppableProps -> 데이터의 스타일 지정 및 조회에 사용하는 속성이 포함되어 있고
              provided.innerRef ->  정보를 제공하고 직접적으로 DOM 에 접근한다
              
              쉽게 말해서 리스트를 드래그해서 드랍하는것을 정보 전달하고 적용하는 것이다
              지금은 뭐가 뭔지 복잡하겠지만 swiper 플러그인 같은것 처럼 구조 잡아주고 옵션 추가하고 그런느낌으로 생각하기.
              이런 기능들도 구글에 다양하게 있기 때문에 끌어다 쓰고 하다보면 익숙해진다

              1-1. 결론적으로 <Droppable> 안에 {(provided) => ()} 로 전체를 감싸주고 그안에 div 감싸준다
              1-2. 그다음 그 div 에 정보 제공하고 추가 해주기 위해  
                  <div {...provided.droppableProps} ref={provided.innerRef}> 해준다  

              * 전개 연산자 -> 특정 객체 또는 배열의 값을 가른 객체나 배열로 복제 하거나 옮길때 사용 (연산자 모양 -> ...)
                   
          */}
        <Droppable droppableId="todoApp"> 
          {(provided) => ( 
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((data, index) => 
              // 2-1. Draggable 드래그 해주는것 역시 provided 함수를 이용해서 데이터 전달을 위해  정보 제공을 해줘야 한다 
              //      key={data.id} ->직접 드래그 하는 요소마다 고유한 키값 (id) 넣어준다
              //      draggableId={data.id.toString()} -> 드래그하는 요소 id로 키값의 내용 String으로 가져와서 넣어준다
              //      index={index} -> 번호 매겨주기위에 인덱스도 넣어준다 (위에 todoList.map() 안에도 index 값 넣어준다)
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {/* 2-2. Draggable 도 똑같이 <Draggable> 안에 {(provided) => ()} 전체 감싸준다 
                      추가적으로 끌어줄때 스타일 변경을 위해 snapshot 함수도 추가 해준다 */}
                  {(provided , snapshot) => (
                  // 2-3. 1-2와 똑같이 div에 정보 제공 하기 위해  div으로 감싸주고
                  // {...provided.draggableProps} ref={provided.innerRef}  해준다
                  // {...provided.dragHandleProps} -> 이건 드래그 기능을 위해 추가
                  <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                  {/* 
                    2-4. 지금 실행하고 리스트를 드래그 했을때 움직이긴 하지만 저장이 안되고 디자인이 일그러진다
                    2-5. 만약 오타 없이 작성하고 실행했을때 빨간 에러 표시가 난다면 인프런 드래그앤드랍 에러일때 강의 보고!
                    index.js 열어서   <React.StrictMode></React.StrictMode> 제거해준다
                  */}
                    <div style={listStyle(data.completed)}>
                      <input type="checkbox" defaultChecked={false} onChange={() => checkboxCompleted(data.id)}/>
                      {data.title}
                      <button style={btnStyle} onClick={() => btnClick(data.id)}>X</button> 
                    </div>
                  </div>
                  )}
                </Draggable>
                )}
                {/* 2-6. 실행이 잘되면 리스트를 드래그 하나를 하면 그 빈공간이 사라져버려서 레이아웃이 망가진다 
                    그래서 div 닫는 태그 바로 위에 {provided.placeholder} 작성해서 빈공간을 마련해준다 */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      </DragDropContext>
     </div>
   )
 }
 