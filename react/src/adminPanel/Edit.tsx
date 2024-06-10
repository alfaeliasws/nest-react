import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { HeadlineType } from './AdminPanel'
import { Button } from '@/components/ui/button'
import { createHeadliner, getHeadliner, updateHeadliner } from '@/apiCaller/headliner'
import { cn } from '@/lib/utils'
import { Toaster } from '../components/ui/toaster';
import { toast } from '@/components/ui/use-toast'
function Edit() {
    const [headline, setHeadline] = useState<HeadlineType>()
    const [id, setId] = useState<string| "">("")

    useEffect(() => {

    }, [headline])

    function handleOnChangeId (e: any){
        e.preventDefault()
        setId((prev) => e.target.value)
    }

    async function handleOnClickId (){
        const response = await getHeadliner(id.toString());
        if(response.data.topic && response.data.headliner){
            setHeadline((prev) => response.data)
        }
    }
    
    function handleChangeHeadline (e: any, type:string | ""){
        e.preventDefault()
        setHeadline((prev: any) => ({
            ...prev,
            [type]: e.target.value
            }))
    }

    async function handleOnClickEdit (){
        const response = await updateHeadliner(headline ?? {id: "0", topic: "", headliner: ""});
        console.log(response)
        if(response.data.topic && response.data.headliner){
            setHeadline((prev) => response.data)
            toast({
                title: "Edit Success",
                description: "Update Headline of Id: " + id
            })
        } else {
            toast({
                title: "Edit Not Successful",
                description: "Update Headline of Id: " + id  + " Was Not Successful, Please Contact Us For Possible Errors"
            })
        }
    }
    
    return (
        <section className={cn("flex flex-wrap w-[100%] mt-10 ml-3 text-slate-800")}>
            <Input type="text" placeholder="Write Down ID which you want to edit" onChange={handleOnChangeId} className={cn("flex flex-wrap w-8/12 mr-2")} />
            <Button onClick={handleOnClickId} className={cn("flex flex-wrap w-3/12 text-white ")}>{"Select This ID"} </Button>

            {
                headline && 
                <>
                     <h2 className={cn("w-[100%] text-left mb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900")}>Topic</h2>
                    <Input type="text" id="topic" placeholder="Topif of The Headline" onChange={(e) => handleChangeHeadline(e, "topic") } className={cn("flex flex-wrap w-8/12 mr-2")} value={headline.topic} />
                    <h2 className={cn("w-[100%] text-left mb-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 mt-10")}>Headline</h2>
                    <Input type="text" id="headliner" placeholder="Write Down The Headline" onChange={(e) => handleChangeHeadline(e, "headliner") } className={cn("flex flex-wrap w-8/12 mr-2")} value={headline.headliner} />
                    <Button onClick={handleOnClickEdit} className={cn("flex flex-wrap w-5/12 text-white mt-10")}>{"Edit"} </Button>
                    <Toaster/>
                </>

            }
           
        </section>
    )
}

export default Edit