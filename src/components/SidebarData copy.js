import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
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
    title: 'Project Feedback',
    path: '/hodFeedback',
    icon: <FaIcons.FaCartPlus />,
    cName: 'navtext'
  }
];
