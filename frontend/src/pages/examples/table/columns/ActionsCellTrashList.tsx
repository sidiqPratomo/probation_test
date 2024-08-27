import { FC, useEffect } from 'react';
import { MenuComponent } from '../../../../_metronic/assets/ts/components';
import { ID } from '../../../../_metronic/helpers';
import { ActionCellRestore } from './ActionCellRestore';
import { ActionCellHardDelete } from './ActionCellHardDelete';
import { TableTranslationLabel } from '../../../../components/label/TableTranslationLabel';

type Props = {
  id: ID;
};

const ActionsCell: FC<Props> = ({ id }) => {
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <TableTranslationLabel name='actions' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <ActionCellRestore id={id} />
        <ActionCellHardDelete id={id} />
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { ActionsCell };
