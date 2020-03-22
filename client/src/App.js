import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Rigister'
import Dashbord from './components/dashboard/dashboard'
import PrivateRoute from './common/PrivateRoute'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import './App.css';

//Provider在根组件外面包了一层,这样一来,App的所有子组件都默认可以拿到state
import { Provider } from 'react-redux';

import store from './store';
import { setCurrentUser, logout } from './actions/authActions';
import CreateProfile from './components/create-profile/CreateProfile';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  //解析token
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded));

  //检测token是否过期

  //检测当前时间
  const currentTime = Date.now() / 1000

  //判断是否打羽token过期时间
  if (decoded.exp < currentTime) {
    //过期
    store.dispatch(logout())

    //清除用户信息


    //页面跳转
    window.location.href = '/login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className="container">
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:handle' component={Profile} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashbord} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/add-education' component={AddEducation} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>

    </Provider>
  );
}

export default App;
