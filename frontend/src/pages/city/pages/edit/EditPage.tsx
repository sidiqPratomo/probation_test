import { FC, useState, useEffect } from "react";
import { Model, Collection } from "../../core/_models";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { update } from "../../core/_requests";
import { useParams } from "react-router";
import { City } from "../../../../models/countries";
import { useAllIsland } from "../../hooks/useGetIsland";
import { Province } from "../../../../base_models";
import axios, { AxiosError } from "axios";

type props = {
  data: City;
};

const EditPage: FC<props> = ({ data }) => {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [islandId, setIslandId] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<City>({ defaultValues: data });

  const { data: islandData } = useAllIsland();
  const Islands = islandData?.data;

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
        const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "api";
        const url = islandId
          ? `${API_URL}/${API_VERSION}/province?island_id=${islandId}`
          : `${API_URL}/${API_VERSION}/province`; // Fetch all provinces if no island_id is selected
        
        const response = await axios.get(url);
        setProvinces(response.data.data);

        // Find and set the selected province name
        const idProvince = parseInt(data.id_provinsi)
        const selectedProvince = response.data.data.find(
          (province: Province) => province.id === idProvince
        );
        if (selectedProvince) {
          setSelectedProvinceName(selectedProvince.name);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, [islandId, data.id_provinsi]); 

  const onError: SubmitErrorHandler<City> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: City) => {
    try {
      const payload = {
        name: data.name,
        id_provinsi: data.id_provinsi,
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
    } catch (error) {
      const { response } = error as AxiosError<{ message: string }>;
      enqueueSnackbar(response?.data.message, {
        variant: "warning",
      });
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
          <h3 className="card-title">Edit District</h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-4">
              <Form.Label>City Name</Form.Label>
              <Form.Control type="text" {...register("name", { required: "This is required" })} />
              <span className="text-danger pt-4">{errors.name?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Region</Form.Label>
              <Form.Select onChange={(e) => setIslandId(e.target.value)}>
                <option value="">Select Region</option>
                {Islands?.map((island: any) => (
                  <option key={island.id} value={island.id}>
                    {island.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Province</Form.Label>
              <Form.Select
                {...register("id_provinsi", { required: "This is required" })}
                disabled={!islandId} // Disable province selection until a region is selected
              >
                <option value={data.id_provinsi}>{selectedProvinceName || 'select province'}</option>
                {provinces?.map((province: Province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
              <span className="text-danger pt-4">{errors.id_provinsi?.message}</span>
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
