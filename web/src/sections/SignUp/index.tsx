import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { navigate } from "gatsby";

import { SIGN_UP } from "../../apollo/graphql/useAuth";
import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { PrimaryButton } from "../../components/Button";
import { Link } from "../../components/Link";
import { Form } from "../../components/Form";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup
  .object({
    email: yup.string().required("Required").default("This field is required"),
    password: yup
      .string()
      .required("Required")
      .default("This field is required"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password")], "Passwords do not match! Try again…"),
  })
  .required();

const SignUp: React.FC = () => {
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
            <input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <div className="form-errors">{errors.email.message}</div>
            )}
          </div>
          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div className="form-errors">{errors.password.message}</div>
            )}
          </div>
          <div className="form-row">
            <label>Confirm password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <div className="form-errors">
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
          {error && <div className="form-errors">{error}</div>}
        </fieldset>
      </Form>
    </div>
  );
};

export default SignUp;
