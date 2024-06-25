import React, {Dispatch, ReactNode, SetStateAction, useState} from "react";

interface ProviderProps {
    children: ReactNode;
}

export interface ContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}
export const MyContext = React.createContext<ContextType>(
    {
        loading: true,
        setLoading: () => {}
    }
);

export default function MyProvider({ children }: ProviderProps) {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <MyContext.Provider value={{ loading, setLoading }}>
            {children}
        </MyContext.Provider>
    );
}
