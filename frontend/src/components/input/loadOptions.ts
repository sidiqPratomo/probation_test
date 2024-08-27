import type { GroupBase, OptionsOrGroups } from 'react-select'

export type OptionType = {
  value: number;
  label: string;
}

interface ProductData {
  id: number;
  title: string;
}

const sleep = (ms: number) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })
}

const limit = 10

export const loadOptions = async (
  search: string,
  prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
) => {
  sleep(1000)

  try {
    const apiUrl =
      search.trim() === ''
        ? `https://dummyjson.com/products?limit=${limit}&skip=${prevOptions.length}`
        : `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${prevOptions.length}`;
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Error while fetching data: ${response.status}`);
    }

    const responseData = await response.json();
    const products: ProductData[] = responseData.products;

    let newOptions: OptionType[] = [];

    if (products && Array.isArray(products)) {
      newOptions = products.map(product => ({
        value: product.id,
        label: product.title
      }))
    }

    const hasMore = newOptions.length > 0;
    const slicedOptions = newOptions.slice(0, 10)

    return {
      options: slicedOptions,
      hasMore
    }
  } catch (error) {
    console.error('Error while loading from API', error)
    return {
      options: [],
      hasMore: false
    }
  }
}
