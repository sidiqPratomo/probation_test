import { KTCard } from '../../../../_metronic/helpers';
import { ListHeader } from '../../components/header/list/ListHeader';
import { Table } from '../../table/Table';

export const ListPage = () => {
  return (
    <>
      <KTCard>
        <ListHeader />
        <Table />
      </KTCard>
    </>
  );
};
