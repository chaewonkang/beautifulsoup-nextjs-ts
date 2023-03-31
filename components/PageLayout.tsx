import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';
import { css } from '@emotion/react';

interface Props {
  children?: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);

  return (
    <div>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
