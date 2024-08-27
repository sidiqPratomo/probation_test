import ReadPage from "./ReadPage";
import { FC, useEffect } from "react";
import {
  Collection,
  ReadModel,
  initialValueReadModel,
} from "../../core/_models";
import { usePageData } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";
import { useFormatter } from "../../../../hooks/useFormatter";
import { FormProvider, useForm } from "react-hook-form";

const ReadWrapper: FC = () => {
  const { formatMessage } = useIntl();
  const { capitalizeFirstLetter } = useFormatter();
  const { setPageTitle } = usePageData();

  useEffect(() => {
    setPageTitle(
      `${formatMessage({ id: "ACTION.READ" })} ${capitalizeFirstLetter(
        Collection
      )}`
    );
  }, [setPageTitle, formatMessage, capitalizeFirstLetter]);

  const method = useForm<ReadModel>({
    defaultValues: initialValueReadModel,
  });

  return (
    <>
      <FormProvider {...method}>
        <ReadPage />
      </FormProvider>
    </>
  );
};

export default ReadWrapper;
