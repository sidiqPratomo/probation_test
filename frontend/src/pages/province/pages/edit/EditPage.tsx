import { FC, useState, useEffect } from "react";
import { Model, Collection } from "../../core/_models";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { update } from "../../core/_requests";
import { useParams } from "react-router";
import { useAllIsland } from "../../hooks/useGetIsland";
import { Province } from "../../../../base_models";

type props = {
  data: Province;
};

const EditPage: FC<props> = ({ data }) => {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Province>({ defaultValues: data });

  const { data: islandData } = useAllIsland();
  const Islands = islandData?.data;

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onError: SubmitErrorHandler<Province> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: Province) => {
    try {
      const payload = {
        name: data.name,
        island_id: data.island_id,
      };
      setIsLoading(true);
      await update(`${Collection}`, id, payload).then((response) => {
        const { data } = response;
        if (data) {
          enqueueSnackbar("Role Updated", {
            variant: "success",
          });
        }
        navigate(`/${Collection}`);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const backButton = () => {
    navigate(`/${Collection}`);
  };

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Edit Province</h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-4">
              <Form.Label>City Name</Form.Label>
              <Form.Control type="text" {...register("name", { required: "This is required" })} />
              <span className="text-danger pt-4">{errors.name?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Region</Form.Label>
              <Form.Select {...register('island_id', { required: 'This is required' })}>
                <option value=''>Select Region</option>
                {Islands?.map((island:any) => (
                  <option key={island.id} value={island.id}>
                    {island.name}
                  </option>
                ))}
              </Form.Select>
              <span className='text-danger pt-4'>{errors.island_id?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-between">
              <Button variant="secondary" onClick={backButton}>
                Back
              </Button>
              <Button variant="primary" className="ms-4" type="submit" disabled={isLoading}>
                <i className="bi bi-check-lg"></i> Update{" "}
                {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditPage;
