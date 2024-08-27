import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import {InitialValue, UserResponse} from '../../../../models/users'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'
import {getOneById, getWithQueryString} from '../../core/_requests'
import {Model as RoleModel} from '../../../roles/core/_models'


const ReadPage: FC = () => {
  const params = useParams()
  const {id} = params
  const [formValues, setFormValues] = useState<Model>(InitialValue)

  const getRoleName = async (role: string[] | undefined) => {
    const defaultRole = role ? role[0] : '';
    const response = await getWithQueryString('roles', `code=${defaultRole}`);
    const [roleResult] = response.data.data.result as unknown as Array<RoleModel>;
    return roleResult?.name || defaultRole;
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await getOneById(Collection, id as string);
      const responseUser: UserResponse = response.data.data as any;
      const roleName = await getRoleName(responseUser.role);
      const initialValueResponse: Model = {
        ...responseUser,
        role: roleName,
      };
      setFormValues(initialValueResponse);
    };

    getUser();
  }, [id])
  const navigate = useNavigate()

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Read User</h3>
        </div>
        <div className='card-body'>
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' name='module' value={formValues.first_name} disabled />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' name='module' value={formValues.last_name} disabled />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' name='module' value={formValues.username} disabled />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='text' name='module' value={formValues.email} disabled />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Role</Form.Label>
              <Form.Control type='text' name='module' value={formValues.role} disabled />
            </Form.Group>
           
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>
                Back
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ReadPage