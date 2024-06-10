import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { HeadlineType } from './AdminPanel'
import { Button } from '@/components/ui/button'
import { getHeadliner } from '@/apiCaller/headliner'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/components/ui/use-toast'
function Get() {
    const [id, setId] = useState<string | "">("")
    const [headline, setHeadline] = useState<HeadlineType>()

    useEffect(() => {

    }, [id])
    
    function handleOnChangeId (e: any){
        e.preventDefault()
        setId((prev) => e.target.value)
    }

    async function handleOnClickId (){
        const response = await getHeadliner(id.toString());
        if(response.data.topic && response.data.headliner){
            setHeadline((prev) => response.data)
        } else {
            toast({
                title: "Getting Data Not Successful",
                description: "Getting Headline of Id: " + id  + " Was Not Successful, Please Contact Us For Possible Errors"
            })
        }
    }
    
    return (
        <section className={cn("flex flex-wrap w-[100%] mt-10 ml-3 text-slate-800")}>
            <Input type="text" placeholder="Write Down ID which you want to see" onChange={handleOnChangeId} className={cn("flex flex-wrap w-8/12 mr-2")} />
            <Button onClick={handleOnClickId} className={cn("flex flex-wrap w-3/12 text-white ")}>{"Select This ID"} </Button>
            {
                headline &&
                <div className={cn('flex flex-wrap w-[100%] mt-10 ml-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900')}>
                    <h2 className={cn("w-[100%] text-left")}>{headline.topic}</h2>
                    <p className={cn("w-[100%] text-left mb-10 text-lg font-medium")}>topic</p>
                    <h2 className={cn("w-[100%] text-left")}>{headline.headliner}</h2>
                    <p className={cn("w-[100%] text-left mb-10 text-lg font-medium")}>headliner</p>
                </div>
            }
            <Toaster/>
        </section>
    )
}

export default Get