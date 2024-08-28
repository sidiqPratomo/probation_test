import { Link } from 'react-router-dom'
import { useResourceContext } from '../../../context/ResourceContext'
import { useFormatter } from '../../../hooks/useFormatter'

const ListToolbar = () => {
  const { collection } = useResourceContext()
  const { capitalizeFirstLetter } = useFormatter()

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <ListFilter /> */}
      <Link className='btn btn-primary' to={`/subdistrict/create`}>
        <i className="bi bi-plus-lg"></i> Add {capitalizeFirstLetter(collection)}
      </Link>
    </div>
  )
}

export { ListToolbar }
