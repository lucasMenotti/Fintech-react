// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const URL_LOGIN = 'http://localhost:8080/api/auth/login';

export const AuthProvider = ({ children }) => {
    const getStoredUser = () => {
        try {
            const storedUser = localStorage.getItem('user'); 
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Falha ao ler 'user' do localStorage", e);
            localStorage.removeItem('user');
            return null;
        }
    };

    const [user, setUser] = useState(getStoredUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, senha) => {
        setLoading(true);
        try {
            const response = await fetch(URL_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); 
                const errorMessage =
                    errorData.message || 'Falha na autenticação. Credenciais inválidas.';
                throw new Error(errorMessage);
            }
            
            const authData = await response.json(); 

            const mappedUser = {
                id: authData.id_usuario, 
                nome: authData.nome,
                email: authData.email
            };

            setUser(mappedUser); 
            
            return mappedUser;

        } catch (error) {
            console.error('Erro no login:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // ✅ CORRIGIDO: Agora apenas limpa o estado, a navegação fica no componente
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const getUserId = () => {
        return user ? user.id : null; 
    };

    const value = { 
        user, 
        loading, 
        login, 
        logout, 
        isAuthenticated: !!user, 
        getUserId
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};