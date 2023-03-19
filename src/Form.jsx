import { renderClient, renderServer } from "./helpers";

export const Form = () => {
  const url = "ws://localhost:3001";
  let socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";

  socket.onmessage = (event) => {
    const data = event.data;
    renderServer(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const textareaValue = e.target.querySelector("textarea").value;
    socket.send(textareaValue);
    renderClient(textareaValue);

    e.target.reset();
    return false;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea></textarea>
        <button type="submit">Сохранить сообщение</button>
      </form>
      <div id="chat"></div>
    </>
  );
};
