import { useContext, createContext, useState, useEffect } from 'react';
import getUser from '../api/getUser';
import getProfiles from '../api/getProfiles';

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const loadUserAndProfiles = async () => {
            try {
                const userResponse = await getUser();
                if (userResponse.success) {
                    setUser(userResponse.user);
                }

                const profilesResponse = await getProfiles();
                if (Array.isArray(profilesResponse)) {
                    setUsers(profilesResponse);
                }
            } catch (error) {
                console.error('Unable to load authenticated user or profiles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserAndProfiles();
    }, [])


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                users,
                setUsers,
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