import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Logo from '../components/shared/Logo';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Login Handler
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <div className="relative flex w-full h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login | Trailer Hero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/assets/background.jpg"
        layout="fill"
        unoptimized
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
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
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
          onClick={() => setLogin(true)}
          type="submit"
          className="w-full rounded py-3 font-semibold bg-[#FE4A49]"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          Need an account?{' '}
          <Link href="/signup">
            <a className="text-[#FE4A49]">Sign Up</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
