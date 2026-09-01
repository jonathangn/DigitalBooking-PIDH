import { useEffect, useState, createContext } from 'react';
import { fetchJson } from '../../Helpers/fetchJson';
import { Api } from '../../Helpers/axiosClient';
import { normalizeError } from '../../api/client';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [filter, setFilter] = useState(Api + 'productos');
  const [gallery, setGallery] = useState([]);
  const [booking, setBooking] = useState([]);

  const [productsError, setProductsError] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [citiesError, setCitiesError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [galleryError, setGalleryError] = useState(null);
  const [productDetailError, setProductDetailError] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);

  const [productDetail, setProductDetail] = useState({});
  const [productBookings, setProductBookings] = useState([]);
  const [idProduct, setIdProduct] = useState(null);

  const getDataProducts = async () => {
    try {
      const data = await fetchJson(filter);
      setProducts(data);
      setProductsError(null);
    } catch (error) {
      setProductsError(normalizeError(error));
    }
  };

  const getData = async () => {
    try {
      const data = await fetchJson(Api + 'productos');
      setDataReady(true);
      setGallery(data.map((p) => p.imagenes));
      setGalleryError(null);
    } catch (error) {
      setGalleryError(normalizeError(error));
    }
  };

  const getCategories = async () => {
    try {
      const data = await fetchJson(Api + 'categorias');
      setDataReady(true);
      setCategories(data);
      setCategoriesError(null);
    } catch (error) {
      setCategoriesError(normalizeError(error));
    }
  };

  const getCities = async () => {
    try {
      const data = await fetchJson(Api + 'ubicaciones');
      setDataReady(true);
      setCities(data);
      setCitiesError(null);
    } catch (error) {
      setCitiesError(normalizeError(error));
    }
  };

  const getAllBooking = async () => {
    try {
      const data = await fetchJson(Api + 'reservas');
      setBooking(data);
      setStartDates(data.map((p) => p.fechaInicio));
      setEndDates(data.map((p) => p.fechaFinal));
      setBookingError(null);
    } catch (error) {
      setBookingError(normalizeError(error));
    }
  };

  const fetchProductBookings = async (id) => {
    if (!id) return;
    try {
      const data = await fetchJson(Api + 'productos/' + id);
      setProductDetail(data);
      setProductBookings(data.reservas || []);
      setProductDetailError(null);
    } catch (error) {
      setProductDetailError(normalizeError(error));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch, state set after await
    getData();
    getCities();
    getCategories();
    getDataProducts();
    getAllBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps cover `filter`; fetch fns are recreated each render
  }, [filter, setProducts]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch, state set after await
    fetchProductBookings(idProduct);
  }, [idProduct]);

  const retry = (resource) => {
    if (resource === 'products') return getDataProducts();
    if (resource === 'categories') return getCategories();
    if (resource === 'cities') return getCities();
    if (resource === 'booking') return getAllBooking();
    if (resource === 'gallery') return getData();
    if (resource === 'productDetail') return fetchProductBookings(idProduct);

    getData();
    getCities();
    getCategories();
    getDataProducts();
    getAllBooking();
    fetchProductBookings(idProduct);
  };

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

        productDetail,
        setProductDetail,
        productBookings,
        setProductBookings,
        idProduct,
        setIdProduct,

        productsError,
        categoriesError,
        citiesError,
        bookingError,
        galleryError,
        productDetailError,
        retry,

        setStartDate: (val) => setDateRange((prev) => [val, prev[1]]),
        setEndDate: (val) => setDateRange((prev) => [prev[0], val]),

        filter,
        setFilter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
