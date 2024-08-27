import { FC } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ActionTranslationLabel } from '../label/ActionTranslationLabel';

interface Props {
  isLoading: boolean;
}

export const SaveButton: FC<Props> = ({ isLoading }) => {
  return (
    <>
      <Button
        variant='primary'
        className='ms-4'
        type='submit'
        disabled={isLoading}
      >
        <i className="bi bi-floppy me-2 fs-4"></i>
        <ActionTranslationLabel name={'save'} />
        {isLoading && (
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          />
        )}
      </Button>
    </>
  );
};
