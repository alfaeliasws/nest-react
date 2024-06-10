import { Dispatch, SetStateAction } from "react"
import { authType } from "../Auth"
import InputLogic from "../authLogic/authLogic"

type inputType = {
    type: string | "",
    id: string | "",
    name?: string,
    label?: string,
    placeholder?: string,
    autofocus?: boolean,
    setAuth: Dispatch<SetStateAction<authType | undefined>>,
    auth: authType | ""
  } 

export default function Input({type, id, name, label, placeholder, autofocus, setAuth, auth}: inputType) {

    return (
      <label className="text-gray-500 block mt-3 text-left">{label}
        <input
          autoFocus={autofocus}
          type={type} 
          id={id} 
          name={name} 
          placeholder={placeholder}
          onChange={(e)=> InputLogic(e, id, setAuth, auth)}
          className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-100"/>
      </label>
    )
  }
  