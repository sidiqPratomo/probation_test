import { Column } from "react-table";
import { ColumnString } from "../../../../components/table/column/ColumnString";
import { ActionsCell } from "./ActionsCell";
import { CustomHeaderFieldTranslation } from "./CustomHeaderFieldTranslation";
import { Collection } from "../../core/_models";
import { CustomHeaderActionTranslation } from "./CustomHeaderActionTranslation";

const usersColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => (
      <CustomHeaderFieldTranslation
        tableProps={props}
        name="name_file"
        className="min-w-125px"
        collection={Collection}
      />
    ),
    id: "name_file",
    Cell: ({ ...props }) => {
      const entry = props.data[props.row.index];
      return <ColumnString value={entry["name_file"]} />;
    },
  },
  {
    Header: (props) => (
      <CustomHeaderActionTranslation
        tableProps={props}
        name="actions"
        className="text-end min-w-100px"
      />
    ),
    id: "actions",
    Cell: ({ ...props }) => <ActionsCell data={props.data[props.row.index]} />,
  },
];

export { usersColumns };
