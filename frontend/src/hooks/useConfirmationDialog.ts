import { useState } from 'react';

interface props {
  show: boolean,
  setShow: (value: boolean) => void;
  onHide: () => void;
}

const useConfirmationDialog = () :props => {
  const [show, setShow] = useState(false)

  const handleOnHide = () => {
    setShow(false)
  }

  return {
    show,
    setShow,
    onHide: handleOnHide
  }
}

export { useConfirmationDialog }