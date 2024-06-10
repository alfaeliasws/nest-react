import { useEffect, useState } from "react";
import Button from "./authComponent/Button";
import Input from "./authComponent/Input";
export type authType = {
    username?: string,
    password?: string
}

export default function LoginForm() {
    const [auth, setAuth] = useState<authType>();

    useEffect(() => {},[auth])

    return (
      <div className="flex justify-center items-center max-w-screen max-h-screen">
        <div className=" border-t-8 rounded-sm border-gray-600 bg-white p-12 shadow-2xl w-96">
          <h1 className="font-bold text-center block text-2xl">Log In</h1>
          <form>
          <Input type="text" id="username" name="username" label="Username" placeholder="Enter your username" autofocus={true} setAuth={setAuth} auth={auth ?? ""}/>
          <Input type="password" id="password" name="password" label="Password" placeholder="Enter your password" setAuth={setAuth} auth={auth ?? ""}/>
          <Button value="Sign In" object={auth}/>
          </form>
        </div>
      </div>
    )
  }