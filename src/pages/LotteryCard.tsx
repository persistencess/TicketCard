import NavHeader from "@/components/NavHeader.tsx";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {css} from "@emotion/css";
import {SubmitBar, Toast} from "react-vant";

const mockData = [
    ...Array(6).fill(0).map(((_, i) => {
        const r = Math.floor(Math.random() * 10000)
        return {id: r, isCheck: false, key: `${r}-${i + 1}`}
    }))
]
const mockWinD=['谢谢顾客','一等奖','谢谢顾客','二等奖','谢谢顾客','三等奖']
const LotteryCard = () => {
    const numRef=useRef<RefProps>(null)
    const [p,setP]=useState(0)
    const [index,setindex]=useState(-1)
    const submit=()=>{
        Toast.success('投注成功,投注号码...'+numRef.current!.total[0].id)
        const i =mockData.findIndex(it=>it.id===numRef.current!.total[0].id)
        setTimeout(()=>{
            numRef.current?.clearS()
            setindex(i)
            setP(0)
        },1000)
        setTimeout(()=>{
            setindex(-1)
        },3000)
    }
    return (
        <>
            <NavHeader tit={'翻翻乐'}/>
            <div className={css`
                width: 100%;
                height: 100%;
            `}>
                {/*<Card/>*/}
                <CardCom index={index}/>
                <Num state={mockData} setP={setP} ref={numRef} />
                <SubmitBar onSubmit={submit} price={p} label='价格' currency='' buttonText="投注" />
            </div>
        </>
    );
};
const Card = () => {
    const canvas = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        canvas.current!.width = window.innerWidth
        canvas.current!.height = 200
        const ctx = canvas.current?.getContext('2d')
        ctx!.strokeStyle = 'orangered'
        // ctx.rect(75,75,250,250)
        ctx!.setLineDash([10])
        // ctx.stroke()
        ctx!.lineDashOffset = 10
        ctx!.lineJoin = 'round'
        ctx!.textAlign='center'
        ctx!.textBaseline='middle'
        ctx!.font='20px 微软雅黑'
        function roll() {
            ctx!.clearRect(0, 0, 400, 400)
            ctx!.beginPath()
            ctx!.lineDashOffset -= 1
            ctx!.strokeRect(10, 10, 100, 80)
            ctx!.fillText('一等奖',55,52.5)
            ctx!.strokeStyle = 'red'
            ctx!.strokeRect(140, 10, 100, 80)
            ctx!.strokeStyle = 'green'
            ctx!.fillText('三等奖',window.innerWidth-55,52.5)
            ctx!.strokeRect(270, 10, 100, 80)
            ctx!.strokeStyle = 'blue'
            ctx!.fillText('二等奖',190,152.5)
            ctx!.strokeRect(10, 110, 100, 80)
            ctx!.strokeStyle = 'aqua'
            ctx!.strokeRect(140, 110, 100, 80)
            ctx!.strokeStyle = 'black'
            ctx!.strokeRect(270, 110, 100, 80)
            ctx!.stroke()
            ctx!.stroke()
            requestAnimationFrame(roll)
        }
        requestAnimationFrame(roll)
    }, []);
    return (
        <div className={css`
            height: 200px;
            padding: 10px;
            > canvas {
                border: 1px solid aqua;
                height: 100%;
                width: 100%;
            }
        `}>
            <canvas ref={canvas}/>
        </div>
    )
}
const CardCom=({index}:{index:number})=> {
    return <div className={css`
        height: 150px;
        padding: 10px;

        > ul {
            padding: 15px;
            box-sizing: border-box;
            border: 1px solid aqua;
            height: 100%;
            width: 100%;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 15px;

            > li {
                transform-style: preserve-3d;
                position: relative;
                animation: rotate-reverse 1.2s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards;

                &.act {
                    animation: rotate 1.5s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards;
                }

                > div {
                    backface-visibility: hidden;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                > div:first-child {
                    &::before{
                        content: '待开奖';
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                    }
                    background: rgba(51, 51, 51, 0.22);
                }

                > div:last-child {
                    text-align: center;
                    line-height: 50px;
                    border: orange solid 1px;
                    transform: rotateY(180deg);
                }
            }
        }

        @keyframes rotate-reverse {
            0% {
                transform: rotateY(180deg);
            }

            100% {
                transform: rotateY(0deg);
            }
        }
        @keyframes rotate {
            0% {
                transform: rotateY(0deg);
            }

            100% {
                transform: rotateY(180deg);
            }
        }
    `}>
        <ul>
            {mockWinD.map((it,i) => <li className={i===index?'act':''}>
                <div></div>
                <div>{it}</div>
            </li>)}
        </ul>
    </div>
}
type NumProps = {
    state: { id: number, isCheck: boolean, key: string }[],
    setP: (n: number) => void
}
type RefProps = { total: NumProps['state'], clearS(): void }
const Num = forwardRef<RefProps, NumProps>(({state, setP}, ref) => {
    const [gKey, setGKey] = useState(state)
    useImperativeHandle(ref,()=>({
        total:gKey.filter(it=>it.isCheck),
        clearS
    }))
    const changeS = (id:number) => {
        // setGKey(gKey.map(it=>({...it,isCheck:it.id === id})))
        setGKey(gKey.map(it=>{
            if (it.id===id) {
                it.isCheck=!it.isCheck
                setP(it.isCheck?id:0)
            }
            else it.isCheck=false
            return it
        }))
    }
    const clearS=()=>setGKey(state.map(it=>({...it,isCheck:false})))
    return <div className={css`
        margin: 10px;
        border: #535bf2 1px solid;
        height: 200px;
    `}>
        <ul className={css`
            box-sizing: border-box;
            width: 100%;
            padding: 15px;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 15px;
            //place-items: center;
            li {
                text-align: center;
                line-height: 80px;
                background: #ddd;
                cursor: pointer;
                transition: 0.3s;
                &.act{
                    background: orange;
                }
            }
        `}>
            {gKey.map((it, i) => (
                <li key={it.key} className={it.isCheck?'act':''} onClick={()=>changeS(it.id)}>{i}</li>))}
        </ul>
    </div>
})
export default LotteryCard
