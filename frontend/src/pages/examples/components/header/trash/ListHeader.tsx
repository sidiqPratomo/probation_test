import { useListView } from '../../../core/ListViewProvider';
import { ListToolbar } from './ListToolbar';
import { ListGrouping } from './ListGrouping';
import { FC } from 'react';
import { useFormatter } from '../../../../../hooks/useFormatter';
import { Collection } from '../../../core/_models';
import { ActionTranslationLabel } from '../../../../../components/label/ActionTranslationLabel';

const ListHeader: FC = () => {
  const { selected } = useListView();
  const { capitalizeFirstLetter } = useFormatter();

  return (
    <div className='card-header border-0 pt-6 d-flex align-items-center'>
      <h3>
        <ActionTranslationLabel name='trash' />{' '}
        {capitalizeFirstLetter(Collection)}
      </h3>

      <div className='card-toolbar'>
        {selected.length > 0 ? <ListGrouping /> : <ListToolbar />}
      </div>
    </div>
  );
};

export { ListHeader };
