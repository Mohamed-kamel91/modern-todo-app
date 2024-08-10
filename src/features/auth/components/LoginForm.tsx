import { Button } from '@components/inputs/buttons';
import {
  Form,
  FormGroup,
  Input,
  PasswordInput,
  Error,
} from '@components/inputs/form';

import { useLoginForm } from '../hooks';
import { AxiosResponse } from 'axios';
import { User } from '../types';

type LoginFormProps = {
  onSuccess: (data: AxiosResponse<User[], any>) => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    input,
    login,
    errors,
    loginError,
    handleInputChange,
    handleLogin,
  } = useLoginForm({ onSuccess });

  return (
    <Form onSubmit={handleLogin}>
      {/* User not found error */}
      {loginError && (
        <Error className="mb-[20px]" errorMessage={loginError} />
      )}

      {/* User fetch error */}
      {login.error && (
        <Error
          className="mb-[20px]"
          errorMessage={login.error.message}
        />
      )}

      <FormGroup
        className="mb-[20px]"
        label="Email"
        error={errors?.email?.[0]}
      >
        <Input
          type="text"
          name="email"
          value={input.email}
          autoComplete="email"
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup
        className="mb-[20px]"
        label="Password"
        error={errors?.password?.[0]}
      >
        <PasswordInput
          name="password"
          value={input.password}
          autoComplete="current-password"
          onChange={handleInputChange}
        />
      </FormGroup>

      <Button
        className="w-[80px]"
        type="submit"
        variant="primary"
        disabled={login.isFetching}
        isLoading={login.isFetching}
      >
        Log in
      </Button>
    </Form>
  );
};
