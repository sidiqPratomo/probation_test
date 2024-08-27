import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useFormatter } from '../../hooks/useFormatter';

interface Props {
  collection: string;
  name: string;
}

export const FormFieldTranslationLabel: FC<Props> = ({ collection, name }) => {
  const { formatMessage } = useIntl();
  const { capitalizeWord } = useFormatter();

  return (
    <>
      {formatMessage({
        id: `FORM.${capitalizeWord(collection)}.${capitalizeWord(name)}`,
      })}
    </>
  );
};
