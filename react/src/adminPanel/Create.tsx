import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { HeadlineType } from './AdminPanel'
import { Button } from '@/components/ui/button'
import { createHeadliner } from '@/apiCaller/headliner'
import { cn } from '@/lib/utils'
import { Toaster } from '../components/ui/toaster';
import { toast } from '@/components/ui/use-toast'
function Create() {
    const [headline, setHeadline] = useState<HeadlineType>()

    useEffect(() => {

    }, [headline])
    
    function handleChangeHeadline (e: any, type:string | ""){
        e.preventDefault()
        setHeadline((prev: any) => ({
            ...prev,
            [type]: e.target.value
            }))
    }

    async function handleOnClickCreate (){
        const response = await createHeadliner(headline ?? "");
        console.log(response)
        if(response.data.topic && response.data.headliner){
            setHeadline((prev) => response.data)
            toast({
                title: "Success",
                description: "Headline Created with Id: " + response.data.id
            })
        } else {
            toast({
                title: "Create Not Successful",
                description: "Create Headline Was Not Successful, Please Contact Us For Possible Errors"
            })
        }
    }
    
    return (
        <section className={cn("flex flex-wrap w-[100%] mt-10 ml-3 text-slate-800")}>
            <h2 className={cn("w-[100%] text-left mb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900")}>Topic</h2>
            <Input type="text" id="topic" placeholder="Topif of The Headline" onChange={(e) => handleChangeHeadline(e, "topic") } className={cn("flex flex-wrap w-8/12 mr-2")} />
            <h2 className={cn("w-[100%] text-left mb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 mt-10")}>Headline</h2>
            <Input type="text" id="headliner" placeholder="Write Down The Headline" onChange={(e) => handleChangeHeadline(e, "headliner") } className={cn("flex flex-wrap w-8/12 mr-2")} />
            <Button onClick={handleOnClickCreate} className={cn("flex flex-wrap w-5/12 text-white mt-10")}>{"Create"} </Button>
            <Toaster/>
        </section>
    )
}

export default Create