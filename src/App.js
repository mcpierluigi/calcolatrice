import React, { useState } from "react";
import "./App.css";
import * as math from "mathjs";

function App() {
  const [expression, setExpression] = useState("");
  const [screenVal, setScreenVal] = useState("");
  const [customVariables, setCustomVariables] = useState({});
  // Default mode: "rad"
  const [mode, setMode] = useState("rad");

  function handleChange(e) {
    setExpression(e.target.value);
  }

  function handleClick(input) {
    setExpression(prevExpression => prevExpression + input);
  }

  function calculate() {
    try {
      const allVariables = {
        ...customVariables,
        pi: Math.PI,
        e: Math.E,
        // Fattoriale
        fact: math.factorial,
        sin: mode === "rad" ? Math.sin : math.sin,
        cos: mode === "rad" ? Math.cos : math.cos,
        tan: mode === "rad" ? Math.tan : math.tan,
        asin: mode === "rad" ? Math.asin : math.asin,
        acos: mode === "rad" ? Math.acos : math.acos,
        atan: mode === "rad" ? Math.atan : math.atan
      };

      const result = math.evaluate(expression, allVariables);
      if (typeof result === "number" && !isNaN(result)) {
        setScreenVal(Number(result));
      } else {
        setScreenVal("Espressione non valida");
      }
    } catch (error) {
      setScreenVal("Espressione non valida");
    }
  }

  function clearScreen() {
    setExpression("");
    setScreenVal("");
  }

  function backspace() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }

  return (
    <>
      <div className="App">
        <div className="calc-body">
          <h1>Calcolatrice</h1>
          <div className="input-section">
            <input className="screen" type="text" value={expression} onChange={handleChange} />
            <div className="output">risultato: {screenVal}</div>
          </div>
          <div className="button-section">
            <div className="numeric-pad">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(input => (
                <button key={input} onClick={() => handleClick(input)}>
                  {input}
                </button>
              ))}
              <button onClick={() => handleClick(".")}>,</button>
            </div>
            <div className="operators">
              {[
                "+",
                "-",
                "*",
                "/",
                "^",
                "sin(",
                "cos(",
                "tan(",
                "sqrt(",
                "cbrt(",
                "asin(",
                "acos(",
                "atan(",
                "(",
                ")"
              ].map(input => (
                <button key={input} onClick={() => handleClick(input)}>
                  {input}
                </button>
              ))}

              <button onClick={() => handleClick("pi")}>π</button>
              <button onClick={() => handleClick("fact(")}>!</button>
            </div>
            <div className="control-buttons">
              <button className="clear-button" onClick={clearScreen}>
                CA
              </button>
              <button className="equals-button" onClick={calculate}>
                =
              </button>
              <button className="backspace-button" onClick={backspace}>
                del
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
