import { Route } from "react-router"
import TestComp from "../components/TestComo"

const privatRoute = () => {
    const token = localStorage.getItem('token')

    if(true){
        return <Route path = "/testPage" component={TestComp}  />
    }else{
        return null
    }
}

export default privatRoute