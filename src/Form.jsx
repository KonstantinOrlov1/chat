import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import "./styles.css";

export const Form = () => {
  const url = "ws://localhost:3001";

  const [data, setData] = useState({});
  const [showClientLoggedOut, setShowClientLoggedOut] = useState(false);

  const socket = useRef();
  const textareaField = useRef();

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
      const externalData = JSON.parse(event.data);
      console.log(externalData);

      // switch (externalData.type) {
      //   case "messege":
      //     createMessege(externalData.content, true);
      //     break;
      //   case "clientLoggedOut":
      //     setShowClientLoggedOut(true);

      //     setTimeout(setShowClientLoggedOut(false), 3000);
      // }
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const textareaElement = textareaField.current;
    const textareaValue = textareaElement.value;

    socket.current.send(textareaValue);
    createMessege(textareaValue, false);
    e.target.reset();
    return false;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea ref={textareaField}></textarea>
        <button type="submit">Сохранить сообщение</button>
      </form>
      <div className="chat">
        {Object.keys(data).map((id, index) => {
          return <Message {...data[id]} key={index} id={id} />;
        })}

        {showClientLoggedOut ? <div>Покинул чат</div> : null}
      </div>
    </>
  );
};
