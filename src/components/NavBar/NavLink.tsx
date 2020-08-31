import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to: string;
}

const NavLink: FC<IProps> = ({ children, ...props }) => (
  <Link color="white" {...props}>
    {children}
  </Link>
);

export default NavLink;
