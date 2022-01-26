import { useState, useRef, useEffect } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  useEffect(() => {
    if(!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    }

  }, [value]);

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  }

  const handleClearClick = () => {
    const inputNode = inputRef.current;

    if(!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  }

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} accept="image/png, image/jpeg" ref={inputRef}/>
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  )

}

export default FileInput;