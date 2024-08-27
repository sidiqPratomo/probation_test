import { useState } from "react";

interface ModalHooksProps {
  show: boolean
  setShow: (status: boolean) => void;
  onHide: () => void;
}

export const useModal = (): ModalHooksProps => {
  const [show, setShow] = useState<boolean>(false)

  const onHide = () => {
    setShow(false)
  }


  return {
    show,
    setShow,
    onHide
  }
}
