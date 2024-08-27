import {ID} from '../../_metronic/helpers'

export const ServiceFormatStringLength = (text: string, limit?: number): string => {
  if (limit) {
    return text.substring(0, limit) + '...'
  }
  return text
}

export const ServiceArrayStringToString = (
  text: string[] | ID[],
  separator: string = ','
): string => {
  return text.join(separator)
}
