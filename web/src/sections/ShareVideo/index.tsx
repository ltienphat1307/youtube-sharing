import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@apollo/react-hooks";

import { ME } from "../../apollo/graphql/useAuth";
import { PrimaryButton } from "../../components/Button";
import { Form } from "../../components/Form";
import { initSocket } from "../../socket";

type FormValues = {
  url: string;
};

const validationSchema = yup
  .object({
    url: yup
      .string()
      .matches(
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
        { message: "Please enter valid Youtube URL" }
      )
      .default("This field is required"),
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
  const getMeResp = useQuery(ME, { fetchPolicy: "cache-and-network" });
  const user = getMeResp.data && getMeResp.data.me;
  const socket = initSocket();

  async function onSubmit(data: FormValues) {
    socket?.emit("share-movie", { userId: user.id, url: data.url });
    reset();
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
          {error && <div className="form-errors">{error}</div>}
        </fieldset>
      </Form>
    </div>
  );
};
