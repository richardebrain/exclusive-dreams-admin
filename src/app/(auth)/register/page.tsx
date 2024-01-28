"use client";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterAdminForm } from "@/utils/type";
import { createBasicAdminWithEmail } from "@/utils/firebase";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/type";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

const Page = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterAdminForm>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { admin } = useAppSelector((state) => state.admin);
  const handleRegister = async (data: RegisterAdminForm) => {
    const res = await createBasicAdminWithEmail(data);
    if (res?.uid) {
      router.push("/login");
    }
  };
  useEffect(() => {
    if (admin) {
      router.push("/dashboard");
    }
  }, [admin]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <Image
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Exclusive dreams Logo"
          width={48}
          height={48}
        />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[500px]">
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
