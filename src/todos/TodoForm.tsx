import React, { FC, useState, ChangeEvent } from 'react';

type Props = {
  onSubmit: (text: string) => void;
};

const TodoForm: FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const changeText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const submit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Enter some text..."
        onChange={changeText}
      />
      <button onClick={submit}>Add</button>
    </>
  );
};

export default TodoForm;
