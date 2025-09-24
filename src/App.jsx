import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [columns, setColumns] = useState([[1, 2, 3, '+'], [4, 5, 6, '-'], [7, 8, 9, '*'], [0, "**", "/", "="], ["C"]]);
  const [result, setResult] = useState("");
  const [count, setCount] = useState([]);

  const inputRef = useRef();
  const countText = useRef();

  function clearAll(text, result){
    countText.current.textContent = text;
    inputRef.current.value = "";
    setCount([]);
    setResult(result);
  }

  const handleInput = (e) => {
    const value = e.target.value;
    if(value === "="){
      try {
        const operationResult = eval(`${count.join("")}`);
        if(!operationResult){
          clearAll("Operasi Invalid", "Invalid");
          return;
        }
        countText.current.textContent = count.join(" ") + " = " + operationResult;
        setResult(operationResult); 
      } catch (error) {
        clearAll("Operasi Invalid", "Invalid");
      }
      return;
    }

    if(value === "C"){
      clearAll("", "");
      return;
    }
    inputRef.current.value = value;
    setCount([...count, value]);
  }

  useEffect(() => {
    inputRef.current.value = result;
  }, [result]);

  useEffect(() => {
    countText.current.textContent = count.join(" ");
  }, [count]);

  return (
    <>
      <div>
          <h2>Kalkulator</h2>
          <input type="text" className='result' readOnly ref={inputRef} />
          <p ref={countText}></p>
          {
            columns.map((item, index) => (
              <div className='buttons' key={index}>
                {
                  item.map((data, index) => (
                    <button key={index} value={data} onClick={handleInput}>{data}</button>
                  ))
                }
              </div>
            ))
          }
      </div> 
    </>
  )
}

export default App
