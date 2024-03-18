import {Button} from "react-vant";
import {useRoutes} from "react-router-dom";
import routes from "@/router";
import {css} from "@emotion/css";

const App = () => {
    const useRouter=useRoutes(routes)
    return (
        <div className={css`
            width: 100vw;
            min-height: 100vh;
        `}>
            {useRouter}
        </div>
    );
};
export default App
