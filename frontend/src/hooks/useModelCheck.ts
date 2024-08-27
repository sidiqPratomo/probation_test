/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-useless-catch */
export const useFileCheck = () => {
  const isModelExist = (collection: string): boolean => {
    try {
      const isFileExist = require(`../models/${collection}`);
      if (isFileExist) return true;
      throw Error("Collection didn't exist.");
    } catch (e) {
      throw e;
    }
  };

  const getModel = (collection: string) => {
    try {
      return require(`../models/${collection}`).useCollection();
    } catch (e) {
      throw e;
    }
  };

  return {
    isModelExist,
    getModel,
  };
};
