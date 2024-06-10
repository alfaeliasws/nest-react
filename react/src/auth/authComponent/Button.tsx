import { authType } from "../Auth"
import { login } from "../../apiCaller/auth"
import { useNavigate } from "react-router-dom"

type buttonPropsType = {
    value: string,
    object?: authType
}

export default function Button({value, object}: buttonPropsType) {
    
    const navigate = useNavigate()

    async function loginClick(e: any): Promise<void>{
        e.preventDefault()
        const loginResult = await login(object ?? "")
        sessionStorage.setItem("token", loginResult.data.token)
        navigate("/adminPanel/createHeadline")
    }

    return (
      <button 
        onClick={loginClick}
        className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-gray-400 to-slate-800 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        {value}
    </button>
    )
  }