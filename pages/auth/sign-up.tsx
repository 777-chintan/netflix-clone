// react
import { SubmitHandler, useForm } from "react-hook-form";

// next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// hooks
import useAuth from "../../hooks/useAuth";

// interfaces
interface Inputs {
  email: string;
  password: string;
}

function SignUp() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signUp(email, password);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute top-4 left-4 md:top-6 md:left-8 cursor-pointer object-contain"
        height={150}
        width={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign Up</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input"
            />
            {errors.email && (
              <p className="text-[13px] text-red-500 p-1 font-light">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="input"
            />

            {errors.password && (
              <p className="text-[13px] text-red-500 p-1 font-light">
                Enter your password.
              </p>
            )}
          </label>
        </div>

        <button
          className="w-full rounded py-3 font-semibold bg-[#e50914]"
          type="submit"
        >
          Sign Up
        </button>

        <div className="text-[gray] flex">
          Already user?{" "}
          <Link href="/auth/sign-in">
            <p className="pl-1 text-white hover:underline cursor-pointer">Sign in now</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
