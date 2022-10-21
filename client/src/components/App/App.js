import React, { useEffect, useState } from "react";
import { createCookies } from "../../services/cookies";
import { actionCreateUser, actionRewriteUserToFull, actionUpdateUser } from '../../actions'
import { useDispatch } from 'react-redux';
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
   const dispatch = useDispatch();
   const [page, setPage] = useState(true)
   const onClickToChangeHomePage = () => {
      setPage(true)
   }
   const onClickToChangeFinalPage = () => {
      setPage(false)
   }
   useEffect(() => {
      userService.getUser(user)
      console.log('1')
   }, [])

   useEffect(() => {
      setTimeout(async () => {
         await userService.userFullData
         dispatch(actionRewriteUserToFull(userService.userFullData))
      }, 1000)
   }, [user.id])

   useEffect(() => {
      if (user.id !== undefined) {
         createCookies();
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