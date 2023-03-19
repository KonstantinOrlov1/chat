import { Provider } from "react-redux";
import { Form } from "./Form";
import { List } from "./List";
import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
};
