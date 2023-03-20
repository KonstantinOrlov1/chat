import "./styles.css";

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
