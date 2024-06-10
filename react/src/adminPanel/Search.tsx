import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { HeadlineType } from './AdminPanel'
import { Button } from '@/components/ui/button'
import { getHeadliner, searchHeadliner } from '@/apiCaller/headliner'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/components/ui/use-toast'
function Search() {
    const [highlight, setHighlight] = useState<string | "">("")
    const [headlines, setHeadlines] = useState<HeadlineType[]>()

    useEffect(() => {

    }, [highlight])
    
    function handleOnChangeHighlight (e: any){
        e.preventDefault()
        setHighlight((prev) => e.target.value)
    }

    async function handleClickSearch (){
        const response = await searchHeadliner(highlight.toString(), "10", "1");
        console.log(response)
        if(response.data.length > 0){
            setHeadlines((prev) => response.data)
        } else {
            toast({
                title: "Getting Data Not Successful",
                description: "Search Headline of Highlight: " + highlight  + " Was Not Successful, Please Contact Us For Possible Errors"
            })
        }
    }
    
    return (
        <section className={cn("flex flex-wrap w-[100%] mt-10 ml-3 text-slate-800")}>
            <Input type="text" placeholder="Write Down Highlight Keywords" onChange={handleOnChangeHighlight} className={cn("flex flex-wrap w-8/12 mr-2")} />
            <Button onClick={handleClickSearch} className={cn("flex flex-wrap w-3/12 text-white ")}>{"Search About This"} </Button>
            {
                headlines &&
                headlines.map((headline) => {
                    return (
                    <div className={cn('flex flex-wrap w-[100%] mt-10 ml-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900')}>
                        <h2 className={cn("w-[100%] text-left")}>{headline.topic}</h2>
                        <p className={cn("w-[100%] text-left mb-10 text-lg font-medium")}>topic</p>
                        <h2 className={cn("w-[100%] text-left")}>{headline.headliner}</h2>
                        <p className={cn("w-[100%] text-left mb-10 text-lg font-medium")}>headliner</p>
                        <Separator />
                    </div>
                    )
                })
            }
            <Toaster/>
        </section>
    )
}

export default Search