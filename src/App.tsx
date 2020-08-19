import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

type RegistrationForm = {
  email: string;
  password: string;
};

const App: FC = () => {
  const { register, handleSubmit, errors } = useForm<RegistrationForm>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape<RegistrationForm>({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
      })
    ),
  });

  const onSubmit = (value: RegistrationForm) => console.log(value);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" ref={register} name="email" />
      {errors.email && <div>{errors.email.message}</div>}
      <input type="password" ref={register} name="password" />
      {errors.password && <div>{errors.password.message}</div>}
      <button>Submit</button>
    </form>
  );
};

export default App;
