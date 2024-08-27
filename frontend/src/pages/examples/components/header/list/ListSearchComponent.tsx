import { useState, useEffect, FC } from 'react';
import { initialQueryState, useDebounce } from '../../../../../_metronic/helpers';
import { useQueryRequest } from '../../../core/QueryRequestProvider';
import { useFormatter } from '../../../../../hooks/useFormatter';
import { Collection } from '../../../core/_models';
import { useIntl } from 'react-intl';

const ListSearchComponent: FC = () => {
  const { updateState } = useQueryRequest();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { capitalizeFirstLetter } = useFormatter();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
      updateState({ search: debouncedSearchTerm, ...initialQueryState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchTerm]);

  return (
    <div className='card-title mb-0'>
      <div className='d-flex align-items-center position-relative my-1 '>
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control w-250px ps-14'
          placeholder={`${formatMessage({
            id: 'TABLE.SEARCH',
          })} ${capitalizeFirstLetter(Collection)}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export { ListSearchComponent };
