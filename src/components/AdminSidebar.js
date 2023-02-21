import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const AdminSidebar =[
    {
        title: 'Home',
        path: '/admin',
        icon: <AiIcons.AiFillHome />,
        cName: 'navtext'
      },
      {
        title: 'Add User',
        path: '/AddUser',
        icon: <AiIcons.AiOutlineUserAdd/>,
        cName: 'navtext'
      },
      {
        title: 'View User',
        path: '/viewUsers',
        icon: <AiIcons.AiOutlineOrderedList />,
        cName: 'navtext'
      },
      {
        title: 'Add Role',
        path: '/Addrole',
        icon: <AiIcons.AiFillPlusCircle />,
        cName: 'navtext'
      },
      {
        title: 'View Role',
        path: '/viewRoles',
        icon: <AiIcons.AiOutlineOrderedList />,
        cName: 'navtext'
      },
      {
        title: 'Add Permission',
        path: '/Addpermission',
        icon: <AiIcons.AiFillPlusSquare />,
        cName: 'navtext'
      },
      {
        title: 'View Permissions',
        path: '/viewPermissions',
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