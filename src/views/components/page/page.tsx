import { forwardRef, ReactNode, Ref } from "react";

// next
import Head from "next/head";

// material-ui
import { Box, BoxProps } from "@mui/material";
import { useTranslation } from "react-i18next";

// ==============================|| Page - SET TITLE & META TAGS ||============================== //

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title?: string;
  titleId?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  (
    { children, title = "", titleId, meta, ...other }: Props,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { t: transl } = useTranslation();

    return (
      <>
        <Head>
          <title>{`${titleId ? transl(titleId) : title} | Gerji Emmanuel`}</title>
          {meta}
        </Head>

        <Box ref={ref} {...other}>
          {children}
        </Box>
      </>
    );
  },
);

export default Page;
