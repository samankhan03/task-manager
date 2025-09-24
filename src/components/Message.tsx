import React from 'react';

interface Props {
  type: 'success' | 'error';
  text: string;
}

const Message: React.FC<Props> = ({ type, text }) => {
  return <p className={`message ${type}`}>{text}</p>;
};

export default Message;
