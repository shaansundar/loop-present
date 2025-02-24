import { headers } from "@/app/constants/api";
import { BASE_URL } from "@/app/constants/api";
import { PROGRAM, SECTION, TERM } from "@/app/constants/profDetails";
import { useQuery } from "@tanstack/react-query";

export const useCheckAttendanceStatus = ({ facultyName, subject, date }: { facultyName: string, subject: string, date: string }) => {
    return useQuery({
        queryKey: ['check-attendance-status', facultyName, subject, date],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/ViewStudentDetailsList`, {
                headers: headers,
                method: 'POST',
                body: new URLSearchParams({
                    "TeacherName": facultyName,
                    "Subject": subject,
                    "Date": date,
                    "Section": SECTION,
                    "Terms": TERM,
                    "Program": PROGRAM
                })
            });
            const data = await response.json();
            return data;
        },
        enabled: !!facultyName && !!subject && !!date
    })
}