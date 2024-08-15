import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../../context/AuthUserContext";
import PropTypes from 'prop-types';

export default function Private({ children }) {
    const { signed, loading } = useAuthUser();

    useEffect(() => {
        if (!loading && !signed) {
            <Navigate to="/login" replace />;
        }
    }, [signed, loading]);

    if (loading) {
        return (
            <div>Carregando...</div>
        );
    }

    if (!signed) {
        return <Navigate to="/login" />;
    }

    return children;
};

Private.propTypes = {
    children: PropTypes.node.isRequired,
};
