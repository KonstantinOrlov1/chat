import { useSelector } from "react-redux";
import { selectMessegeModule } from "./store/messege/selectors";

export const List = () => {
  const messeges = useSelector(selectMessegeModule);

  // return (
  //   <div>
  //     {messeges.map((elem, index) => (
  //       <div key={index}>{elem}</div>
  //     ))}
  //   </div>
  // );
};
