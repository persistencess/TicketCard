import React, {FC} from 'react';
import { Toast, NavBar } from 'react-vant';
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "@react-vant/icons";
type Props={
    tit:string,
    hideLeft?:boolean
}
const NavHeader:FC<Props> = ({tit,hideLeft})=> {
    const navigate=useNavigate()
    return (
        <NavBar
            title={tit}
            leftArrow={hideLeft?false:<ArrowLeft/>}
            leftText={hideLeft?'':'返回'}
            onClickLeft={() =>navigate(-1)}
        />
    );
};
export default NavHeader
