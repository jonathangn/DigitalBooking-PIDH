export const selectStyles = {
  control: (base) => ({
    ...base,
    height: '50px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.15)',
    fontSize: '15px',
    fontWeight: '700px',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    fontSize: '15px',
    fontWeight: '700',
    color: state.isSelected ? '#ffffff' : '#383B58',
  }),
};

export const selectTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: '#BEBEBE',
    primary: '#1DBEB4',
    color: '#383B58',
    fontWeight: '700',
  },
});