import NavHeader from "@/components/NavHeader.tsx";
import {Cell} from "react-vant";
import React from "react";
import {StarO} from "@react-vant/icons";
import {css} from "@emotion/css";
import {useNavigate} from "react-router-dom";

const games = [{
    "gameId": "76",
    "type": 4,
    "code": "scratch",
    "name": "scratchTicket",
    "vndArea": "scratchTicket",
    "path": 'lotteryCard'
}, {
    "gameId": "78",
    "type": 4,
    "code": "dice",
    "name": "redWhiteDice",
    "vndArea": "redWhiteDice",
    "path": 'dice'
}]
const Home = () => {
    const navigate=useNavigate()
    return (
        <>
            <NavHeader tit={'游戏列表'} hideLeft={true}/>
            <div className={css`
                margin-top: 100px;
            `}>
                {games.map((it) => (
                    <Cell
                        onClick={()=>navigate(`/${it.path}`)}
                        center
                        key={it.gameId}
                        title={`game ${it.name}`}
                        label={it.code}
                        icon={<StarO/>}
                        isLink
                    />
                ))}
            </div>
        </>
    );
};
export default Home
