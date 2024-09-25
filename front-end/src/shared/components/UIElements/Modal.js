import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  return (
    <React.Fragment>
      {/* {props.show && <Backdrop onClick={props.onCancel} />} */}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="my-modal"
      >
        <div className="my-modal-background" onClick={props.onCancel}>
          <div className={`my-modal ${props.className}`} style={props.style}>
            {/* <header className={`my-modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header> */}
            <form
              onSubmit={
                props.onSubmit
                  ? props.onSubmit
                  : (event) => event.preventDefault()
              }
            >
              <div className={`my-modal__content ${props.contentClass}`}>
                {props.children}
              </div>
              <footer className={`my-modal__footer ${props.footerClass}`}>
                {props.footer}
              </footer>
            </form>
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
