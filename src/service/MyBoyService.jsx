import { useHttp } from "../hooks/http.hooks";

const MyBoyService = () => {

    const {request} = useHttp()

    const setUpData = (values) => {
        request("http://localhost:3076/logIn", "POST", JSON.stringify(values))
    }

    const initializeData = async () => {
        return await request("http://localhost:3076/logIn")
    }


    return {setUpData, initializeData}

}

export default MyBoyService;