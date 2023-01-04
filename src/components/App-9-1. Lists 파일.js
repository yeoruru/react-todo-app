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
      {/* 1-1. API 사용을 위한 틀을 잡아준다 작성하는 대로 맨 윗줄에 자동으로 import 된다
          -> import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd' */}
      {/* 1-2. DragDropContext -> Drag and drop을 사용하고자 하는 어플리케이션의 영역을 감싸는 Wrapper 이다 */}
      <DragDropContext>
        {/* 1-3. Droppable -> Drag and drop에서 drop을 할 수 있는 영역이자 Draggable을 감싸는 Wrapper 이다 */}
        <Droppable droppableId="todoApp"> 
              {todoList.map((data) => 
              /* 1-4. Draggable -> Drag and Drop의 주체가 되는, Drag가 가능한 컴포넌트를 감싸는 Wrapper 입니다.
                직접 드래그를 해줄 리스트를 <Draggable> 로 감싸준다 */
                <Draggable>
                  <div style={listStyle(data.completed)} key={data.id}>
                    <input type="checkbox" defaultChecked={false} onChange={() => checkboxCompleted(data.id)}/>
                    {data.title}
                    <button style={btnStyle} onClick={() => btnClick(data.id)}>X</button> 
                  </div>
                </Draggable>
              )}
          </Droppable>
      </DragDropContext>
     </div>
   )
 }
 