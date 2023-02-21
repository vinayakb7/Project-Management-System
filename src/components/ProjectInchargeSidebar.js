import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const PICSidebar = [
  {
    title: 'Home',
    path: '/projectIncharge',
    icon: <AiIcons.AiFillHome />,
    cName: 'navtext'
  },
  {
    title: 'View Projects',
    path: '/icProject',
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
