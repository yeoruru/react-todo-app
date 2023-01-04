import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

 export default function Lists({todoList , setTodoList}) {

  const btnClick = (id) => {
      let newTodoList = todoList.filter(data => data.id !== id)    
      console.log('newTodoList', newTodoList); 
      setTodoList(newTodoList);
      // 1-3. localStorage.setItem(); 을 이용해서 localStorage에 저장할때 JSON.stringify() 으로 객체를 텍스트로 바꿔서 저장 해준다
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const checkboxCompleted = (id) => { 
      let newTodoList = todoList.map(data => {
        if(data.id === id) {
          data.completed = !data.completed; 
        }
        return data;
      })
      console.log('newTodoList', newTodoList); 
      setTodoList(newTodoList);
      // 1-4. 동일하게 추가
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      
  };

  const handleEnd = (result) => { 

    console.log(result);

    if (!result.destination) return;

    const newTodoList = todoList;

    const [reorderedItem] = newTodoList.splice(result.source.index, 1);

    newTodoList.splice(result.destination.index, 0, reorderedItem);

    setTodoList(newTodoList);
    // 1-5. 동일하게 추가 -> app.js로 이동
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

   return (
     <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todoApp"> 
          {(provided) => ( 
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((data, index) => 
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided , snapshot) => (
                  <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "dragging" : undefined}>
                    <div className="list">    
                      {/* 2-5. defaultChecked={data.completed} false 대신 data.completed 값을 넣어준다 */}
                      <input type="checkbox" defaultChecked={data.completed} onChange={() => checkboxCompleted(data.id)}/>
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
 