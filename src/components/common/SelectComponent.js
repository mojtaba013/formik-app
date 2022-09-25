const SelectComponent = ({ selectOptions,name,formik }) => {
  return (
    <div className="formControl">
      <select name={name}  {...formik.getFieldProps(name)} >
        {selectOptions.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
