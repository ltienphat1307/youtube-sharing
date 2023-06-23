import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "gatsby";

import { LOGIN, ME } from "../../apollo/graphql/useAuth";
import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Link } from "../../components/Link";
import { Form } from "../../components/Form";

type FormValues = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState("");

  async function onSubmit(data: FormValues) {
    try {
      await login({
        variables: { data },
        refetchQueries: [{ query: ME }],
      });

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
          <legend>Login Form</legend>
          <div className="form-row">
            <label>Email</label>
            <input
              aria-label="email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-row">
            <label>password</label>
            <input
              aria-label="password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>

          <div className="form-row submit">
            <PrimaryButton className="btn-submit" type="submit">
              Login
            </PrimaryButton>
            <Link href="/sign-up">Sign up</Link>
          </div>
          {error && (
            <div aria-label="server-error" className="form-errors">
              {error}
            </div>
          )}
        </fieldset>
      </Form>
    </div>
  );
};
