import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
   const [emailError, setEmailError] = useState(false)
   const [isEmpty, setEmpty] = useState(true)

   useEffect(() => {
      for (const validation in validations) {
         switch (validation) {
            case 'isEmail':
               const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               re.test(String(value).toLowerCase()) ? setEmailError(false)
                  : setEmailError(true)
               break;
            case 'isEmpty':
               value ? setEmpty(false) : setEmpty(true)
               break;
         }
      }
   }, [value])

   return {
      emailError,
      isEmpty
   }
}
const useInput = (initialValue, validations) => {
   const [value, setValue] = useState(initialValue)
   const [isDirty, setDirty] = useState(false)
   const valid = useValidation(value, validations)

   const onChange = (e) => {
      setValue(e.target.value)
   }

   const onBlur = (e) => {
      setDirty(true)
   }

   return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
   }
}

export {
   useValidation,
   useInput
}