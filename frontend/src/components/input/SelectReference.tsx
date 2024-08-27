import { useEffect, useState } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { OptionType } from '../../types'
import axios from 'axios';
import { AsyncPaginate } from 'react-select-async-paginate';

const BASEURL = import.meta.env.VITE_APP_API_URL || ''
const LIMIT = 10;

interface SelectReferenceProps {
  label: string
  collection: string
  keyLabel: string
  keyValue: string
  debounceTimeout?: number
  onChange?: (selected: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any
  initialValue: string
}

export function SelectReference({
  label,
  collection,
  keyLabel,
  keyValue,
  onChange,
  debounceTimeout = 300,
  params = {},
  deps,
  initialValue = ''
}: SelectReferenceProps) {
  const [internalValue, setInternalValue] = useState<OptionType | null | undefined>(null)

  const sleep = (ms: number) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined)
      }, ms)
    })
  }

  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) => {
    sleep(1000)

    try {
      const queryParams = new URLSearchParams(params)
      const response = await axios.get(`${BASEURL}/${collection}?!skip=${prevOptions.length}&!limit=${LIMIT}&${queryParams}`)
      if (response.status !== 200) {
        throw new Error(`Unable to get data: ${response.status}`);
      }

      const result = response.data.data.result;

      let newOptions: OptionType[] = [];

      if (result && Array.isArray(result)) {
        newOptions = result.map((res) => ({
          value: res[keyValue],
          label: res[keyLabel]
        }))
      }

      const hasMore = newOptions.length > 0;
      const sliceOptions = newOptions.slice(0, 10);

      return {
        options: sliceOptions,
        hasMore
      }
    } catch (err) {
      console.error('Error while fetching data from API:', err);
      return {
        options: [],
        hasMore: false
      }
    }
  }

  const handleChange = (selected: OptionType | null) => {
    if (selected) {
      setInternalValue(selected)
      onChange && onChange(selected?.value.toString())
    }
  }

  useEffect(() => {
    // Lakukan reset terhadap 'initialValue' ketika 'deps' berubah
    setInternalValue(null);
  }, [deps]);

  useEffect(() => {
    if (initialValue) {
      const fetchDetail = async () => {
        try {
          const response = await axios.get(`${BASEURL}/${collection}/${initialValue}`)
          const result = response.data.data;
          const initialObject = {
            label: result[keyLabel],
            value: result[keyValue]
          }
          setInternalValue(initialObject);
        } catch (e) {
          console.error('error while fetching default value:', e);
        }
      }

      fetchDetail();
    }
  }, [collection, initialValue, keyLabel, keyValue])

  return (
    <div className="mb-10">
      <label
        className="form-label"
        htmlFor={label}
      >
        {label}
      </label>
      <AsyncPaginate
        debounceTimeout={debounceTimeout}
        value={internalValue}
        loadOptions={loadOptions}
        isClearable={false}
        onChange={handleChange}
        cacheUniqs={[deps]}
      />
    </div>
  )
}
