import styled from "styled-components";

export const Form = styled.form`
  width: 500px;
  margin: 50px auto;

  fieldset {
    padding-top: 15px;
  }

  .form-row {
    margin-bottom: 15px;

    label {
      width: 140px;
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
