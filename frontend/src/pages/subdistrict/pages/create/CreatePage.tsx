import { FC, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { create } from "../../core/_requests";
import { Collection, Model } from "../../core/_models";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { InitialValue, Province } from "../../../../base_models";
import axios, { AxiosError } from "axios";
import { city } from "../../../../base_models/City";
import { useAllIsland } from "../../hooks/useGetIsland";
import { District, SUbdistrict } from "../../../../models/countries";

export const CreatePage: FC = () => {
  const [formValues] = useState<Province>(InitialValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Model>({ defaultValues: formValues });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [islandId, setIslandId] = useState<string | null>(null);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [cityId, setCityId] = useState<string | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);

  const backButton = () => {
    navigate(`/${Collection}`);
  };

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

  const onError: SubmitErrorHandler<Model> = (errors) => {
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: Model) => {
    try {
      setIsLoading(true);
      await create<SUbdistrict>(`${Collection}`, data).then((response) => {
        const { data } = response;
        if (data) {
          enqueueSnackbar("SubDistrict Created", {
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

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Create District</h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-4">
              <Form.Label>SubDistrict Name</Form.Label>
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
                  <option key={district.id} value={district.district_code}>
                    {district.name}
                  </option>
                ))}
              </Form.Select>
              <span className="text-danger pt-4">{errors.district_code?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-end">
              <Button variant="secondary" onClick={backButton}>
                Back
              </Button>
              <Button variant="primary" className="ms-4" type="submit" disabled={isLoading}>
                Submit {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};
