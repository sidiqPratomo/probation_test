import { FC, useState, useEffect } from "react";
import { Model, Collection } from "../../core/_models";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { update } from "../../core/_requests";
import { useParams } from "react-router";
import { Province } from "../../../../base_models";
import axios, { AxiosError } from "axios";
import { District, SUbdistrict } from "../../../../models/countries";
import { city } from "../../../../base_models/City";
import { useAllIsland } from "../../hooks/useGetIsland";

type props = {
  data: SUbdistrict;
};

const EditPage: FC<props> = ({ data }) => {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [islandId, setIslandId] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SUbdistrict>({ defaultValues: data });

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const { data: islandData } = useAllIsland();
  const Islands = islandData?.data;

  useEffect(() => {
    const fetchProvinces = async () => {
      if (islandId) {
        try {
          const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
          const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "api";
          const url = `${API_URL}/${API_VERSION}/province?island_id=${islandId}`;
          const response = await axios.get(url);
          setProvinces(response.data.data);
        } catch (error) {
          console.error("Error fetching provinces:", error);
        }
      } else {
        setProvinces([]); // Reset provinces when no island is selected
      }
    };

    fetchProvinces();
  }, [islandId]);

  useEffect(() => {
    const fetchCities = async () => {
      if (provinceId) {
        try {
          const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
          const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "api";
          const url = `${API_URL}/${API_VERSION}/city?id_provinsi=${provinceId}`;
          const response = await axios.get(url);
          setCities(response.data.data);
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      } else {
        setCities([]); // Reset provinces when no island is selected
      }
    };

    fetchCities();
  }, [provinceId]);

  useEffect(() => {
    const fetchDistrict = async () => {
      if (cityId) {
        try {
          const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
          const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "api";
          const url = `${API_URL}/${API_VERSION}/district?city_code=${cityId}`;
          const response = await axios.get(url);
          setDistricts(response.data.data);
        } catch (error) {
          console.error("Error fetching city:", error);
        }
      } else {
        setCities([]); // Reset provinces when no island is selected
      }
    };

    fetchDistrict();
  }, [cityId]);

  const onError: SubmitErrorHandler<District> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: SUbdistrict) => {
    try {
      const payload = {
        name: data.name,
        district_code: data.district_code,
        subdistrict_code: data.subdistrict_code
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
              <Form.Label>District Name</Form.Label>
              <Form.Control type="text" {...register("name", { required: "This is required" })} />
              <span className="text-danger pt-4">{errors.name?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>SubDistrict Code</Form.Label>
              <Form.Control type="text" {...register("subdistrict_code", { required: "This is required" })} />
              <span className="text-danger pt-4">{errors.subdistrict_code?.message}</span>
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
              <Form.Select disabled={!islandId} onChange={(e) => setProvinceId(e.target.value)}>
                <option value="">Select Province</option>
                {provinces?.map((province: Province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>City</Form.Label>
              <Form.Select onChange={(e) => setCityId(e.target.value)}
                disabled={!islandId || !provinceId}
              >
                <option value="">Select City</option>
                {cities?.map((city: city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>District</Form.Label>
              <Form.Select
                {...register("district_code", { required: "This is required" })}
                disabled={!islandId || !provinceId}
              >
                <option value="">Select District</option>
                {districts?.map((district: District) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </Form.Select>
              <span className="text-danger pt-4">{errors.district_code?.message}</span>
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
