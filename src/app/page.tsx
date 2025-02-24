"use client"
import Header from "./components/header";
import SelectSubject from "./components/select-subject";
import { useSelectedValues } from "./hooks/state/selected-values";
import { useCheckAttendanceStatus } from "./hooks/api/check-attendance-status";
import AttendanceStatusCard from "./components/attendance-status-card";
import { STUDENTS_TO_MARK } from "./constants/studentDetails";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useInsertAttendance } from "./hooks/api/insert-attendance";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { selectedValues } = useSelectedValues();

  const [filter, setFilter] = useState<boolean>(false);

  const { data: currentAttendanceStatus, refetch: refetchAttendanceStatus, isLoading: isLoadingAttendanceStatus } = useCheckAttendanceStatus({
    facultyName: selectedValues.facultyName,
    subject: selectedValues.subject,
    date: selectedValues.date
  });

  const currentAttendanceStatusDetails: {
    Attendance: string;
    RollNo: string;
    ProgramName: string;
    Term: string;
    Section: string;
    FingerValue: string | null;
    presentcnt: string;
    totalcnt: string;
  }[] = currentAttendanceStatus?.Result?.Details;

  const { mutateAsync: insertAttendance } = useInsertAttendance({ refetch: refetchAttendanceStatus });

  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex flex-col p-8">
        <SelectSubject />
        {isLoadingAttendanceStatus ? <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div> : currentAttendanceStatusDetails && currentAttendanceStatusDetails.length > 0 && <div className="flex flex-col gap-4">
          <div className="flex sticky top-0 bg-background py-4 flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
            <div className="flex sm:w-full w-fit flex-col sm:flex-row items-start sm:items-center justify-start gap-2">
              <h1 className="text-sm sm:text-lg w-fit text-nowrap font-bold">Attendance Status</h1>
              <p className="text-xs sm:text-sm w-fit text-nowrap text-gray-400">({currentAttendanceStatusDetails[0]?.presentcnt}/{currentAttendanceStatusDetails[0]?.totalcnt} Present Currently)</p>
              <p className="text-xs sm:text-sm w-fit text-nowrap text-gray-400">({selectedValues.studentsToMark.length} Selected)</p>
            </div>
            <div className="flex w-full flex-col sm:flex-row items-center lg:justify-end justify-start gap-4">
              <div className="flex flex-row items-center justify-start gap-2">
                <p className="text-sm text-nowrap text-gray-400">Filter Students</p>
                <Switch checked={filter} onCheckedChange={() => setFilter(!filter)} />
              </div>
              <Button onClick={() => insertAttendance()} disabled={selectedValues.studentsToMark.length === 0}>Mark Attendance</Button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center flex-wrap gap-2">
            {currentAttendanceStatusDetails?.filter((studentDetails) => filter ? STUDENTS_TO_MARK.includes(studentDetails.RollNo) : true).map((studentDetails) => (
              <AttendanceStatusCard key={studentDetails.RollNo} studentDetails={studentDetails} />
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
}
