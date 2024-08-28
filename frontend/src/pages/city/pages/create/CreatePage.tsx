import {FC,  useEffect,  useState} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap'
import {create} from '../../core/_requests'
import {Collection, Model} from '../../core/_models'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import { InitialValue, Province } from '../../../../base_models'
import { City } from '../../../../models/countries'
import { useAllIsland } from '../../hooks/useGetIsland'
import axios, { AxiosError } from 'axios'

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
  const [islandId, setIslandId] = useState<string | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])

  const backButton = () => {
    navigate(`/${Collection}`);
  };
  
  const { data: islandData } = useAllIsland();
  const Islands = islandData?.data;

  useEffect(() => {
    const fetchProvinces = async () => {
      if (islandId) {
        try {
          const API_URL = import.meta.env.VITE_APP_API_BASE_URL || ''
          const API_VERSION = import.meta.env.VITE_APP_API_VERSION || 'api'
          const url = `${API_URL}/${API_VERSION}/province?island_id=${islandId}`
          const response = await axios.get(url)
          setProvinces(response.data.data)
        } catch (error) {
          console.error('Error fetching provinces:', error)
        }
      } else {
        setProvinces([]) // Reset provinces when no island is selected
      }
    }

    fetchProvinces()
  }, [islandId])

  const onError: SubmitErrorHandler<Model> = (errors) => {
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: Model) => {
    try {
      setIsLoading(true);
      await create<City>(`${Collection}`, data).then((response) => {
        const { data } = response;
        if (data) {
          enqueueSnackbar('Master Privileges Created', {
            variant: 'success',
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
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Create</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-4'>
              <Form.Label>City Name</Form.Label>
              <Form.Control
                type='text'
                {...register('name', { required: 'This is required' })}
              />
              <span className='text-danger pt-4'>{errors.name?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Region</Form.Label>
              <Form.Select
                onChange={(e) => setIslandId(e.target.value)}
              >
                <option value=''>Select Region</option>
                {Islands?.map((island: any) => (
                  <option key={island.id} value={island.id}>
                    {island.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Province</Form.Label>
              <Form.Select
                {...register('id_provinsi', { required: 'This is required' })}
                disabled={!islandId} // Disable province selection until a region is selected
              >
                <option value=''>Select Province</option>
                {provinces?.map((province: Province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
              <span className='text-danger pt-4'>{errors.id_provinsi?.message}</span>
            </Form.Group>            
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>
                Back
              </Button>
              <Button
                variant='primary'
                className='ms-4'
                type='submit'
                disabled={isLoading}
              >
                Submit{' '}
                {isLoading && (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                )}
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}
