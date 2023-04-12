import React, { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import { Label } from "../components/label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email của bạn")
    .required("Vui lòng nhập email của bạn"),
  password: yup
    .string()
    .min(8, "Mật khẩu bắt buộc ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 100,
      });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  document.title = "Loggin Page";
  useEffect(() => {
    if (userInfo?.email) navigate("/");
  }, [userInfo, navigate]);
  // !!!!!!!!!!!!!!!!!
  const handleSignIn = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You have not had an account?{" "}
          <Link to={"/sign-up"}>Register an account</Link>
        </div>
        <Button
          type="submit"
          style={{ width: "100%", maxWidth: 320, margin: "0 auto" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
