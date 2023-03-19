import { useEffect, useRef, useState } from "react";
import styles from "./styles.css";

export const Message = ({ id, text, external }) => {
  return (
    <div className="message">
      <div className={external ? "left" : "rigth"}>
        <div>{new Date(+id).toISOString()}</div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export const Form = () => {
  const url = "ws://localhost:3001";

  const [data, setData] = useState({});

  const socket = useRef();

  const createMessege = (text, external) => {
    let id = Date.now();
    setData((v) => ({
      ...v,
      [id]: {
        text,
        external,
      },
    }));
  };

  useEffect(() => {
    socket.current = new WebSocket(url);
    socket.current.onmessage = (event) => {
      createMessege(event.data, true);
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const textareaValue = e.target.querySelector("textarea").value;
    socket.current.send(textareaValue);

    createMessege(textareaValue, false);

    e.target.reset();
    return false;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea></textarea>
        <button type="submit">Сохранить сообщение</button>
      </form>
      <div className="chat">
        {Object.keys(data).map((id, index) => {
          return <Message {...data[id]} key={index} id={id} />;
        })}
      </div>
    </>
  );
};
