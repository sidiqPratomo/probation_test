import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Collection, ReadModel, UpdateModel } from "../../core/_models";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../../../../components/button/BackButton";
import { EditForm } from "../../components/forms/EditForm";
import { useIntl } from "react-intl";
import { useFormatter } from "../../../../hooks/useFormatter";
import { getOneById, update } from "../../core/_requests";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { SaveButton } from "../../../../components/button/SaveButton";
import { useSnackbar } from "notistack";

const ReadPage: FC = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, reset } = useFormContext<UpdateModel>();
  const { formatMessage } = useIntl();
  const { capitalizeFirstLetter } = useFormatter();
  const { setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneById<ReadModel>(Collection, id as string);
        const result = response.data.data;

        Object.entries(result).forEach(([name, value]) => {
          setValue(name, value);
        });
      } catch (error) {
        console.error("There is error while fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onError: SubmitErrorHandler<UpdateModel> = () => {};
  const onSubmit: SubmitHandler<UpdateModel> = async (data: UpdateModel) => {
    try {
      setIsLoading(true);
      await update<UpdateModel>(id, data).then((response) => {
        const { data } = response;
        if (data) {
          enqueueSnackbar(`${capitalizeFirstLetter(Collection)} updated`, {
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
            {formatMessage({ id: "ACTION.UPDATE" })}{" "}
            {capitalizeFirstLetter(Collection)}
          </h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <EditForm collection={Collection} />
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

export default ReadPage;
