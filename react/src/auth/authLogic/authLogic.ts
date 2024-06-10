import { authType } from "../Auth";

export default function InputLogic(e: any, type: string | "", setAuth: any, auth: authType | ""){    
    setAuth((prev : authType): authType => {
        if(type === "username" || type === "password"){
            return {
                ...prev,
                [type]: e.target.value
                }
        }
        return prev
    })
}