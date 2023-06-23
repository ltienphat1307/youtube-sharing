import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/react-hooks";

import { SHARE_MOVIE } from "../../apollo/graphql/useMovie";
import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Form } from "../../components/Form";
import { catchGraphqlError } from "../../apollo/graphql/catchGraphqlError";
import { toast } from "../../components/Toast";

type FormValues = {
  url: string;
};

const validationSchema = yup
  .object({
    url: yup
      .string()
      .required("This field is required")
      .matches(
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
        { message: "Please enter valid Youtube URL" }
      ),
  })
  .required();

export const ShareVideo: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
  const [error, setError] = useState("");
  const [shareMovie] = useMutation(SHARE_MOVIE);

  async function onSubmit(data: FormValues) {
    try {
      await shareMovie({
        variables: { data: { url: data.url } },
      });
      reset();
      toast.success("Share video successfully");
    } catch (ex) {
      const err = catchGraphqlError(ex);
      setError(err);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Share a movie</legend>
          <div className="form-row">
            <label>Youtube URL</label>
            <input {...register("url")} />
            {errors.url && (
              <div className="form-errors">{errors.url.message}</div>
            )}
          </div>

          <div className="form-row submit">
            <PrimaryButton className="btn-submit" type="submit">
              Share
            </PrimaryButton>
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
