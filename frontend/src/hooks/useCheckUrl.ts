/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-useless-catch */
export const useCheckUrl = () => {
  const isUrlTrash = (pathName: string): boolean => {
    const pathNameArray = pathName.split('/');
    const { length } = pathNameArray;
    if (length > 0) {
      const lastPathName = pathNameArray[length - 1];
      if (lastPathName === 'trash') {
        return true;
      }
    }
    return false;
  };

  return {
    isUrlTrash,
  };
};
