import { useParams } from 'react-router-dom'
import ReadPage from './ReadPage'
import {FC, useEffect, useState} from 'react'
import { Collection, Model } from '../../core/_models'
import { InitialValue, Privileges } from '../../../../models/privileges'
import { getOneById } from '../../core/_requests'
import { usePageData } from '../../../../_metronic/layout/core'

const ReadWrapper: FC = () => {
  const params = useParams()
  const {setPageTitle} = usePageData()
  setPageTitle('Detail Privileges')
  const {id} = params

  const [form, setForm] = useState<Model>(InitialValue)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneById<Privileges>(Collection, id as string)
        const result = response.data.data
        setForm(result)
      } catch (error) {
        console.error('There is error while fetching data:', error);
      }
    }

    fetchData();
  }, [id])
  
  return <ReadPage data={form}/>
}

export default ReadWrapper
