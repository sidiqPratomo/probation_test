import { FC, useEffect} from 'react'
import { Button, Form} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Collection, Model } from '../../core/_models'
import { City } from '../../../../models/countries'

type props = {
  data: City
}

const ReadPage: FC<props> = ({data}) => {
  const {
    register,
    setValue,
  } = useForm<City>({defaultValues: data})

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
  }, [data, setValue])

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
              <Form.Label>City Name</Form.Label>
              <Form.Control
                type='text'
                {...register('name')}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Id Provinsi</Form.Label>
              <Form.Control
                type='text'
                {...register('id_provinsi')}
                readOnly
              />
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
