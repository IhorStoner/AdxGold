import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {
    img: [],
    section: '',
    subsection: '',
    type: '',
    // region: selectedRegion,
    city: '',
    productPrice: '',
    priceAd: '',
    title: '',
    description: '',
    name: '',
    phone: '',
    mail: '',
    status: '',
    services: '',
  },
  error: null
};

const newAdFormReducer = createReducer(initialState, {
  
});

export default newAdFormReducer;