import {isNotEmpty} from '../../_metronic/helpers'

export const ServiceFormatQueryString = (object?: object): string => {
  if (object === undefined) return ''
  const params: string = Object.entries(object)
    .filter((entry) => isNotEmpty(entry))
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join('&')

  return params
}
