export interface ResourceContextModel {
  collection: string
  updateCollection: (collection: string) => void
  children?: React.ReactNode
}

export const state: ResourceContextModel = {
  collection: '',
  updateCollection: () => {},
}
