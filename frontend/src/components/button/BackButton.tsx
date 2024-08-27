import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ActionTranslationLabel } from '../label/ActionTranslationLabel';

export const BackButton: FC = () => {
  const navigate = useNavigate();
  const handler = () => {
    navigate(-1);
  };
  return (
    <>
      <Button variant='secondary' onClick={handler}>
        <i className="bi bi-arrow-left fs-3"></i>
        <ActionTranslationLabel name={'back'} />
      </Button>
    </>
  );
};
