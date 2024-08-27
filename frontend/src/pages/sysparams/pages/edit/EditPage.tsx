import {FC, useEffect, useState} from 'react'
import {Model, Collection} from '../../core/_models'
import {Button, Form, Spinner} from 'react-bootstrap'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import {update} from '../../core/_requests'
import { Sysparam } from '../../../../models/sysparams'

type props = {
  data: Model
}

const EditPage: FC<props> = ({data}) => {
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<Model>({defaultValues: data})

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onError: SubmitErrorHandler<Model> = (errors: any) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
    console.error(errors)
  }

  const onSubmit: SubmitHandler<Model> = async (data: Model) => {
    try {
      setIsLoading(true)
      await update<Sysparam>(`${Collection}`, data.id, data).then((response) => {
        const {data} = response
        if (data) {
          enqueueSnackbar('Sysparam Updated', {
            variant: 'success',
          })
        }
        navigate(`/${Collection}`)
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Edit Sysparams</h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-4">
              <Form.Label>Group</Form.Label>
              <Form.Control
                type="text"
                {...register('group', {
                  required: 'Groups required',
                })}
              />
              <span className="text-danger pt-4">{errors.group?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="text"
                {...register('key', {
                  required: 'Key required',
                })}
              />
              <span className="text-danger pt-4">{errors.key?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                {...register('value', {
                  required: 'Value required',
                })}
              />
              <span className="text-danger pt-4">{errors.value?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Long Value</Form.Label>
              <Form.Control
                type="text"
                {...register('long_value', {})}
              />
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-between">
              <Button variant="secondary" onClick={backButton}>
                <i className="bi bi-chevron-left"></i> Back
              </Button>
              <Button variant="primary" className="ms-4" type="submit" disabled={isLoading}>
                <i className="bi bi-check-lg"></i> Update{' '}
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
            <Form.Group></Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditPage
