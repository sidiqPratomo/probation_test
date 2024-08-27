import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useModal } from '../hooks/useModal';
import { useIntl } from 'react-intl';

interface ModalContextProps {
  showConfirmation: (title: string, message: string) => Promise<boolean>;
}

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalContentProps {
  title: string;
  message: string;
  onCancel: () => void;
  cancelText: string;
  onConfirm: () => void;
  confirmText: string;
  cancelVariantButton: string;
  confirmVariantButton: string;
}

const ModalContent: FC<ModalContentProps> = ({
  title,
  message,
  onCancel,
  cancelText = 'Cancel',
  onConfirm,
  confirmText = 'Submit',
  cancelVariantButton = 'secondary',
  confirmVariantButton = 'confirmVariantButton',
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelVariantButton} onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant={confirmVariantButton} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </>
  );
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const { setShow, show, onHide } = useModal();
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const resolver = useRef<((value: boolean) => void) | null>(null);
  const { formatMessage } = useIntl();

  const showConfirmation = (
    title: string,
    message: string
  ): Promise<boolean> => {
    setModalContent({
      title,
      message,
    });
    setShow(true);
    resolver.current = (resolve) => resolve; // Placeholder for resolver
    return new Promise((resolve) => (resolver.current = resolve));
  };

  const handleConfirm = () => {
    resolver.current?.(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current?.(false);
    onHide();
  };

  const modalContext: ModalContextProps = {
    showConfirmation,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}

      {modalContent && (
        <Modal centered show={show} onHide={handleCancel}>
          <ModalContent
            title={modalContent.title}
            message={modalContent.message}
            onCancel={handleCancel}
            cancelText={formatMessage({
              id: `ACTION.CANCEL`,
            })}
            onConfirm={handleConfirm}
            confirmText={formatMessage({
              id: `ACTION.CONFIRM`,
            })}
            cancelVariantButton='secondary'
            confirmVariantButton='danger'
          />
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

const useModalContext = (): ModalContextProps => useContext(ModalContext);

export { useModalContext, ModalContextProvider };
