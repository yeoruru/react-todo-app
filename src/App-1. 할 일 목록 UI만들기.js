import React from "react"; // 1. 리액트 라이브러리 불러온다

// 2. 함수형 컨포넌트
export default function App() {

  // 4. 리스트 스타일 주기
  const listStyle = {
    padding:"10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: "none"
  }
  // 5. 버튼 스타일 주기
  const btnStyle = {
    color:"#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  //3. 내용시작 css 파일도 함께 작성
  return(
    <div className="container">
        <div className="todoBlock">
            <div className="title">
                <h1>할 일 목록</h1>
            </div>
            {/* 리스트 시작 */}
            <div style={listStyle}>
                <input type="checkbox" defaultChecked={false}/>
                공부하기
                <button  style={btnStyle}>X</button>
            </div>
            <div style={listStyle}>
                <input type="checkbox" defaultChecked={false}/>
                청소하기
                <button  style={btnStyle}>X</button>
            </div>
        </div>
    </div>

  )
}