import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { navigate } from "gatsby";

import { SIGN_UP } from "../../apollo/graphql/useAuth";
import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Link } from "../../components/Link";
import { Form } from "../../components/Form";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup
  .object({
    email: yup
      .string()
      .required("This field is required")
      .email("invalid email"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref("password")], "Passwords do not match! Try again…"),
  })
  .required();

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
  const [signUp] = useMutation(SIGN_UP);
  const [error, setError] = useState("");

  async function onSubmit(data: FormValues) {
    try {
      await signUp({
        variables: { data: { email: data.email, password: data.password } },
      });

      navigate("/login");
    } catch (e) {
      const err = catchGraphqlError(e);
      setError(err);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Sign up</legend>
          <div className="form-row">
            <label>Email</label>
            <input
              aria-label="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div aria-label="errors" className="form-errors">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="form-row">
            <label>Password</label>
            <input
              aria-label="password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div aria-label="errors" className="form-errors">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="form-row">
            <label>Confirm password</label>
            <input
              aria-label="confirmPassword"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <div aria-label="errors" className="form-errors">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <div className="form-row submit">
            <PrimaryButton className="btn-submit" type="submit">
              Sign up
            </PrimaryButton>
            <Link href="/login">Login</Link>
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
