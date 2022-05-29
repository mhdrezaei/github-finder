import { createContext , useReducer } from "react";
import githubReeducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_API_URL;
const GITHUB_TOKEN = process.env.REACT_APP_API_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users : [],
        user : {},
        repos : [],
        loading : false
    }

    const [state , dispath] = useReducer(githubReeducer , initialState);
    // Search users
    const searchUsers = async (text) => {
        const params = new URLSearchParams({
            q: text
        })
        setLoading();
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers : {
                Authorization : `token ${GITHUB_TOKEN}`,
            },
        } )
        const {items} = await response.json();
        dispath({
            type : 'GET_USERS',
            payload : items
        })
    }
    // Get single user
    const getUser = async (login) => {
        
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers : {
                Authorization : `token ${GITHUB_TOKEN}`,
            },
        } )
        if(response.status === 404){
            window.location('/notfound')
        }
        const data = await response.json();
        dispath({
            type : 'GET_USER',
            payload : data
        })
    }
    const setLoading = () => {
        dispath({type : 'SET_LOADING'})
    }
    // Latest Repo 
    const getRepo = async (login) => {
        const params = new URLSearchParams({
            sort: 'created',
            per_page : 10
        })
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers : {
                Authorization : `token ${GITHUB_TOKEN}`,
            },
        } )
        const data = await response.json();
        dispath({
            type : 'GET_REPOS',
            payload : data
        })
    }
    // Clear users from search list
    const clearUsers = () => {
        dispath({type : 'CLEAR_USERS'})
    }
    return <GithubContext.Provider value={{
        users : state.users,
        loading : state.loading,
        user : state.user,
        repos : state.repos,
        getRepo,
        searchUsers,
        getUser,
        setLoading,
        clearUsers

    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext