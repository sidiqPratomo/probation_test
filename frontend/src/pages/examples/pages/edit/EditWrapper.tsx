import EditPage from "./EditPage";
import { FC, useEffect } from "react";
import {
  Collection,
  UpdateModel,
  initialValueUpdateModel,
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
      `${formatMessage({ id: "ACTION.UPDATE" })} ${capitalizeFirstLetter(
        Collection
      )}`
    );
  }, [setPageTitle, formatMessage, capitalizeFirstLetter]);

  const method = useForm<UpdateModel>({
    defaultValues: initialValueUpdateModel,
  });

  return (
    <>
      <FormProvider {...method}>
        <EditPage />
      </FormProvider>
    </>
  );
};

export default ReadWrapper;
