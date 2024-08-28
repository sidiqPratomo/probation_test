import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router'
import EditPage from './EditPage'
import {Model, Collection} from '../../core/_models'
import {getOneById} from '../../core/_requests'
import { usePageData } from '../../../../_metronic/layout/core'
import { InitialValueDistrict } from '../../../../models/countries'

const EditWrapper: FC = () => {
  const params = useParams()
  const {setPageTitle} = usePageData();
  setPageTitle('Edit District')
  const {id} = params

  const [form, setForm] = useState<Model>(InitialValueDistrict)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneById(Collection, id as string)
        const result = response.data.data as any
        setForm(result)
      } catch (error) {
        console.error('There is error while fetching data:', error);
      }
    }

    fetchData();
  }, [id])

  return <EditPage data={form} />
}

export default EditWrapper
