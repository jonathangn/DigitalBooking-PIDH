// Validation and payload-building helpers for the admin product form,
// extracted from ProductForm.jsx so the component stays small.

export function validateProductForm(valores, inputs) {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = 'El nombre es requerido';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
    errores.nombre = 'El nombre no es válido';
  }

  if (!valores.direccion) {
    errores.direccion = 'La dirección es requerida';
  }

  if (!valores.latitud) {
    errores.latitud = 'La latitud es requerida';
  }

  if (!valores.longitud) {
    errores.longitud = 'La longitud es requerida';
  }

  if (!valores.descripcion) {
    errores.descripcion = 'La descripción es requerida';
  }

  if (!valores.caracteristicas) {
    errores.caracteristicas = 'Las características son requeridas';
  }

  if (valores.caracteristicas.length === 0) {
    errores.caracteristicas = 'Seleccione como mínimo 1 característica';
  }

  if (!valores.ciudad) {
    errores.ciudad = 'La ciudad es requerida';
  }

  if (!valores.categoria) {
    errores.categoria = 'La categoría es requerida';
  }

  if (
    !valores.CheckIn ||
    !valores.CheckOut ||
    !valores.Covid ||
    !valores.Cancel ||
    !valores.Fumar ||
    !valores.Party ||
    !valores.Smoke ||
    !valores.Safe
  ) {
    errores.CheckIn = 'Seleccione todas las políticas';
  }

  if (!inputs || inputs.length < 5) {
    errores.urlImg = 'Debe cargar al menos 5 imágenes de la propiedad';
  }

  if (/^(ftp|http|https):\/\/[^ "]+$/.test(valores.urlImg)) {
    errores.urlImg = 'La URL debe tener el formato apropiado';
  }

  return errores;
}

export function buildProductPayload(valores) {
  const caracteristicas = valores.caracteristicas.map((id) => ({ id: parseInt(id) }));

  return {
    nombre: valores.nombre,
    titulo: 'Disfruta de ' + valores.nombre,
    descripcion: valores.descripcion,
    precio: 0,
    disponible: true,
    latitud: parseInt(valores.latitud),
    longitud: parseInt(valores.longitud),
    direccion: valores.direccion,
    estrellas: 5,
    caracteristicas,
    politicas: [
      { id: parseInt(valores.CheckIn) },
      { id: parseInt(valores.CheckOut) },
      { id: parseInt(valores.Covid) },
      { id: parseInt(valores.Cancel) },
      { id: parseInt(valores.Fumar) },
      { id: parseInt(valores.Party) },
      { id: parseInt(valores.Smoke) },
      { id: parseInt(valores.Safe) },
    ],
    categoria: { id: valores.categoria },
    ubicacion: { id: valores.ciudad },
  };
}
