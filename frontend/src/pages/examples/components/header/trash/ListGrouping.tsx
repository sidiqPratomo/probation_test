import { useQueryClient, useMutation } from 'react-query';
import { useListView } from '../../../core/ListViewProvider';
import { useQueryResponse } from '../../../core/QueryResponseProvider';
import { bulkHardDelete } from '../../../core/_requests';
import { useResourceContext } from '../../../../../context/ResourceContext';
import { useModalContext } from '../../../../../context/ModalContext';
import { ActionTranslationLabel } from '../../../../../components/label/ActionTranslationLabel';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

const ListGrouping = () => {
  const { selected, clearSelected } = useListView();
  const queryClient = useQueryClient();
  const { query, refetch } = useQueryResponse();
  const { collection } = useResourceContext();
  const modal = useModalContext();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const deleteSelectedItems = useMutation(
    () => bulkHardDelete(collection, selected),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`${query}`]);
        clearSelected();
        enqueueSnackbar(
          formatMessage({
            id: `ACTION.MODAL.HARD_DELETE.SUCCESS`,
          }),
          {
            variant: 'success',
          }
        );
        refetch();
      },
    }
  );

  const clickHandler = async () => {
    const title = formatMessage({
      id: `ACTION.MODAL.HARD_DELETE.TITLE`,
    });
    const message = formatMessage({
      id: `ACTION.MODAL.HARD_DELETE.MESSAGE`,
    });
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
