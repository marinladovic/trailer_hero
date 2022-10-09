import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Loader from '../components/shared/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Loader />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
