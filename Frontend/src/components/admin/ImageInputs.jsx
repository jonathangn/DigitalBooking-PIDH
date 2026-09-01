import { Field, useFormikContext } from 'formik';

function ImageInputs({ inputs, onChange, onAdd, onRemove }) {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      {inputs.map((item, i) => (
        <div key={i} className="gallery-sender">
          <form className="gallery-sender-form">
            <Field
              type="text"
              name="urlImg"
              placeholder="   https://..."
              onChange={(e) => {
                setFieldValue('urlImg', e.value);
                onChange(e, i);
              }}
            />
          </form>

          {inputs.length !== 1 && inputs.length - 1 !== i && (
            <button
              name="button-add"
              type="button"
              className="gallery-sender-add"
              onClick={() => onRemove(i)}
              style={{ background: '#545776' }}
            >
              x
            </button>
          )}

          {inputs.length - 1 === i && (
            <button name="button-add" type="button" className="gallery-sender-add" onClick={onAdd}>
              +
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default ImageInputs;