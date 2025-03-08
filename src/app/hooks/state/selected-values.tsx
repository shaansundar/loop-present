// useContext to store the selected values

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type SelectedValues = {
    date: string;
    subject: string;
    facultyName: string;
    studentsToMark: string[];
    slot: '1' | '2' | '3' | '4' | '';
    section: '1' | '2' | '6';
}

type SelectedValuesContextType = {
    selectedValues: SelectedValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedValues>>;
}

const SelectedValuesContext = createContext<SelectedValuesContextType>({
    selectedValues: {
        date: "",
        subject: "",
        facultyName: "",
        studentsToMark: [],
        slot: "",
        section: "2"
    },
    setSelectedValues: () => {}
}); 

export const useSelectedValues = () => {
    return useContext(SelectedValuesContext);
}

export const SelectedValuesProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValues>({
        date: "",
        subject: "",
        facultyName: "",
        studentsToMark: [],
        slot: "",
        section: "2"
    });

    return (
        <SelectedValuesContext.Provider value={{ selectedValues, setSelectedValues }}>
            {children}
        </SelectedValuesContext.Provider>
    )
}