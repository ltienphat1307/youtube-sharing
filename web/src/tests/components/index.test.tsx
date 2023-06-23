import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import { PrimaryButton } from "../../components/Button/PrimaryButton";
import { Form } from "../../components/Form";
import { Link } from "../../components/Link";
import { Toast } from "../../components/Toast";

describe("Core Components", () => {
  test("PrimaryButton", () => {
    const tree = renderer.create(<PrimaryButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Form", () => {
    const tree = renderer.create(<Form />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Link", () => {
    const tree = renderer.create(<Link />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Toast", () => {
    const tree = renderer.create(<Toast />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
