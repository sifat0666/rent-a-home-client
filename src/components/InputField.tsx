import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { useField} from 'formik'
import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  lable: string
  // placeholder: string,
  name: string
  textarea?: boolean

}


const InputField: React.FC<InputFieldProps> = ({lable,textarea, size,  ...props}) => {

  let C = Input

  if(textarea){
    C = Textarea
  }

  const [field, meta] = useField(props) 

  // const errorText = meta.error && meta.touched ? meta.error : ''

  return(

        <FormControl isInvalid={!!meta.error}>
          <FormLabel htmlFor={field.name}>{lable}</FormLabel>
          <C {...props} {...field}  />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>

  )
}

export default InputField
