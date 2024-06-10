import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { HeadlineType } from './AdminPanel'
import { Button } from '@/components/ui/button'
import { getHeadliner } from '@/apiCaller/headliner'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/apiCaller/auth'
function Logout() {

    const navigate = useNavigate()

    useEffect(() => {

    }, [])
    
    async function handleOnClickYes (){
        const response = await logout();
        if(response.data){
            navigate("/login")
        }
    }

    async function handleOnClickNo (){
        navigate("/adminPanel/createHeadline")
    }
    
    return (
        <section className={cn("flex flex-wrap w-[100%] mt-10 ml-3 text-slate-800")}>
            <div className={cn('flex flex-wrap w-[100%] mt-10 ml-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900')}>
                <h2 className={cn("w-[100%] text-left text-lg")}>Are You Sure You Want To Log Out?</h2>
                <Button onClick={handleOnClickYes} className={cn("flex flex-wrap w-3/12 text-white hover:bg-red-700 mr-3")}>{"Yes"} </Button>                    
                <Button onClick={handleOnClickNo} className={cn("flex flex-wrap w-3/12 text-white ")}>{"No"} </Button>
            </div>
        </section>
    )
}

export default Logout