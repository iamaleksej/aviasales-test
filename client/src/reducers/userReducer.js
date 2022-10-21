const initialState = {
   user: { 'shared': false, 'email': null }
}

const userReducer = (state = initialState, action) => {

   console.log(state.user)

   switch (action.type) {

      case 'CREATE_USER':
         return {
            user: action.payload
         }
      case 'REWRITE_USER':
         console.log(action.payload)
         return {
            user: action.payload
         }
      case 'UPDATE_USER':

         return {
            user: {
               ...state.user,
               [action.payload.key]: action.payload.value
            }
         }
      default:
         return state
   }

}
export default userReducer