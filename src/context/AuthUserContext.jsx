import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    return(
        <AuthUserContext.Provider value={{
            signed : !!user,
            user,
            setUser,
            email,
            setEmail,
            senha,
            setSenha,
            loading,
            setLoading
        }}>
            { children }
        </AuthUserContext.Provider>
    );
};

AuthUserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuthUser =() => {
    const context = useContext(AuthUserContext);
    if(!context)
        throw new Error("useAuthUser deve ser usado com um AuthUserProvider");
    return context;
};
