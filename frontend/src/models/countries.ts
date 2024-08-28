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


export interface Province {
  id?: number;
  name: string;
  island_id:string;
}

export const InitialValueProvince = {
  id: 0,
  name: '',
  island_id:'',
}

export interface Island {
  id?: number;
  name: string;
}

export const InitialValueIsland = {
  id: 0,
  name: '',
}

export interface City {
  id?: number;
  name: string;
  id_provinsi: string;
}

export const InitialValueCity = {
  id: 0,
  name: '',
  id_provinsi:'',
}

export interface District {
  id?: number;
  district_code: string;
  city_code: string;
  name: string;
}

export const InitialValueDistrict= {
  id: 0,
  name: '',
  district_code:'',
  city_code:''
}

export interface SUbdistrict {
  id?: number;
  name: string;
  district_code: string;
  subdistrict_code: string;
}

export const InitialValueSubdistrict= {
  id: 0,
  name: '',
  district_code:'',
  subdistrict_code:''
}