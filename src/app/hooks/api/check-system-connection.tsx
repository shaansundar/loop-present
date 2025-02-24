import { BASE_URL, headers } from "@/app/constants/api";
import { useQuery } from "@tanstack/react-query";

export const useCheckSystemConnection = () => {
    return useQuery({
        queryKey: ['check-system-connection'],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/ddlAttendanceSubjectList`, {
                headers: headers,                
                method: 'POST',
                body: new URLSearchParams({
                    "FacultyName": "YVR Murthy",
                    "Program": "PGP(2024-26)",
                    "Terms": "Term III",
                })
            });
            
            const data = await response.json();
            return data;
        }
    })
}