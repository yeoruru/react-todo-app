import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

 export default function Lists({todoList , setTodoList}) {

  // 1-1. 리액트 css 작성도 해봤으니 시작 전 클린한 코드를 위해 css 정리해 준다
  // 1-2. const btnStyle 과 const listStyle = (completed) 지워준다
  // 1-3. 밑에 리스트의 style={listStyle(data.completed)} 지우고  className="list" 추가
  // 1-4. {data.title} 은 span로 감싸준다
  // 1-5. 밑에 span에 할일 completed true 일때 span에 클래스명 .completed 추가해준다
  // 1-6. 버튼은 style={btnStyle} 도 지워주고 className="btn" 추가
  // 2-1. form.js 파일에도 인라인으로 해둔 스타일 css 지워주기
  // 3. 그다음 app.css 파일가서 새롭게 작성

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
        <Droppable droppableId="todoApp"> 
          {(provided) => ( 
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((data, index) => 
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided , snapshot) => (
                  <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <div className="list">
                      <input type="checkbox" defaultChecked={false} onChange={() => checkboxCompleted(data.id)}/>
                      {/* 1-5. list 클래스 할일 completed true 일때 span에 클래스명 .completed 추가해준다 */}
                      <span className={data.completed ? "completed" : undefined}>{data.title}</span>
                      <button className="btn" onClick={() => btnClick(data.id)}>X</button> 
                    </div>
                  </div>
                  )}
                </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      </DragDropContext>
     </div>
   )
 }
 