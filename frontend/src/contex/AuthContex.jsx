import { useContext, createContext, useState, useEffect } from 'react';
import getUser from '../api/getUser';
const AuthContext = createContext();

export function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser();
                if (response.success) {
                    setUser(response.user);
                }
            } catch (error) {
                console.error('Unable to load authenticated user:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [])


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >
            {children}


        </AuthContext.Provider>
    );
}


export function useAuth(){
    return  useContext(AuthContext);
}

export default AuthProvider;