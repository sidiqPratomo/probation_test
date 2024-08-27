import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useFormatter } from '../../hooks/useFormatter';

interface Props {
  name: string;
}

export const TableTranslationLabel: FC<Props> = ({ name }) => {
  const { formatMessage } = useIntl();
  const { capitalizeWord } = useFormatter();

  return (
    <>
      {formatMessage({
        id: `TABLE.${capitalizeWord(name)}`,
      })}
    </>
  );
};
