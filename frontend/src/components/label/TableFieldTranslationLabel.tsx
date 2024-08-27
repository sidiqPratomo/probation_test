import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormatter } from "../../hooks/useFormatter";

interface Props {
  collection: string;
  name: string;
  sortStatus?: "1" | "-1" | undefined;
}

export const TableFieldTranslationLabel: FC<Props> = ({
  collection,
  name,
  sortStatus = undefined,
}) => {
  const { formatMessage } = useIntl();
  const { capitalizeWord } = useFormatter();

  return (
    <div className="d-flex align-items-center gap-2">
      {formatMessage({
        id: `TABLE.${capitalizeWord(collection)}.${capitalizeWord(name)}`,
      })}
      {sortStatus !== undefined ? (
        sortStatus === "1" ? (
          <i className="bi bi-sort-up fs-4"></i>
        ) : (
          <i className="bi bi-sort-down fs-4"></i>
        )
      ) : (
        <i className="bi bi-filter fs-4"></i>
      )}
    </div>
  );
};
