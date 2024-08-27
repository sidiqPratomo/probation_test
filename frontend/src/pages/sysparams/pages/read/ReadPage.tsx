import { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { Collection, Model } from '../../core/_models'

type props = {
  data: Model
}

const ReadPage: FC<props> = ({data}) => {
  const navigate = useNavigate()

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Detail Sysparams</h3>
        </div>
        <div className="card-body">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Groups</Form.Label>
              <Form.Control type="text" name="code" value={data.group} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Key</Form.Label>
              <Form.Control type="text" name="name" value={data.key} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Value</Form.Label>
              <Form.Control type="text" name="name" value={data.value} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Long Value</Form.Label>
              <Form.Control type="text" name="name" value={data.long_value} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Long Value</Form.Label>
              <Form.Control type="text" name="name" value={data.long_value} readOnly />
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-end">
              <Button variant="secondary" onClick={backButton}>
                <i className="bi bi-chevron-left"></i> Back
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ReadPage
