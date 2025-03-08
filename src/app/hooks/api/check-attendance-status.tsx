import { headers } from "@/app/constants/api";
import { BASE_URL } from "@/app/constants/api";
import { PROGRAM, SECTION, TERM } from "@/app/constants/profDetails";
import { useQuery } from "@tanstack/react-query";

export const useCheckAttendanceStatus = ({ facultyName, subject, date, section }: { facultyName: string, subject: string, date: string, section: '1' | '2' | '6' }) => {
    return useQuery({
        queryKey: ['check-attendance-status', facultyName, subject, date, section],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/ViewStudentDetailsList`, {
                headers: headers,
                method: 'POST',
                body: new URLSearchParams({
                    "TeacherName": facultyName,
                    "Subject": subject,
                    "Date": date,
                    "Section": section,
                    "Terms": TERM,
                    "Program": PROGRAM
                })
            });
            const data = await response.json();
            return data;
        },
        enabled: !!facultyName && !!subject && !!date,
        // refetchInterval: 1000
    })
}