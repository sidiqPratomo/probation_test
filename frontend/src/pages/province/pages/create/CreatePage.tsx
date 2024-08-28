import {FC,  useState} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap'
import {create} from '../../core/_requests'
import {Collection, Model} from '../../core/_models'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import { InitialValue, Province } from '../../../../base_models'
import { useAllIsland } from '../../hooks/useGetIsland'
import { AxiosError } from 'axios'

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

  const backButton = () => {
    navigate(`/${Collection}`);
  };

  const { data: islandData } = useAllIsland();
  const Islands = islandData?.data;

  const onError: SubmitErrorHandler<Model> = (errors) => {
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: Model) => {
    try {
      setIsLoading(true);
      await create<Province>(`${Collection}`, data).then((response) => {
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
              <Form.Label>Province Name</Form.Label>
              <Form.Control
                type='text'
                {...register('name', { required: 'This is required' })}
              />
              <span className='text-danger pt-4'>{errors.name?.message}</span>
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
