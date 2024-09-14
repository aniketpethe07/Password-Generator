import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState();
  const [btnText, setBtnText] = useState('copy');
  const [btnColor, setBtnColor] = useState(true);
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) {
        str += "0123456789";
      }
      if (characterAllowed) {
        str += "!@#$%^&*()_+{}-=[]";
      }
      for (let index = 0; index < length; index++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);

      
    }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    setBtnText("copied!");
    setBtnColor(false);
    setTimeout(() => {
      setBtnText("Copy");
      setBtnColor(true);
    }, 2000);
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4  my-8 text-orange-500 bg-gray-800">
        <h1 className="text-lg text-center text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 m-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            readOnly
            placeholder="Password"
            ref={passwordRef}
          />
          <button 
          className={`outline-none ${btnColor? "bg-blue-700":"bg-gray-700"} text-white px-3`}
          onClick={copyPasswordToClipboard}>
            {btnText}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={15}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
