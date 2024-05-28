import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import Layout from "@/components/layout/layout";
import fonts from "@/styles/fonts";
import { Image } from "react-bootstrap";
import styles from "@/styles/Home.module.scss";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC_Ebu1Tg4nWb6eUudi8c3QXTBsJVdpNC0",
//   authDomain: "staxrealty3040.firebaseapp.com",
//   projectId: "staxrealty3040",
//   storageBucket: "staxrealty3040.appspot.com",
//   messagingSenderId: "369649822263",
//   appId: "1:369649822263:web:4759dcd222ef4bc4cb2db2",
//   measurementId: "G-NE5JEHL3FY",
// };

export default function App({ Component, pageProps }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    Aos.init({
      // easing: "ease-out-cubic",
      duration: 1000,
      once: false,
    });

    // const analytics = getAnalytics(firebaseApp);
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Router.events.on("routeChangeStart", (...params) => {
      NProgress.start(params);
    });
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  return (
    // <SessionProvider session={pageProps.session}>
    <>
      {isLoading ? (
        <div className={styles.splash}>
          <Image src="/splash.gif" alt="splash" width={200} />
          <div>
            <Image
              src="/Your Riding.png"
              alt="splash"
              height={10}
              data-aos="fade-right"
              data-aos-delay='1200'
            />
            <Image
              src="/partner.png"
              alt="splash"
              height={10}
              data-aos="fade-left"
              data-aos-delay='1200'
            />
          </div>
        </div>
      ) : (
        <div
          className={`${fonts.mainFont} ${styles.app} ${
            isLoading ? styles.loading : ""
          }`}
        >
          <Layout>
            <Component {...pageProps} admin={admin} />
          </Layout>
        </div>
      )}
    </>
    // </SessionProvider>
  );
}
