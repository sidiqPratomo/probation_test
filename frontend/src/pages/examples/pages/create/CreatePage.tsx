import { FC, useState } from "react";
import { Form } from "react-bootstrap";
import { create } from "../../core/_requests";
import { CreateModel, Collection } from "../../core/_models";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import {
  SubmitHandler,
  SubmitErrorHandler,
  useFormContext,
} from "react-hook-form";
import { useIntl } from "react-intl";
import { BackButton } from "../../../../components/button/BackButton";
import { SaveButton } from "../../../../components/button/SaveButton";
import { CreateForm } from "../../components/forms/CreateForm";
import { useFormatter } from "../../../../hooks/useFormatter";

export const CreatePage: FC = () => {
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, reset } = useFormContext<CreateModel>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { capitalizeFirstLetter } = useFormatter();

  const onError: SubmitErrorHandler<CreateModel> = (error: any) => {
    console.log(error);
  };

  const onSubmit: SubmitHandler<CreateModel> = async (data: CreateModel) => {
    try {
      setIsLoading(true);
      await create<CreateModel>(`${Collection}`, data).then((response) => {
        const { data } = response;
        if (data) {
          enqueueSnackbar(`${capitalizeFirstLetter(Collection)} created`, {
            variant: "success",
          });
        }
        reset();
        navigate(`/${Collection}`);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">
            {formatMessage({ id: "ACTION.CREATE" })}{" "}
            {capitalizeFirstLetter(Collection)}
          </h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <CreateForm collection={Collection} />
            <Form.Group className="mb-4 d-flex justify-content-between">
              <BackButton />
              <SaveButton isLoading={isLoading} />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};
