import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import {get, update} from '../../core/_requests'
import {Model as RoleModel} from '../../../roles/core/_models'

type props = {
  data: Model
}

const EditPage: FC<props> = ({data}) => {
  const [role, setRole] = useState<RoleModel[]>([])
  const [selectedRole, setSelectedRole] = useState<string>('')

  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<Model>({defaultValues: data})

  const selrole = getValues(`role`)

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
  }, [data])

  useEffect(() => {
    if (selrole) setSelectedRole(selrole)
  }, [selrole])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await get('roles')
        const result = response.data.data.result as unknown as RoleModel[]
        setRole(result)
      } catch (e) {
        console.error(e)
      }
    }

    fetchRoles()
  }, []);

  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  }

  const onSubmit: SubmitHandler<Model> = async (data: Model, e: any) => {
    const rolename = data.role as string
    const roleList: string[] = []
    roleList.push(rolename)
    const {username, first_name, last_name, email, password} = data
    const payload = {
      username,
      first_name,
      last_name,
      email,
      password,
      role: roleList,
    }
    try {
      await update(`${Collection}`, data.id, payload).then((response) => {
        const {data} = response
        if (data) {
          enqueueSnackbar('Privilege Updated', {
            variant: 'success',
          })
        }
        navigate(`/${Collection}`)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Edit User</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-4'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                {...register('username', {required: 'Username is required'})}
              />
              <span className='text-danger pt-4'>{errors.username?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                {...register('first_name', {required: 'First name required'})}
              />
              <span className='text-danger pt-4'>{errors.first_name?.message}</span>
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
              <Form.Label>Role</Form.Label>
              <Form.Select
                {...register('role', {
                  required: 'Role is required',
                  onChange: (e) => {
                    const {value} = e.target
                    setSelectedRole(value)
                    return value
                  },
                })}
                value={selectedRole}
              >
                <option>Open this select menu</option>
                {role.map((entry, index) => {
                  return (
                    <option key={`role-select-${index}`} value={entry.code}>
                      {entry.name}
                    </option>

                    // Enable this if you using Laravel
                    // <option key={`role-select-${index}`} value={entry.id || ''}>
                    //   {entry.name}
                    // </option>
                  )
                })}
              </Form.Select>
              <span className='text-danger pt-4'>{errors.role?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4 d-flex justify-content-between'>
              <Button variant='secondary' onClick={backButton}>
                <i className="bi bi-chevron-left"></i> Back
              </Button>
              <Button variant='primary' className='ms-4' type='submit'>
                <i className="bi bi-check-lg"></i> Update
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditPage
