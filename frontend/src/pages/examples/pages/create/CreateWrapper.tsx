import { FC, useEffect } from "react";
import { CreatePage } from "./CreatePage";
import { usePageData } from "../../../../_metronic/layout/core";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateModel,
  Collection,
  initialValueAddModel,
} from "../../core/_models";
import { useIntl } from "react-intl";
import { useFormatter } from "../../../../hooks/useFormatter";

export const CreateWrapper: FC = () => {
  const { formatMessage } = useIntl();
  const { capitalizeFirstLetter } = useFormatter();
  const { setPageTitle } = usePageData();

  useEffect(() => {
    setPageTitle(
      `${formatMessage({ id: "ACTION.CREATE" })} ${capitalizeFirstLetter(
        Collection
      )}`
    );
  }, [setPageTitle, formatMessage, capitalizeFirstLetter]);

  const method = useForm<CreateModel>({
    defaultValues: initialValueAddModel,
  });

  return (
    <>
      <FormProvider {...method}>
        <CreatePage />
      </FormProvider>
    </>
  );
};
