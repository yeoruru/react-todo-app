// 1. Form.js 파일 생성
// 2. rfc -> 단축키로 함수형 컴포넌트 생성

import React from 'react'

// 4-1. 빨간 밑줄 에러 뜨는 form 컨포넌트에 필요한 스테이트 함수와 데이터들을 app.js 에서 props로 내려받는다 (value / btnSubmit / setValue)
// 4-2. app.js로 이동
export default function Form({value , btnSubmit , setValue}) {

  // 3-2. 필요한 함수 가져오기 (textChange)
  const textChange = (e) => {
    //console.log('e', e.target.value); 
    setValue(e.target.value); 
  } 

  return (
    <div>
        {/* 3-1. form 해당하는 ui 부분을 div 안에 가져온다 */}
        <form style={{display: 'flex'}} onSubmit={btnSubmit}>
          <input type="text" name="value" style={{flex: '10', padding: '5px'}} placeholder="해야 할 일을 입력하세요." onChange={textChange} value={value}/>
          <input type="submit"  value="입력" style={{flex: '1'}} />
        </form>      
    </div>
  )
}
