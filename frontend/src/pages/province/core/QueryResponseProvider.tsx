/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  stringifyRequestQuery,
  WithChildren,
} from '../../../_metronic/helpers'
import {useQueryRequest} from './QueryRequestProvider'
import {getWithQueryString} from './_requests'
import { useResourceContext } from '../../../context/ResourceContext'

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({children}) => {
  const {state} = useQueryRequest()
  const {limit, skip, search} = state
  const requestQueries = {
    ...state,
    '!skip': skip,
    '!limit': limit,
    '!search': search?search:'',
  }
  
  
  const [query, setQuery] = useState<string>(stringifyRequestQuery(requestQueries))
  const updatedQuery = useMemo(() => stringifyRequestQuery(requestQueries), [requestQueries])
  const {collection} = useResourceContext()

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    // data: response,
    data: response,
  } = useQuery(
    `${query}`,
    async () => {
      return await getWithQueryString(collection, query)
    },
    {cacheTime: 0, keepPreviousData: false, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (response) {
    const entries = response.data.data
    if (entries) {
      return entries
    }
  }

  return []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  if (!response) {
    return defaultPaginationState
  }

  return defaultPaginationState
}

// const useQueryResponsePagination = () => {
//   const defaultPaginationState: PaginationState = {
//     ...initialQueryState,
//   }

//   const {response} = useQueryResponse()
//   const {limit, skip} = defaultPaginationState
//   if (response) {
//     const {data} = response
//     if (data) {
//       const {entries} = data
//       const {length} = entries

//       const numberOfPage: number = Math.floor(length / limit)
//       const updateSkip: number = skip + numberOfPage * limit
//       return {
//         skip: updateSkip,
//         limit,
//       }
//     }
//   }

//   return defaultPaginationState
// }

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
