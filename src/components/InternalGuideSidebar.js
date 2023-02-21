import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const IGSidebar = [
  {
    title: 'Home',
    path: '/internalGuide',
    icon: <AiIcons.AiFillHome />,
    cName: 'navtext'
  },
  {
    title: 'View Projects',
    path: '/igProject',
    icon: <IoIcons.IoIosPaper />,
    cName: 'navtext'
  },
  {
    title: 'Change Password',
    path: '/changePassword',
    icon: <IoIcons.IoMdPeople />,
    cName: 'navtext'
  }
];
