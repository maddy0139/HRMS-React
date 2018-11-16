import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN,APP_TITLE } from '../constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import ForgotPassword from '../user/forgotpass/ForgotPassword';
import AdminLogin from '../admin/login/AdminLogin';
import AdminRegistration from '../admin/signup/AdminRegistration';
import Home from '../home/Home';
import PersonalProfile from '../user/profile/PersonalProfile';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin:false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentWillMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: APP_TITLE,
      description: description,
    });
  }

  handleLogin(roles) {
    if(roles)
    {
      roles.map(role=>{
        if(role.name === "ROLE_ADMIN")
            this.setState({isAdmin:true});
      });
    }
    notification.success({
      message: APP_TITLE,
      description: "You're successfully logged in.",
    });

    this.loadCurrentUser();
    this.props.history.push("/home");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} isAdmin = {this.state.isAdmin}/>

          <Content className="app-content">
            <div className="container">
              <Switch>  
                {this.state.isAuthenticated &&
                  <Route exact path="/" 
                    render={(props) => <Home isAuthenticated={this.state.isAuthenticated} 
                        currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                  </Route>
                }
                {!this.state.isAuthenticated &&
                  <Route exact path="/" 
                    render={(props) => <Login isAuthenticated={this.state.isAuthenticated} 
                        currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                  </Route>
                }  
                <Route path="/login" 
                  render={(props) => <Login isAdmin={this.isAdmin} onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/admin/login" 
                  render={(props) => <AdminLogin isAdmin={this.isAdmin} onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/admin/registration" component={AdminRegistration}></Route>
                <Route path="/forgotpass" component={ForgotPassword}></Route>
                <Route path="/users/:username" 
                  render={(props) => <PersonalProfile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/home" component={Home} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/profile" component={PersonalProfile} handleLogout={this.handleLogout}></PrivateRoute>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
