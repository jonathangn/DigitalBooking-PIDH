import React, { useEffect, useState, createContext } from "react";
import Api from "../../Helpers/Api";
import { fetchJson } from "../../Helpers/fetchJson";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [filter, setFilter] = useState(Api + "productos");
  const [gallery, setGallery] = useState([]);
  const [booking, setBooking] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);

  const getDataProducts = async () => {
    try {
      const data = await fetchJson(filter);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      const data = await fetchJson(Api + "productos");
      setDataReady(true);
      setGallery(data.map((p) => p.imagenes));
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await fetchJson(Api + "categorias");
      setDataReady(true);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCities = async () => {
    try {
      const data = await fetchJson(Api + "ubicaciones");
      setDataReady(true);
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllBooking = async () => {
    try {
      const data = await fetchJson(Api + "reservas");
      setBooking(data);
      setStartDates(data.map((p) => p.fechaInicio));
      setEndDates(data.map((p) => p.fechaFinal));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    getCities();
    getCategories();
    getDataProducts();
    getAllBooking();
  }, [filter, setProducts]);

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cities,
        setCities,
        dataReady,
        setDataReady,
        gallery,
        setGallery,
        dateRange,
        setDateRange,
        startDate,
        endDate,
        booking,
        setBooking,
        startDates,
        setStartDates,
        endDates,
        setEndDates,

        filter,
        setFilter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
