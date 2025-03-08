import { BASE_URL, headers } from "@/app/constants/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSelectedValues } from "../state/selected-values";
import { PROGRAM, TERM } from "@/app/constants/profDetails";
import { SLOT_TIME_MAP } from "@/app/constants/studentDetails";

const chooseRandomTimeInBetween = (end: string) => {
    const [endHour] = end.split(':').map(Number);
    const randomHour = endHour;
    const randomMinute = Math.floor(Math.random() * (15 - 0 + 1));
    const randomSecond = Math.floor(Math.random() * (59 - 0 + 1));
    return `${randomHour}:${randomMinute.toString().padStart(2, '0')}:${randomSecond.toString().padStart(2, '0')}`;
}

type SelectedValues = {
    subject: string;
    studentsToMark: string;
    slot: '1' | '2' | '3' | '4';
    date: string;
    facultyName: string;
    section: '1' | '2' | '6';
}

const insertAttendance = async (selectedValues: SelectedValues) => {
    const time = chooseRandomTimeInBetween(SLOT_TIME_MAP[selectedValues.slot].end);
    console.log("🚀 ~ insertAttendance ~ time:", {
        AttendanceThrough: 'Finger',
        subject: selectedValues.subject,
        RollNo: selectedValues.studentsToMark,
        ProgramName: PROGRAM,
        Term: TERM,
        Section: selectedValues.section,
        facultyName: selectedValues.facultyName,
        Date: selectedValues.date,
        Time: time
    });
    const response = await fetch(`${BASE_URL}/insertAttendance`, {
        headers: headers,
        method: 'POST',
        body: new URLSearchParams({
            AttendanceThrough: 'Finger',
            subject: selectedValues.subject,
            RollNo: selectedValues.studentsToMark,
            ProgramName: PROGRAM,
            Term: TERM,
            Section: selectedValues.section,
            facultyName: selectedValues.facultyName,
            Date: selectedValues.date,
            Time: time
        })
    });
    const data = await response.json();
    return data;
}

export const useInsertAttendance = ({ refetch }: { refetch: () => void }) => {
    const { selectedValues, setSelectedValues } = useSelectedValues();
    return useMutation({
        mutationFn: async () => {
            if (selectedValues.studentsToMark.length === 0) {
                toast.error('No students selected');
                return;
            }
            if (selectedValues.subject === '') {
                toast.error('No subject selected');
                return;
            }
            if (selectedValues.facultyName === '') {
                toast.error('No faculty name selected');
                return;
            }
            if (selectedValues.date === '') {
                toast.error('No date selected');
                return;
            }
            if (selectedValues.slot === '') {
                toast.error('No slot selected');
                return;
            }

            const responses = Promise.all(selectedValues.studentsToMark.map(async (student) => {
                try {
                    await insertAttendance({ ...selectedValues, slot: selectedValues.slot as '1' | '2' | '3' | '4', studentsToMark: student });
                    toast.success('Attendance Inserted Successfully for ' + student);
                } catch (error) {
                    toast.error('Failed to Insert Attendance for ' + student);
                    console.log(error);
                }
            }));

            return responses;
        },
        onSuccess: () => {
            toast.success('Attendance Inserted Successfully for ' + selectedValues.studentsToMark.length + ' students');
            refetch();
            setSelectedValues((prev) => ({
                ...prev,
                studentsToMark: []
            }));
        },
        onError: () => {
            toast.error('Failed to Insert Attendance');
        }
    });
}