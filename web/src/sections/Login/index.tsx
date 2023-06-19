import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";

import { LOGIN, ME } from "../../apollo/graphql/useAuth";
import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { PrimaryButton } from "../../components/Button";
import { Link } from "../../components/Link";

type FormValues = {
  email: string;
  password: string;
};

const Form = styled.form`
  width: 500px;
  margin: 50px auto;

  fieldset {
    padding-top: 15px;
  }

  .form-row {
    margin-bottom: 15px;

    label {
      width: 100px;
      display: inline-block;
      margin-right: 15px;
    }

    &.submit {
      text-align: center;
    }
  }

  .btn-submit {
    margin: auto;
  }

  .form-errors {
    color: red;
  }
`;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState("");

  async function onSubmit(data: FormValues) {
    try {
      await login({ variables: { data }, refetchQueries: [{ query: ME }] });
      navigate("/");
    } catch (e) {
      const err = catchGraphqlError(e);
      setError(err);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Login</legend>
          <div className="form-row">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <div className="form-errors">{errors.email.message}</div>
            )}
          </div>
          <div className="form-row">
            <label>password</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div className="form-errors">{errors.password.message}</div>
            )}
          </div>

          <div className="form-row submit">
            <PrimaryButton className="btn-submit" type="submit">
              Login
            </PrimaryButton>
            <Link href="/sign-up">Sign up</Link>
          </div>
          {error && <div className="form-errors">{error}</div>}
        </fieldset>
      </Form>
    </div>
  );
};

export default Login;
