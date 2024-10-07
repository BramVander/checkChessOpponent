import styled from "styled-components";
import {createPortal} from "react-dom";
import {cloneElement, createContext, useContext, useState} from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: #f3f4f6;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: #6b7280;
    stroke: #6b7280; */
    color: #6b7280;
  }
`;

// 1) create context
const ModalContext = createContext();

// 2) create parent component
function Modal({children}) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return <ModalContext.Provider value={{openName, close, open}}>
    {children}
  </ModalContext.Provider>
}

// 3) create child component(s)
function Open({children, opens: opensWindowName}) {
  console.log('opennwindowsname', opensWindowName);
  const {open} = useContext(ModalContext);

  return cloneElement(children, {onClick: () => open(opensWindowName)});
}

// 3) create child component(s)
function Window({children, name }) {
  const {openName, close} = useContext(ModalContext);

  if(name !== openName) return null;

  return createPortal(
  <Overlay>
    <StyledModal>
      <Button onClick={close}>
        <p>someicon</p>
      </Button>

      <div>{cloneElement(children, {onCloseModal: close})}</div>
    </StyledModal>
  </Overlay>, document.body
  )
}

// 4) add child components as properties on parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal
