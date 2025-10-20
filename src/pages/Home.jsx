import React from "react";
import Hero from "../components/Hero";



export const Home = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4
      bg-[url('/fundohome.png')] bg-cover bg-center bg-no-repeat">
         
            <div className=" flex-grow">
             <Hero/>
            </div>
        
        </div>
        </>
    )
}




