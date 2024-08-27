import { FC, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { create } from '../../core/_requests';
import { get } from '../../core/_requests';
import { Model, Collection } from '../../core/_models';
import { InitialValue } from '../../../../models/users';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm, SubmitErrorHandler } from 'react-hook-form';
import { Model as RoleModel } from '../../../roles/core/_models';

export const CreatePage: FC = () => {
  const [formValues] = useState<Model>(InitialValue);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Model>({ defaultValues: formValues });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [role, setRole] = useState<RoleModel[]>([]);

  const backButton = () => {
    navigate(`/${Collection}`);
  };

  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await get('roles');
        const result = response.data.data.result as unknown as RoleModel[];
        setRole(result);
      } catch (error) {
        console.error('Error while fetching roles');
      }
    };

    fetchRoles();
  }, []);

  const onSubmit: SubmitHandler<Model> = async (data: Model, e: any) => {
    const rolename = data.role;
    if (rolename) {
      const roleList: string[] = [];
      roleList.push(rolename);
      const { username, first_name, last_name, email, password } = data;
      const payload = {
        username,
        first_name,
        last_name,
        email,
        password,
        role: roleList,
      };

      try {
        await create(`${Collection}`, payload).then((response) => {
          const { data } = response;
          if (data) {
            enqueueSnackbar('User Created', {
              variant: 'success',
            });
          }
          navigate(`/${Collection}`);
        });
      } catch (e) {
        console.error(e);
      }
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                {...register('username', { required: 'Username is required' })}
              />
              <span className='text-danger pt-4'>
                {errors.username?.message}
              </span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                {...register('first_name', { required: 'First name required' })}
              />
              <span className='text-danger pt-4'>
                {errors.first_name?.message}
              </span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' {...register('last_name')} />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='input'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Email format is not match',
                  },
                })}
              />
              <span className='text-danger'>{errors.email?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                {...register('password', { required: 'Password is required' })}
              />
              <span className='text-danger pt-4'>
                {errors.password?.message}
              </span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                {...register('confirm_password', {
                  required: 'Confirm password is required',
                })}
              />
              <span className='text-danger pt-4'>
                {errors.confirm_password?.message}
              </span>
              {watch('confirm_password') !== watch('password') &&
              getValues('confirm_password') ? (
                <span className='text-danger pt-4'>
                  Password confirmation not match
                </span>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Role</Form.Label>
              <Form.Select
                {...register('role', {
                  required: 'Role is required',
                })}
              >
                <option>Open this select menu</option>
                {role.map((entry, index) => {
                  return (
                    <option
                      key={`role-select-${index}`}
                      value={entry.code as unknown as string}
                    >
                      {entry.name}
                    </option>

                    // if using laravel, enable this
                    // <option key={`role-select-${index}`} value={entry.id as unknown as string}>
                    //   {entry.name}
                    // </option>
                  );
                })}
              </Form.Select>
              <span className='text-danger pt-4'>{errors.role?.message}</span>
            </Form.Group>

            <Form.Group className='mb-4 d-flex justify-content-between'>
              <Button variant='secondary' onClick={backButton}>
                <i className="bi bi-chevron-left"></i> Back
              </Button>
              <Button variant='primary' className='ms-4' type='submit'>
                <i className="bi bi-check-lg"></i> Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};
