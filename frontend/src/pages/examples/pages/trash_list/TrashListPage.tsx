import { KTCard } from '../../../../_metronic/helpers';
import { ListHeader } from '../../components/header/trash/ListHeader';
import { Table } from '../../table/Table';

export const TrashListPage = () => {
  return (
    <>
      <KTCard>
        <ListHeader />
        <Table />
      </KTCard>
    </>
  );
};
