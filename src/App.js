import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import PostCreate from './components/Post/PostCreate';
import PostDetails from './components/Post/PostDetails';
import Profile from './components/Home/Profile';
import PostEdit from './components/Post/PostEdit';
import ForgotPassword from './components/Auth/ForgotPassword';
import ChangePassword from './components/Auth/ChangePassword';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/registration' component={Registration}></Route>
          <Route path='/forgot-password' component={ForgotPassword}></Route>
          <Route path='/profiles' component={Profile}></Route>

          <Route path='/posts/create' component={PostCreate}></Route>
          <Route path='/posts/:id/edit' component={PostEdit}></Route>
          <Route path='/posts/:id' component={PostDetails}></Route>

          <Route path='/password/reset/:id/:token' component={ChangePassword}></Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
