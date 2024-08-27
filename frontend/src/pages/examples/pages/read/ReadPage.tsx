import { FC, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Collection, ReadModel } from "../../core/_models";
import { useParams } from "react-router-dom";
import { BackButton } from "../../../../components/button/BackButton";
import { ReadForm } from "../../components/forms/ReadForm";
import { useIntl } from "react-intl";
import { useFormatter } from "../../../../hooks/useFormatter";
import { getOneById } from "../../core/_requests";
import { useFormContext } from "react-hook-form";

const ReadPage: FC = () => {
  const params = useParams();
  const { id } = params;
  const { formatMessage } = useIntl();
  const { capitalizeFirstLetter } = useFormatter();
  const { setValue } = useFormContext();

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

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">
            {formatMessage({ id: "ACTION.READ" })}{" "}
            {capitalizeFirstLetter(Collection)}
          </h3>
        </div>
        <div className="card-body">
          <Form>
            <ReadForm collection={Collection} />
            <Form.Group className="mb-4 d-flex justify-content-end">
              <BackButton />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ReadPage;
