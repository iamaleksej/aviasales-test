const actionCreateUser = (newUser) => {
   return {
      type: 'CREATE_USER',
      payload: newUser
   }
}

const actionRewriteUserToFull = (rewriteUser) => {
   return {
      type: 'REWRITE_USER',
      payload: rewriteUser
   }
}

const actionUpdateUser = (key, value) => {
   return {
      type: 'UPDATE_USER',
      payload: {
         key,
         value
      }
   }
}

export {
   actionCreateUser,
   actionUpdateUser,
   actionRewriteUserToFull
}