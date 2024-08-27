import { FC, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ID } from '../../../../_metronic/helpers';
import { MenuComponent } from '../../../../_metronic/assets/ts/components';
import { useQueryResponse } from '../../core/QueryResponseProvider';
import { softDelete } from '../../core/_requests';
import { Collection } from '../../core/_models';
import { useModalContext } from '../../../../context/ModalContext';
import { useSnackbar } from 'notistack';
import { useListView } from '../../core/ListViewProvider';
import { ActionTranslationLabel } from '../../../../components/label/ActionTranslationLabel';
import { useIntl } from 'react-intl';

type Props = {
  id: ID;
};

const ActionCellDelete: FC<Props> = ({ id }) => {
  const { query, refetch } = useQueryResponse();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const modal = useModalContext();
  const { clearSelected } = useListView();
  const { formatMessage } = useIntl();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const deleteItem = useMutation(() => softDelete(Collection, id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${Collection}-${query}`]);
      enqueueSnackbar(
        formatMessage({
          id: `ACTION.MODAL.DELETE.SUCCESS`,
        }),
        {
          variant: 'success',
        }
      );
      refetch();
    },
  });

  const clickHandler = async () => {
    const title = formatMessage({
      id: `ACTION.MODAL.DELETE.TITLE`,
    });
    const message = formatMessage({
      id: `ACTION.MODAL.DELETE.MESSAGE`,
    });
    const response = await modal.showConfirmation(title, message);
    if (response) {
      await deleteItem.mutateAsync();
      clearSelected();
    }
  };

  return (
    <>
      {/* begin::Menu item */}
      <div className='menu-item px-3'>
        <a
          className='menu-link px-3'
          data-kt-users-table-filter='delete_row'
          onClick={clickHandler}
        >
          <ActionTranslationLabel name='delete' />
        </a>
      </div>
    </>
  );
};

export { ActionCellDelete };
