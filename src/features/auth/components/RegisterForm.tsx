import { Button } from '@components/inputs/buttons';
import {
  Form,
  FormGroup,
  Input,
  PasswordInput,
  Error,
} from '@components/inputs/form';

import { useRegister } from '../api/register';

import { useRegisterForm } from '../hooks';
import { AxiosResponse } from 'axios';
import { User } from '../types';

type RegisterFormProps = {
  onSuccess: (
    data: AxiosResponse<User, any>,
    variables: User,
    context?: unknown
  ) => void | Promise<void>;
};

export const RegisterForm = ({
  onSuccess,
}: RegisterFormProps) => {
  const registerMutation = useRegister({
    mutationConfig: { onSuccess },
  });

  const { input, errors, handleInputChange, handleRegister } =
    useRegisterForm(registerMutation);

  const { error, isError, isPending } = registerMutation;

  return (
    <Form onSubmit={handleRegister}>
      {isError && <Error errorMessage={error.message} />}

      <FormGroup
        className="mb-[20px]"
        label="First Name"
        error={errors?.firstName?.[0]}
      >
        <Input
          type="text"
          name="firstName"
          value={input.firstName}
          autoComplete="given-name"
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup
        className="mb-[20px]"
        label="Last Name"
        error={errors?.lastName?.[0]}
      >
        <Input
          type="text"
          name="lastName"
          value={input.lastName}
          autoComplete="family-name"
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup
        className="mb-[20px]"
        label="Email"
        error={errors?.email?.[0]}
      >
        <Input
          type="email"
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
          autoComplete="new-password"
          onChange={handleInputChange}
        />
      </FormGroup>

      <Button
        className="w-[80px]"
        type="submit"
        variant="primary"
        disabled={isPending}
        isLoading={isPending}
      >
        Sign up
      </Button>
    </Form>
  );
};
