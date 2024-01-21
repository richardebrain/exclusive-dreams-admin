"use client";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterAdminForm } from "@/utils/type";
import { createBasicAdminWithEmail } from "@/utils/firebase";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});

const Page = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterAdminForm>({
    resolver: yupResolver(schema),
  });
  const handleRegister = async (data: RegisterAdminForm) => {
    const res = await createBasicAdminWithEmail(data);
    console.log(res, "response");
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-10 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <div className="flex gap-3 w-full">
              <CustomInput
                register={register}
                name="firstName"
                type="text"
                outerClassName="w-full"
                required
                label="First Name"
                placeholder="Enter First Name"
                errors={errors.firstName?.message}
              />
              <CustomInput
                register={register}
                name="lastName"
                outerClassName="w-full"
                type="text"
                required
                label="Last Name"
                placeholder="Enter Last Name"
                errors={errors.lastName?.message}
              />
            </div>
            <CustomInput
              register={register}
              name="email"
              type="email"
              required
              label="Email address"
              placeholder="Enter email address"
              errors={errors.email?.message}
            />

            <CustomInput
              register={register}
              name="password"
              type="password"
              required
              label="Password"
              placeholder="Enter password"
              errors={errors.password?.message}
            />
            <CustomInput
              register={register}
              name="confirmPassword"
              type="password"
              required
              label="Confirm Password"
              placeholder="Enter password"
              errors={errors.confirmPassword?.message}
            />

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black  checked:bg-black checked:border-transparent focus:outline-none "
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div> */}

            <div>
              <CustomButton type="submit">
                {isSubmitting ? (
                  <Spinner className="w-5 h-5 animate-spin fill-white mx-auto" />
                ) : (
                  "Sign Up"
                )}
              </CustomButton>
            </div>
          </form>

          <div>
            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
