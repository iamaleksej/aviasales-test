import React from "react";
import { UserServiceConsumer } from "../UserServiceContext";

const withUserService = () => (Wrapped) => {

   return (props) => {
      return (
         <UserServiceConsumer>
            {
               (userService) => {
                  return (<Wrapped {...props} userService={userService} />);
               }
            }
         </UserServiceConsumer>
      )
   }
}

export default withUserService;