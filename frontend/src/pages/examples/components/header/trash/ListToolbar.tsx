import { useResourceContext } from '../../../../../context/ResourceContext';
import { Link } from 'react-router-dom';
import { ActionTranslationLabel } from '../../../../../components/label/ActionTranslationLabel';

const ListToolbar = () => {
  const { collection } = useResourceContext();

  return (
    <div
      className='d-flex justify-content-end'
      data-kt-user-table-toolbar='base'
    >
      <div className='d-flex justify-content-between align-items-center w-100'>
        <Link className='btn btn-primary' to={`/${collection}`}>
          <ActionTranslationLabel name='list' />
        </Link>
      </div>
    </div>
  );
};

export { ListToolbar };
