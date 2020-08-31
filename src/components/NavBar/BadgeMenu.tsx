import React, { FC } from 'react';
import styles from './BadgeMenu.module.css';
import { Menu, MenuButton, MenuList, MenuItem, Avatar, Box } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  isAuthenticated: boolean;
  fullname: string;
  login: any;
  logout: any;
}

const BadgeMenu: FC<IProps> = ({ children, ...props }) => (
  <Menu margin-right="150px" autoSelect={false}>
    <MenuButton as={Avatar} bg="tomato" overflow="visible">
      <Avatar name={props.fullname} backgroundColor="#185280" color="white"></Avatar>
    </MenuButton>
    <MenuList right="25px" marginTop="10px">
      <MenuItem onClick={() => (props.isAuthenticated ? props.logout() : props.login())}>
        <FontAwesomeIcon icon={props.isAuthenticated ? faSignOutAlt : faSignInAlt} />

        <Box className={styles['menuItem']}>{props.isAuthenticated ? 'Logout' : 'Login'}</Box>
      </MenuItem>
    </MenuList>
  </Menu>
);

export default BadgeMenu;
