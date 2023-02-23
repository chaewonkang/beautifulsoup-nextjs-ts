import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';
import { css } from '@emotion/react';

interface Props {
  children?: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  const router = useRouter();
  const transparentPage = '/';
  const includePage = [];

  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);
  const [searchIsOpen, setSearchIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {}, [menuIsOpen, searchIsOpen]);

  return (
    <div>
      <Header
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        searchIsOpen={searchIsOpen}
        setSearchIsOpen={setSearchIsOpen}
      />
      <div>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
