import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuComponent } from '../../../../_metronic/assets/ts/components';
import { ID } from '../../../../_metronic/helpers';
import { ActionCellDelete } from './ActionCellDelete';
import { TableTranslationLabel } from '../../../../components/label/TableTranslationLabel';
import { ActionTranslationLabel } from '../../../../components/label/ActionTranslationLabel';
import { Collection } from '../../core/_models';

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
        <div className='menu-item px-3'>
          <Link className='menu-link px3' to={`/${Collection}/${id}/edit`}>
            <ActionTranslationLabel name='update' />
          </Link>
        </div>
        {/* end::Menu item */}

        <div className='menu-item px-3'>
          <Link className='menu-link px3' to={`/${Collection}/${id}`}>
            <ActionTranslationLabel name='read' />
          </Link>
        </div>

        {/* begin::Menu item */}
        <ActionCellDelete id={id} />
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { ActionsCell };
