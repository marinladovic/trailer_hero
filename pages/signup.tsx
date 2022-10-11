import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Logo from '../components/shared/Logo';
import { auth } from '../firebase';
import useAuth from '../hooks/useAuth';

interface Inputs {
  username: string;
  email: string;
  password: string;
}

function SignUp() {
  const router = useRouter();
  const [signUpState, setSignUpState] = useState(false);
  const { signUp, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Register Handler
  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
    username,
  }) => {
    try {
      await signUp(username, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex w-full h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Register | Trailer Hero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/assets/background.jpg"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <div className="absolute left-4 top-4 cursor-pointer md:left-10 md:top-10">
        <Logo />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded-lg bg-black/75 px-6 md:mt-0 md:max-w-md md:px-14 py-8"
      >
        <h1 className="text-4xl font-semibold">Register</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Username"
              className="input"
              {...register('username', { required: true })}
            />
          </label>
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email address.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must be at least 6 characters.
              </p>
            )}
          </label>
        </div>
        <button
          onClick={() => setSignUpState(true)}
          type="submit"
          className="w-full rounded py-3 font-semibold bg-[#FE4A49]"
        >
          Sign Up
        </button>
        <div className="text-[gray]">
          Already have an account?{' '}
          <Link href="/login">
            <a className="text-[#FE4A49]">Sign In</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
