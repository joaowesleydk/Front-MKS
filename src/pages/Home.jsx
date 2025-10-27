import React from "react";
import Hero from "../components/Hero";



export const Home = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 p-4   ">
         
            <div className=" flex-grow">
              <Hero/>
            </div>
        
        </div>
        </>
    )
}




