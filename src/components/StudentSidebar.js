import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const StudentSidebar = [
  {
    title: 'Home',
    path: '/student',
    icon: <AiIcons.AiFillHome />,
    cName: 'navtext'
  },
  {
    title: 'Profile Details',
    path: '/profileDetails',
    icon: <AiIcons.AiTwotoneProfile />,
    cName: 'navtext'
  },
  {
    title: 'Upload Project',
    path: '/uploadProject',
    icon: <IoIcons.IoIosPaper />,
    cName: 'navtext'
  },
  {
    title: 'View Projects',
    path: '/viewProject',
    icon: <AiIcons.AiOutlineOrderedList />,
    cName: 'navtext'
  },
  {
    title: 'Change Password',
    path: '/changePassword',
    icon: <IoIcons.IoMdPeople />,
    cName: 'navtext'
  }
];
