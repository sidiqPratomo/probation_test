/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction, ReactNode, ReactElement} from 'react'
import {LayoutSplashScreen} from '../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {refreshToken} from './_requests'
import {WithChildren} from '../../../_metronic/helpers'
import { LinkProps, useLocation } from 'react-router-dom'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  saveUser: (user: UserModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  saveUser: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const saveUser = (user: UserModel| undefined ) => {
      setCurrentUser(user);
      if(user){
        authHelper.setUser(user);
      }else{
        authHelper.removeUser();
      }
  }

  const logout = () => {
    saveAuth(undefined)
    saveUser(undefined)
  }

  

  return (
    <AuthContext.Provider value={{auth, saveAuth,saveUser, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

type authprivprops ={
  children : ReactNode,
  link?: string
}
const VAuth: FC<authprivprops> = ({ children, link }) => {
  const { currentUser,auth } = useAuth();

  let hide: boolean = true;

  if(children){
    const child = children as ReactElement;
    let obj  = {to:''} as LinkProps;
    if(typeof child.props == 'object' && child.props.to){
      obj = child.props as LinkProps;
    }else{
      if(link){
        obj = {to:link} as LinkProps;
      }
    }
    
    hide = authHelper.PrivilegesValidation({currentUser,auth,path:obj.to as string}) as boolean;
    
  }
  // return <>{children}</>
  return <>{!hide ? children : null}</>;
};

const AuthLocatioMiddleware: FC<WithChildren> = ({children}) =>{
  const location = useLocation();
  const {auth,saveAuth,logout} = useAuth();
  useEffect(()=>{
    const refreshVerifyToken = async (auth : AuthModel)=>{
      try{
        let {data} = await refreshToken(auth.access_token)
        
        if (data) {
          data = Object.assign(auth,data);
          saveAuth(data);
        }
  
      }catch(e){
        logout()
      }
    }

    if(auth && auth.access_token){
      refreshVerifyToken(auth)
    }else{
      logout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])
  return (<>{children}</>)
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, saveAuth,saveUser, currentUser} = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const verifyAuth = async (auth: AuthModel) => {
      try {
        
        
        if (!currentUser) {
          let {data} = await refreshToken(auth.access_token)
          if (data) {
            data = Object.assign(auth,data);
            saveAuth(data);
            if(data.user){
              saveUser(data.user)
            }
          }
        }
      } catch (error) {
        if (!currentUser) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

    }
    
    if (auth && auth.access_token) {
      verifyAuth(auth);
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth, AuthLocatioMiddleware, VAuth}
