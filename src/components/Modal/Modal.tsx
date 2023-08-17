import { PropsWithChildren, useEffect } from "react";

import { Observer } from "mobx-react-lite";
import { createPortal } from "react-dom";

import { LuX } from "react-icons/lu";

import useOutsideClick from "../../hooks/useOutsideClick";
import { useStore } from "../../stores/store";

import "./Modal.scss";

const modalElement = document.getElementById("modal") as HTMLElement;

function Modal({ children }: PropsWithChildren) {
  const { modalStore } = useStore();

  const ref = useOutsideClick(() => modalStore.setModalData(null));

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? modalStore.setModalData(null) : null;

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const portal = (
    <Observer>
      {() =>
        modalStore.modalData ? (
          <div className="Modal">
            <div ref={ref} className="Modal__Content">
              <button
                onClick={() => modalStore.setModalData(null)}
                className="Modal__CloseButton"
              >
                <LuX className="Modal__CloseButtonIcon" />
              </button>
              {children}
            </div>
          </div>
        ) : null
      }
    </Observer>
  );

  return createPortal(portal, modalElement);
}

export default Modal;
