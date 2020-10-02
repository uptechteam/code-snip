import React, { useState } from "react";
import logo from "./uptech_logo.svg";
import "./App.css";

const App = () => {
  const [output, setOutput] = useState<string>("");
  const [rawInput, setRawInput] = useState<string>("");
  const handleLeftPanelChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRawInput(event.target.value);
  };

  const handleProcessClick = () => {
    setOutput(processCode(rawInput));
  };

  return (
    <div className="app">
      <header className="header">
        <a href="https://uptech.team">
          <img src={logo} alt="Logo" />
        </a>
      </header>
      <div className="container">
        <div className="panels-container">
          <div className="panel">
            <h3 className="panel-title">Input</h3>
            <textarea
              wrap="off"
              value={rawInput}
              onChange={handleLeftPanelChange}
            />
          </div>
          <div className="process-button" onClick={handleProcessClick}>
            <span>Process</span>
          </div>
          <div className="panel">
            <h3 className="panel-title">Generated HTML</h3>
            <textarea readOnly={true} value={output} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const styles = `\
<style>
  .c01928312 {
    padding: 20px;
    background-color: rgb(242, 242, 242);
    text-transform: none;
  }
  .tc81203823 {
    font-family: Menlo, Monaco, “Courier New”, Courier, monospace;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: rgba(41, 41, 41, 1);
    letter-spacing: -0.022em;
    margin-top: -0.09em;
    margin-bottom: -0.09em;
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>\
`;

const processCode = (input: string) => {
  const splittedInput = input.split("\n");
  const codeLines = splittedInput.map((line, index) => {
    let isLastLine = index === splittedInput.length - 1;
    return wrapLineInHtml(line, isLastLine);
  });
  const joinedCodeLines = codeLines.join(" ");

  return `${styles}
<code>
  <div class="c01928312">
    ${joinedCodeLines}
  </div>
</code>`;
};

const wrapLineInHtml = (line: string, isLastLine: boolean) => {
  return `<span class="tc81203823">${line}${isLastLine ? "" : "<br />"}</span>`;
};
