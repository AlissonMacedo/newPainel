import React from 'react';
import { Formik } from 'formik';
import { Button } from '..';

import { Container } from './styles';

const Retangle255 = () => {
  return (
    <Container>
      <Formik
        initialValues={{ teste: '', teste2: '', teste3: '', teste4: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Rota de entrega</h3>
            </div>
            <div className="address">
              <div>
                <h4>Rua Aristóteles Tavares, 67</h4>
                <span>Valença, Bahia - Brasil</span>
                <strong>Editar</strong>
              </div>
              <div className="destiny">
                <h4>Destino 1</h4>
              </div>
            </div>
            <div className="inputs">
              <input
                type="email"
                name="teste"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.teste}
              />
              <div>
                <input
                  type="text"
                  name="teste2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teste2}
                />
                <input
                  type="text"
                  name="teste3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teste3}
                />
              </div>
              <div>
                <input name="complement" />
              </div>
              <div>
                <input
                  type="text"
                  name="teste4"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teste4}
                />
              </div>
            </div>
            <Button typeStyle="secondary" type="submit">
              Confirmar endereço
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};
export default Retangle255;
