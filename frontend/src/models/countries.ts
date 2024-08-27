export interface Countries {
  name: string;
}

export const useCollection = () => {
  const collection = 'Countries';
  const forms: Countries = {
    name: '',
  };

  return {
    collection,
    forms,
  };
};
