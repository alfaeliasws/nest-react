import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { HeadlineType } from './AdminPanel'
import { Button } from '@/components/ui/button'
import { deleteHeadliner, getHeadliner } from '@/apiCaller/headliner'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
function Delete() {
    const [id, setId] = useState<string | "">("")
    const [headline, setHeadline] = useState<HeadlineType>()

    const navigate = useNavigate()

    useEffect(() => {

    }, [id])
    
    function handleOnChangeId (e: any){
        e.preventDefault()
        setId((prev) => e.target.value)
    }

    async function handleOnClickId (){
        const response = await getHeadliner(id.toString());
        console.log({response})
        if(response.data.topic && response.data.headliner){
            setHeadline((prev) => response.data)
        }
    }

    async function handleOnClickYes (){
        const response = await deleteHeadliner(id.toString());
        if(response.data){
            setHeadline((prev) => response.data)
            toast({
                title: "Delete Success",
                description: "Delete Headline of Id: " + id
            })
        } else {
            toast({
                title: "Delete Not Successful",
                description: "Delete Headline of Id: " + id  + " Was Not Successful, Please Contact Us For Possible Errors"
            })
        }
    }

    async function handleOnClickNo (){
        setId((prev) => "")
        setHeadline((prev) => {return {
            topic: "",
            headliner: "",
            id: ""
        }})
    }
    
    return (
        <section className={cn("flex flex-wrap w-[100%] mt-10 ml-3 text-slate-800")}>
            <Input type="text" placeholder="Write Down ID which you want to see" onChange={handleOnChangeId} className={cn("flex flex-wrap w-8/12 mr-2")} />
            <Button onClick={handleOnClickId} className={cn("flex flex-wrap w-3/12 text-white ")} value={id}>{"Select This ID"} </Button>
            {
                headline?.topic && headline?.headliner &&
                <div className={cn('flex flex-wrap w-[100%] mt-10 ml-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900')}>
                    <h2 className={cn("w-[100%] text-left")}>{headline.topic}</h2>
                    <p className={cn("w-[100%] text-left mb-10 text-lg font-medium")}>topic</p>
                    <h2 className={cn("w-[100%] text-left")}>{headline.headliner}</h2>
                    <p className={cn("w-[100%] text-left mb-10 text-lg font-medium")}>headliner</p>
                    <h2 className={cn("w-[100%] text-left text-lg")}>Are You Sure You Want To Delete This Item?</h2>
                    <Button onClick={handleOnClickYes} className={cn("flex flex-wrap w-3/12 text-white hover:bg-red-700 mr-3")}>{"Yes"} </Button>                    
                    <Button onClick={handleOnClickNo} className={cn("flex flex-wrap w-3/12 text-white ")}>{"No"} </Button>
                    <Toaster />
                </div>
            }
        </section>
    )
}

export default Delete