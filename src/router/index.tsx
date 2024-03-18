import React from "react";
import {Navigate} from "react-router-dom";
import LotteryCard from "@/pages/LotteryCard.tsx";
import Dice from "@/pages/Dice.tsx";
import Home from "@/pages/Home.tsx";

export interface RouteObject {
    path: string;
    name?:string
    children?: RouteObject[];
    element: React.ReactNode;
}
const routes:RouteObject[] = [
    {
        path: '/',
        element:<Navigate to={'/home'}/>
    },
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/lotteryCard',
        element:<LotteryCard/>
    },
    {
        path:'/dice',
        element:<Dice/>
    }
]
export default routes
