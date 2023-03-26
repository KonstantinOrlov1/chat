import React, { useEffect, useRef, useState } from "react";
import { Exit } from "./Exit";
import { Message } from "./Message";
import "./styles.css";

export const Form = () => {
  const url = "ws://localhost:3001";

  const [data, setData] = useState({});
  const [exit, setExit] = useState({});

  const socket = useRef();
  const textareaField = useRef();

  const createExit = (text) => {
    const id = Date.now();

    setExit((v) => ({
      ...v,
      [id]: text,
    }));
  };

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

      switch (externalData.type) {
        case "message":
          createMessege(externalData.content, true);
          break;
        case "clientLoggedOut":
          createExit(externalData.content);
          break;
        default:
          createMessege("Неизвестное значение", true);
      }
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

      <div className="container">
        <div className="chat">
          {Object.keys(data).map((id, index) => {
            return <Message {...data[id]} key={index} id={id} />;
          })}
        </div>

        {Object.keys(exit).length === 0 ? null : (
          <div className="exit_container">
            {Object.keys(exit).map((id, index) => {
              return <Exit text={exit[id]} key={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};
