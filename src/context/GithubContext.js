import { createContext , useReducer } from "react";
import githubReeducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_API_URL;
const GITHUB_TOKEN = process.env.REACT_APP_API_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users : [],
        loading : false
    }

    const [state , dispath] = useReducer(githubReeducer , initialState);

    

    const searchUsers = async (text) => {
        console.log(text)
        const params = new URLSearchParams({
            q: text
        })
        setLoading();
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers : {
                Authorization : `token ${GITHUB_TOKEN}`,
            },
        } )
        console.log(response)
        const {items} = await response.json();

        dispath({
            type : 'GET_USERS',
            payload : items
        })

        
    }
    const setLoading = () => {
        dispath({type : 'SET_LOADING'})
    }
    const clearUsers = () => {
        dispath({type : 'CLEAR_USERS'})
    }
    return <GithubContext.Provider value={{
        users : state.users,
        loading : state.loading,
        searchUsers,
        setLoading,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext