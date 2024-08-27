import { FC, createContext, useContext, useState } from 'react'
import { ResourceContextModel, state } from '../base_models/ResourceContext'
import { WithChildren } from '../_metronic/helpers'
import { useLocation } from 'react-router-dom'

const Context = createContext<ResourceContextModel>(state)

const ResourceProvider: FC<WithChildren> = ({ children }) => {
  const { pathname } = useLocation()
  const [currentCollectionName] = pathname.split('/').filter(item => item);
  const [collection, setCollection] = useState<string>(currentCollectionName || '')

  const updateCollection = (name: string) => {
    setCollection(name)
  }

  return (
    <Context.Provider
      value={{
        collection,
        updateCollection,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useResourceContext = () => useContext(Context)

export { ResourceProvider, useResourceContext }
