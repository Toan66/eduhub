import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS cho Quill (theme snow)

const TextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (content) => {
    setText(content);
  };

  return (
    <div>
      <ReactQuill theme="snow" value={text} onChange={handleChange} />
    </div>
  );
};

export default TextEditor;