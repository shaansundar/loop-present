import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';
import React from 'react'
import { useSelectedValues } from '../hooks/state/selected-values';

type Props = {
    studentDetails: {
        Attendance: string;
        RollNo: string;
        ProgramName: string;
        Term: string;
        Section: string;
        FingerValue: string | null;
        presentcnt: string;
        totalcnt: string;
    }
}

const AttendanceStatusCard = ({ studentDetails }: Props) => {

    const { selectedValues, setSelectedValues } = useSelectedValues();

    const handleClick = () => {
        if (selectedValues.studentsToMark.includes(studentDetails.RollNo)) {
            setSelectedValues((prev) => ({
                ...prev,
                studentsToMark: prev.studentsToMark.filter((rollNo) => rollNo !== studentDetails.RollNo)
            }));
        } else {
            setSelectedValues((prev) => ({
                ...prev,
                studentsToMark: [...prev.studentsToMark, studentDetails.RollNo]
            }));
        }
    }

    return (
        <Card onClick={handleClick} className={clsx('w-40 cursor-pointer h-fit transition-colors', selectedValues.studentsToMark.includes(studentDetails.RollNo) ? 'bg-yellow-500 text-black' : studentDetails.Attendance === 'Present' ? 'bg-green-500 text-white' : 'bg-red-500 text-white')}>
            <CardHeader>
                <CardTitle className=''>{studentDetails.RollNo}</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default AttendanceStatusCard