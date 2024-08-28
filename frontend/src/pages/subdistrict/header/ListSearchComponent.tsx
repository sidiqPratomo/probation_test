import { useState, useEffect } from 'react'
import { useQueryRequest } from '../core/QueryRequestProvider'
import { initialQueryState, useDebounce } from '../../../_metronic/helpers'

const ListSearchComponent = () => {
  const { updateState } = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 150)

  useEffect(() => {
    if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
      updateState({ search: debouncedSearchTerm, ...initialQueryState })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchTerm])

  return (
    <div className='card-title mb-0'>

      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1 '>
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control w-250px ps-14'
          placeholder='Search roles...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export { ListSearchComponent }
