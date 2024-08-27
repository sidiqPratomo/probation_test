import { FC, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { RoleRequest } from '../../../../models/roles'
import { Collection } from '../../core/_models'
import { useGetPrivileges } from '../../hooks/useGetPrivileges'

type props = {
  data: RoleRequest
}

const ReadPage: FC<props> = ({data}) => {
  const [privilegeOptions, setPrivilegeOptions] = useState<Array<any>>([]);
  const { formattedPrivileges } = useGetPrivileges();
  const {
    register,
    setValue,
  } = useForm<RoleRequest>({defaultValues: data})

  // useEffect(() => {
  //   getOneById(Collection, id).then((response) => {

  //     setFormValues({...formValues, ...(response.data as any)})
  //   })
  // }, [])

  useEffect(() => {
    async function getFetchPrivilege() {
      const response = await formattedPrivileges();
      const {data} = response?.data;
      if (data) {
        // setChecklist(data);
        const privilegeOptionsMapping = Object.values(data as object).map((entries) => {
          const { name, mapping } = entries;
          return {
            name,
            mapping: Object.values(mapping as object).map((entry) => {
              const { action, uri, method } = entry;
              return {
                label: action,
                value: uri.concat("|", method),
              };
            }),
          };
        });

        setPrivilegeOptions(privilegeOptionsMapping)
      }
    }

    getFetchPrivilege();
    
    setValue('name', data.name);
    setValue('privilege', data.privilege);
    
  }, [data, formattedPrivileges, setValue])

  const navigate = useNavigate()

  const backButton = () => {
    navigate(`/${Collection}`);
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Read Privilege</h3>
        </div>
        <div className='card-body'>
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type='text'
                {...register('name')}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Row>
                {privilegeOptions.map((entry, index) => {
                  const {name, mapping} = entry;
                  return (
                    <Col lg={4} className={'mb-5'} key={index}>
                      <Row className={'align-items-start'}>
                        <Col lg={12} className={'font-weight-bold mb-5'}>{name}</Col>
                        <Col lg={12}>
                          {mapping.map((data: any, index: any) => {
                            const {label, value} = data;
                            return (
                              <Form.Check 
                                {...register('privilege')}
                                type={'checkbox'}
                                label={label}
                                value={value}
                                className={'mb-5'}
                                key={index}
                                readOnly
                              />
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
                  )
                })}
              </Row>
            </Form.Group>
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>Back</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ReadPage
