import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

 export default function Lists({todoList , setTodoList}) {

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

  // 2-2. handleEnd 함수
  const handleEnd = (result) => { // result 를 매개변수로 가져온다 

    // 2-3. result 에는 드래그를 한 대상, 그 대상의 위치와, 등 드래그 이벤트에 대한 정보가 포함된다 
    //      드래그 해서 위치 바꿔보고 콘솔로 확인 해보기 (9-4. Lists 파일 참고 이미지 확인)
    //      source - 현재 드래그중인 아이템의 정보 (원래 위치) / destination - 드래그가 끝난 후 드래그중이였던 아이템의 정보 (바뀐 위치)
    console.log(result);

    // 2-4. 바뀌는 위치 즉 목적지가 없으면 이 함수를 종료한다 (이벤트 취소)
    if (!result.destination) return;

    // 2-5. newTodoList 변수 만들고
    const newTodoList = todoList;

    // 2-6. splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다
    //      splice() 메서드를 이용해 위치를 변경시키는 아이템을 배열에서 삭제 해준다 -> (result.source.index, 1) 원래 위치(index) 1개를 지워준다
    //      reorderedItem -> 그 지워준 아이템의 index 정보를 reorderedItem 에 저장한다
    const [reorderedItem] = newTodoList.splice(result.source.index, 1);

    // 2-7. 변경되는 자리에 reorderedItem을 넣어준다
    newTodoList.splice(result.destination.index, 0, reorderedItem);

    // 2-8. state 로 적용해준다
    setTodoList(newTodoList);
  };

   return (
     <div>
      {/* 2-1. 드래깅 한 후 데이터 순서 적용하기 
      onDragEnd = {} 드래그가 끝나는 시점에 발동되는 함수로 라이브러리에서 제공되는 함수이다
      그안에 handleEnd 함수를 만들어 드래그가 끝났을때 순서가 저장 되도록 해준다 */}
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todoApp"> 
          {(provided) => ( 
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((data, index) => 
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided , snapshot) => (
                  // 1. snapshot 함수 이용해서 드래깅이 트루일때 .dragging 붙여주고 app.css 가서 추가
                  <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "dragging" : undefined}>
                    <div className="list">
                      <input type="checkbox" defaultChecked={false} onChange={() => checkboxCompleted(data.id)}/>
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
 