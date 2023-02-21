import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const HODSidebar = [
  {
    title: 'Home',
    path: '/hod',
    icon: <AiIcons.AiFillHome />,
    cName: 'navtext'
  },
  {
    title: 'View Projects',
    path: '/hodProjects',
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
