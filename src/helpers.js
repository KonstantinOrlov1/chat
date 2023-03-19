const createElement = (data) => {
  let messageElem = document.createElement("div");
  messageElem.textContent = data;
  return messageElem;
};

export const renderServer = (data) => {
  const messageElem = createElement(data);
  document.querySelector("#chat").append(messageElem);
};

export const renderClient = (data) => {
  const messageElem = createElement(data);
  messageElem.style.color = "red";
  document.querySelector("#chat").append(messageElem);
};
