import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import AddUser from './Admin/AddUser';
import AdminDashboard from './Admin/Dashboard';
import StudentDashboard from './Student/Dashboard';
import UploadProject from './Student/UploadProject';
import ViewProject from './Student/ViewProject';
import ChangePassword from './ChangePassword';
import EditProject from './Student/EditProject';
import HODDashboard from './HOD/Dashboard';
import HODProjects from './HOD/ViewProjects';
import HODFeedback from './HOD/Feedback';
import IGDashboard from './InternalGuide/Dashboard';
import IGFeedback from './InternalGuide/Feedback';
import IGProjects from './InternalGuide/ViewProjects';
import ICDashboard from './ProjectIncharge/Dashboard';
import ICFeedback from './ProjectIncharge/Feedback';
import PICProjects from './ProjectIncharge/ViewProjects';
import ForgotPassword from './ForgotPassword';
import ViewUsers from './Admin/ViewUsers';
import EditUser from './Admin/EditUser';
import ViewRoles from './Admin/ViewRoles';
import EditRole from './Admin/EditRole';
import AddRole from './Admin/AddRole';
import AddPermission from './Admin/AddPermission';
import EditPermission from './Admin/EditPermission';
import ViewPermissions from './Admin/ViewPermissions';
import SendNotification from './Admin/Notification';
import ProfileDetails from './Student/ProfileDetails';
import Feedback from './Student/Feedback';

function App() {
  var hours = 1;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setUpTime');
  if(setupTime == null){
    localStorage.setItem('setupTime',now);
  }else{if(now-setupTime > hours*60*60*1000){localStorage.clear();localStorage.setItem('setupTime',now);}}
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/admin' component={AdminDashboard} />
          <Route path='/student' component={StudentDashboard} />
          <Route path='/products' component={Products} />
          <Route path='/AddUser' component={AddUser} />
          <Route path='/uploadProject' component={UploadProject} />
          <Route path='/viewProject' component={ViewProject} />
          <Route path='/changePassword' component={ChangePassword} />
          <Route path='/editProject/:id' component={EditProject} />
          <Route path='/hod' component={HODDashboard} />
          <Route path='/hodProjects' component={HODProjects} />
          <Route path='/hodFeedback/:id' component={HODFeedback} />
          <Route path='/internalGuide' component={IGDashboard} />
          <Route path='/igFeedback/:id' component={IGFeedback} />
          <Route path='/igProject' component={IGProjects} />
          <Route path='/projectIncharge' component={ICDashboard} />
          <Route path='/icFeedback/:id' component={ICFeedback} />
          <Route path='/icProject' component={PICProjects} />
          <Route path='/forgot' component={ForgotPassword} />
          <Route path='/viewUsers' component={ViewUsers} />
          <Route path='/editUser/:id' component={EditUser} />
          <Route path='/Addrole' component={AddRole} />
          <Route path='/viewRoles' component={ViewRoles} />
          <Route path='/editRole/:id' component={EditRole} />
          <Route path='/Addpermission' component={AddPermission} />
          <Route path='/viewPermissions' component={ViewPermissions} />
          <Route path='/editPermission/:id' component={EditPermission} />
          <Route path='/notification/:email' component={SendNotification} />
          <Route path='/profileDetails' component={ProfileDetails} />
          <Route path='/feedback/:id/:name' component={Feedback} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
