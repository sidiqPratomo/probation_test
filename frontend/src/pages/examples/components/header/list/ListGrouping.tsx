import { useQueryClient, useMutation } from 'react-query';
import { useListView } from '../../../core/ListViewProvider';
import { useQueryResponse } from '../../../core/QueryResponseProvider';
import { bulkSoftDelete } from '../../../core/_requests';
import { useResourceContext } from '../../../../../context/ResourceContext';
import { useModalContext } from '../../../../../context/ModalContext';
import { ActionTranslationLabel } from '../../../../../components/label/ActionTranslationLabel';

const ListGrouping = () => {
  const { selected, clearSelected } = useListView();
  const queryClient = useQueryClient();
  const { query, refetch } = useQueryResponse();
  const { collection } = useResourceContext();
  const modal = useModalContext();

  const deleteSelectedItems = useMutation(
    () => bulkSoftDelete(collection, selected),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`${query}`]);
        clearSelected();
        refetch();
      },
    }
  );

  const clickHandler = async () => {
    const title = 'Delete Item';
    const message = 'Are you sure want to delete this data?';
    const response = await modal.showConfirmation(title, message);
    if (response) {
      await deleteSelectedItems.mutateAsync();
      clearSelected();
    }
  };

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span>{' '}
        <ActionTranslationLabel name='selected' />
      </div>

      <button type='button' className='btn btn-danger' onClick={clickHandler}>
        <ActionTranslationLabel name='delete' />{' '}
        <ActionTranslationLabel name='selected' />
      </button>
    </div>
  );
};

export { ListGrouping };
