"use client";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType } from "@utils/type";
import { signInAdminWithEmail } from "@/utils/firebase";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@redux/type";
import { setAdmin } from "@/redux/admin.slice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

const Page = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { admin } = useAppSelector((state) => state.admin);
  const router = useRouter();
  const handleLogin = async (data: LoginType) => {
    const res = await signInAdminWithEmail(data.email, data.password);
    if (res?.uid) {
      dispatch(setAdmin(res));
      router.push("/");
    }
  };
  useEffect(() => {
    if (admin) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (admin) {
      router.push("/");
    }
  }, [admin]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Exclusive dreams Logo"
          width={48}
          height={48}
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your Admin Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
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

            <div className="flex items-center justify-between">
              <div className="text-sm leading-6">
                <Link className="font-semibold text-blue-600 hover:text-blue-500" href={'#'}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <CustomButton
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {isSubmitting ? (
                  <Spinner className="w-5 h-5 animate-spin fill-white mx-auto" />
                ) : (
                  "Sign in"
                )}
              </CustomButton>
            </div>
          </form>

          <div>
            {/* <div className="relative mt-10">
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
            </div> */}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
