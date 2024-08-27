import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MenuComponent } from '../../../../_metronic/assets/ts/components'
import { ID } from '../../../../_metronic/helpers'
import { ActionCellDelete } from './ActionCellDelete'

type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({ id }) => {

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link className='menu-link px3' to={`/roles/${id}/edit`}>
            Edit
          </Link>
        </div>
        {/* end::Menu item */}

        <div className='menu-item px-3'>
          <Link className='menu-link px3' to={`/roles/${id}`}>
            Read
          </Link>
        </div>

        {/* begin::Menu item */}
        <ActionCellDelete id={id} />
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export { ActionsCell }

