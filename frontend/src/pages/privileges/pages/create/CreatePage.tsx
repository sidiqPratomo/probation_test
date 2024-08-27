import { FC, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { create } from '../../core/_requests';
import { Model, Collection } from '../../core/_models';
import { InitialValue, Privileges } from '../../../../models/privileges';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm, SubmitErrorHandler } from 'react-hook-form';

export const CreatePage: FC = () => {
  const [formValues] = useState<Model>(InitialValue);
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

  const onError: SubmitErrorHandler<Model> = (errors) => {
    console.error(errors);
  };

  const onSubmit: SubmitHandler<Model> = async (data: Model) => {
    try {
      setIsLoading(true);
      await create<Privileges>(`${Collection}`, data).then((response) => {
        const { data } = response;
        if (data) {
          enqueueSnackbar('Master Privileges Created', {
            variant: 'success',
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

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Create</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-4'>
              <Form.Label>Module</Form.Label>
              <Form.Control
                type='text'
                {...register('module', { required: 'This is required' })}
              />
              <span className='text-danger pt-4'>{errors.module?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Sub Module</Form.Label>
              <Form.Control
                type='text'
                {...register('submodule', {
                  required: 'This is required too',
                })}
              />
              <span className='text-danger'>{errors.submodule?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Ordering</Form.Label>
              <Form.Control type='text' {...register('ordering')} />
              <span className='text-danger pt-4'>
                {errors.ordering?.message}
              </span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Action</Form.Label>
              <Form.Control
                type='text'
                {...register('action', { required: 'Action required' })}
              />
              <span className='text-danger pt-4'>{errors.action?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Method</Form.Label>
              <Form.Control
                type='text'
                {...register('method', { required: 'Method required' })}
              />
              <span className='text-danger pt-4'>{errors.method?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>URI</Form.Label>
              <Form.Control
                type='text'
                {...register('uri', { required: 'URI required' })}
              />
              <span className='text-danger pt-4'>{errors.uri?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4 d-flex justify-content-between'>
              <Button variant='secondary' onClick={backButton}>
                Back
              </Button>
              <Button
                variant='primary'
                className='ms-4'
                type='submit'
                disabled={isLoading}
              >
                <i className="bi bi-check-lg"></i> Submit{' '}
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
  );
};
