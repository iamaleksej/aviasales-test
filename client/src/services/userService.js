const url = 'http://localhost:8080/api/user'
class userService {

   constructor() {
      this.userFullData = {}
   }

   getUser = async (newData) => {

      try {
         const request = async () => {
            const res = await fetch(url, {
               headers: { "Content-Type": "application/json; charset=utf-8" },
               method: "POST",
               body: JSON.stringify(newData)
            });
            this.userFullData = await res.json();
            console.log('send')

            if (!res.ok) {
               throw new Error(this.userFullData);
            }
         };
         if (newData) {
            request();
         }
      } catch (e) {
         return e;
      }
   };

   sendUpdateUser = async (updateUser) => {

      try {
         const request = async () => {
            const res = await fetch(url, {
               headers: { "Content-Type": "application/json; charset=utf-8" },
               method: "PUT",
               body: JSON.stringify(updateUser)
            });
            const data = await res.json();
            console.log('update user')

            if (!res.ok) {
               throw new Error(data);
            }
         };
         if (updateUser) {
            request();
         }
      } catch (e) {
         return e;
      }
   };

}


export default userService;