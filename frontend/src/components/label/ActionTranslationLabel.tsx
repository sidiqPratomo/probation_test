import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useFormatter } from '../../hooks/useFormatter';

interface Props {
  name: string;
}

export const ActionTranslationLabel: FC<Props> = ({ name }) => {
  const { formatMessage } = useIntl();
  const { capitalizeWord } = useFormatter();

  return (
    <>
      {formatMessage({
        id: `ACTION.${capitalizeWord(name)}`,
      })}
    </>
  );
};
