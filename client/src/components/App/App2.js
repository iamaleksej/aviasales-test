import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { actionCreateUser, actionRewriteUserToFull, actionUpdateUser } from '../../actions'
import { useInput } from "../hooks";
import { connect } from 'react-redux'
import { compose } from '../../utils';
import { withUserService } from '../hoc';
import { createCookies } from "../../services/cookies";
import Header from '../Header'
import Button from '../Button'
import HomePage from '../pages'
import FinalPage from '../pages'
import './App.sass';
import check from '../../assets/img/check.png'
import axios from 'axios'

axios.defaults.withCredentials = true

const App = ({ userService, user }) => {
   const email = useInput('', { isEmail: true, isEmpty: true })
   const dispatch = useDispatch();
   const shareUrl = 'https://www.aviasales.ru'

   const [isDisabledSocials, setDisabledSocials] = useState(false)
   const [isDisabledEmail, setDisabledEmail] = useState(false)
   const [isFirstPoint, setFirstPoint] = useState(false)

   const links = {
      'facebook': `https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3D${shareUrl}&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=ru_RU`,
      'vk': `https://vk.com/share.php?url=${shareUrl}&noparse=0&no_vk_links=0`,
      'twitter': `https://twitter.com/intent/tweet?url=${shareUrl}`,
      'ok': `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${shareUrl}`
   }
   const { facebook, vk, twitter, ok } = links

   useEffect(() => {
      userService.getUser(user)
      createCookies();
   }, [])

   useEffect(() => {
      if (user.shared || user.email !== null) {
         userService.sendUpdateUser(user)
      }

   }, [user])

   const onClickShareButton = async (link) => {
      const shareWindow = window.open(link, '_blank', 'toolbar=0,location=0,menubar=0,width=500,height=500');

      dispatch(actionRewriteUserToFull(userService.userFullData))

      const timer = setInterval(() => {
         if (shareWindow.closed) {
            clearInterval(timer);
            setDisabledSocials(true)
            dispatch(actionUpdateUser('shared', true))
         }
      }, 1);
   }

   const checkPoints = () => {

      if (!(email.isDirty && email.emailError) && isDisabledSocials && (email.isDirty && !email.isEmpty)) {
         setDisabledEmail(true)
         setFirstPoint(false)
         setFirstPoint(false)
         dispatch(actionUpdateUser('email', email.value))
      }
      else {
         setFirstPoint(true)
      }

   }


   const submit = () => {
      console.log(user)
      checkPoints()
      // createCookies();
   }

   return (
      <>
         <Header />
         <HomePage />
         {/* <FinalPage /> */}
         {/* <main className="container content-main-wrap">
            <div className="content-main">
               <div className="form">
                  <h1 className="title">Чтобы выиграть<br />путешествие</h1>
                  <div className="points">
                     {isFirstPoint && <p className="common-invalid">Выполните все пункты</p>}
                     <div className="point">
                        <div className="point__number point__number-one">
                           {!isDisabledSocials
                              ? '1.'
                              : <img src={check} className="check-image" alt='check' />}
                        </div>
                        <div className={!isDisabledSocials ? "point__title-icons" : "point__title-icons overlay"}>
                           <p className="point__title">Поделись с друзьями:</p>
                           <div className="point__icons">
                              <Button className='point__icon point__icon-vk'
                                 type='button'
                                 onClickEvent={() => onClickShareButton(vk)}
                                 disabled={isDisabledSocials} />
                              <Button className='point__icon point__icon-fb'
                                 type='button'
                                 onClickEvent={() => onClickShareButton(facebook)}
                                 disabled={isDisabledSocials} />
                              <Button className='point__icon point__icon-tw'
                                 type='button'
                                 onClickEvent={() => onClickShareButton(twitter)}
                                 disabled={isDisabledSocials} />
                              <Button className='point__icon point__icon-ok'
                                 type='button'
                                 onClickEvent={() => onClickShareButton(ok)}
                                 disabled={isDisabledSocials} />
                           </div>
                        </div>
                     </div>
                     <div className="point">
                        <div className="point__number point__number-two">
                           {!isDisabledEmail
                              ? '2.'
                              : <img src={check} classname="check-image" alt='check' />}
                        </div>
                        <div className={!isDisabledEmail ? "point__title-email" : "point__title-email overlay"}>
                           <p className="point__title">Оставь почту:</p>
                           {(email.isDirty && email.isEmpty) && <div className="invalid">Поле не может быть пустым</div>}
                           {(email.isDirty && email.emailError && !email.isEmpty) && <div className="invalid">Некорректный email</div>}
                           <input className="point__email"
                              onChange={e => email.onChange(e)}
                              onBlur={e => email.onBlur(e)}
                              value={email.value}
                              autoComplete='off'
                              name="email"
                              disabled={isDisabledEmail}
                              type="text" />
                        </div>
                     </div>
                  </div>
                  {!isDisabledEmail &&
                     <Button className='btn'
                        type='submit'
                        onClickEvent={submit}
                        titleBtn={'Отправить'} />
                  }
               </div>
            </div>
         </main> */}
         {/* <main className="container content-final-wrap">
            <div className="content-final"></div>
         </main> */}
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