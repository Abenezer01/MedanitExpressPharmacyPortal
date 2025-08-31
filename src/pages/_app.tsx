// ** React Imports
import { ReactNode } from "react";

// ** Next Imports
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";

// ** Store Imports
import { Provider } from "react-redux";
import { store } from "src/store";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// ** Config Imports
import { defaultACLObj } from "src/configs/acl";
import "src/configs/i18n";
import themeConfig from "src/configs/themeConfig";

// ** Fake-DB Import
// import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from "react-hot-toast";

// ** Component Imports
import AclGuard from "src/@core/components/auth/AclGuard";
import AuthGuard from "src/@core/components/auth/AuthGuard";
import GuestGuard from "src/@core/components/auth/GuestGuard";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import UserLayout from "src/layouts/UserLayout";

// ** Spinner Import
import Spinner from "src/@core/components/spinner";

// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from "src/@core/context/settingsContext";
import { AuthProvider } from "src/context/AuthContext";

// ** Styled Components
import ReactHotToast from "src/@core/styles/libs/react-hot-toast";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** Prismjs Styles
import "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

import "src/iconify-bundle/icons-bundle-react";

// ** Global css styles
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../styles/globals.css";
import useAxiosInterceptors from "src/common/exception/use-axiosInterceptors";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useAxiosInterceptors();

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));

  const setConfig = Component.setConfig ?? undefined;

  const authGuard = Component.authGuard ?? true;

  const guestGuard = Component.guestGuard ?? false;

  // Set guard props on window for use in AuthProvider
  if (typeof window !== 'undefined') {
    window.__NEXT_GUARD_PROPS__ = { guestGuard, authGuard };
  }

  const aclAbilities = Component.acl ?? defaultACLObj;
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Church Management`}</title>
          <meta
            name="description"
            content={`${themeConfig.templateName} – Church Managment System.`}
          />
          <meta
            name="keywords"
            content="Gerji Emmanuel, Church Managment System"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SettingsProvider
              {...(setConfig ? { pageSettings: setConfig() } : {})}
            >
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <AclGuard
                          aclAbilities={aclAbilities}
                          guestGuard={guestGuard}
                          authGuard={authGuard}
                        >
                          {getLayout(<Component {...pageProps} />)}
                        </AclGuard>
                      </Guard>
                      <ReactHotToast>
                        <Toaster
                          position={settings.toastPosition}
                          toastOptions={{ className: "react-hot-toast" }}
                        />
                      </ReactHotToast>
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
