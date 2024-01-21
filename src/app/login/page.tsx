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
import AppleLogo from "@public/images/logos/apple.svg";
import { useAppDispatch, useAppSelector } from "@redux/type";
import { setAdmin } from "@/redux/admin.slice";
import { useRouter } from "next/navigation";

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
    }
    console.log(res, "response");
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
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
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
                <a className="font-semibold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
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

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-black border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm">
                <svg
                  className="w-6 h-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
            </div>
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
