import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Flex, Text, FlexProps } from '@chakra-ui/core';
import BadgeMenu from './BadgeMenu';
import { useAuth0 } from '@auth0/auth0-react';
import NavLink from './NavLink';

type NavLinks = {
  to: string;
  text: string;
};

const navigationLinks: Array<NavLinks> = [];

const MenuItems = ({ children }: { children: ReactNode }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const NavBar = (props: FlexProps) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogout = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="#11151d"
      borderBottom="1px solid #dadada"
      marginBottom="0px"
      shadow="0px 0px 5px 0px #dadada"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="lg">
            Mood-e-rator
          </Heading>
        </Link>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {navigationLinks.map(navLink => (
          <NavLink to={navLink.to}>
            <MenuItems>{navLink.text}</MenuItems>
          </NavLink>
        ))}
      </Box>

      <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <BadgeMenu
          isAuthenticated={isAuthenticated}
          fullname={user ? `${user.given_name} ${user.family_name}` : ''}
          login={loginWithRedirect}
          logout={handleLogout}
        ></BadgeMenu>
      </Box>
    </Flex>
  );
};

export default NavBar;
