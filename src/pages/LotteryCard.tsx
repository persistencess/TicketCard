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
const LotteryCard = () => {
    const numRef=useRef<RefProps>(null)
    const [p,setP]=useState(0)
    const submit=()=>{
        Toast.success('投注成功,投注号码...'+numRef.current!.total[0].id)
        setTimeout(()=>{
            numRef.current?.clearS()
            setP(0)
        },1000)
    }
    return (
        <>
            <NavHeader tit={'刮刮乐'}/>
            <div className={css`
                width: 100%;
                height: 100%;
            `}>
                <Card/>
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
type NumProps = {
    state: { id: number, isCheck: boolean, key: string }[],
    setP:(n:number)=>void
}
type RefProps={total:NumProps['state'],clearS():void}
const Num= forwardRef<RefProps,NumProps>(({state,setP}, ref) => {
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
