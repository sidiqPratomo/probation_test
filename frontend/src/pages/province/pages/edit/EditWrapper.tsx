import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router'
import EditPage from './EditPage'
import {Model, Collection} from '../../core/_models'
import {getOneById} from '../../core/_requests'
import { usePageData } from '../../../../_metronic/layout/core'
import { InitialValue } from '../../../../base_models/Province'

const EditWrapper: FC = () => {
  const params = useParams()
  const {setPageTitle} = usePageData();
  setPageTitle('Edit Province')
  const {id} = params

  const [form, setForm] = useState<Model>(InitialValue)

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

  console.log('data get city byid', form)
  return <EditPage data={form} />
}

export default EditWrapper
