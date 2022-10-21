import React, { useEffect, useState } from "react";
import { createCookies } from "../../services/cookies";
import { actionCreateUser, actionRewriteUserToFull, actionUpdateUser } from '../../actions'
import { connect } from 'react-redux'
import { compose } from '../../utils';
import { withUserService } from '../hoc';
import Header from '../Header'
import { HomePage, FinalPage } from '../pages'
import './App.sass';
import { Routes, Route } from "react-router-dom";
import axios from 'axios'

axios.defaults.withCredentials = true

const App = ({ userService, user }) => {

   const [page, setPage] = useState(true)
   const onClickToChangeHomePage = () => {
      setPage(true)
   }
   const onClickToChangeFinalPage = () => {
      setPage(false)
   }
   useEffect(() => {
      userService.getUser(user)
      createCookies();
   }, [])

   useEffect(() => {
      if (user.shared || user.email !== null) {
         userService.sendUpdateUser(user)
      }

   }, [user])

   return (
      <>
         <Header onClickToChangeHomePage={onClickToChangeHomePage} />
         <Routes>
            <Route
               path='/'
               element={page ? <HomePage onClickToChangeFinalPage={onClickToChangeFinalPage} /> : <FinalPage />}
            />
         </Routes>
      </>
   )
}

const mapStateToProps = ({ user }) => {
   return { user }
}

const mapDispatchToProps = {
   actionCreateUser,
   actionUpdateUser,
   actionRewriteUserToFull
}

export default compose(
   withUserService(),
   connect(mapStateToProps, mapDispatchToProps)
)(App);