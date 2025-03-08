"use client"
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PROF_DETAILS } from "../constants/profDetails"
import { DatePicker } from "@/components/ui/date-picker"
import { useSelectedValues } from "../hooks/state/selected-values";

const SelectSubject = () => {
    const { setSelectedValues, selectedValues } = useSelectedValues();

    return (
        <Card>
            <CardHeader className="flex flex-col gap-4 lg:flex-row items-start justify-start lg:items-center lg:justify-between">
                <CardTitle className="text-nowrap">Select Subject</CardTitle>
                <div className="flex flex-col md:flex-row items-start w-full md:items-center md:justify-end gap-4">
                    <Select value={selectedValues.section} onValueChange={(value: string) => {
                        setSelectedValues((prev) => ({
                            ...prev,
                            section: value as '1' | '2' | '6'
                        }));
                    }}>
                        <SelectTrigger className="w-full max-w-full md:max-w-36">
                            <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Section 1</SelectItem>
                            <SelectItem value="2">Section 2</SelectItem>
                            <SelectItem value="6">Section 6</SelectItem>
                        </SelectContent>
                    </Select>
                    <DatePicker />
                    <Select onValueChange={(value: string) => {
                        setSelectedValues((prev) => ({
                            ...prev,
                            slot: value as '1' | '2' | '3' | '4'
                        }));
                    }}>
                        <SelectTrigger className="w-full max-w-full md:max-w-20">
                            <SelectValue placeholder="Select Slot" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Slot 1</SelectItem>
                            <SelectItem value="2">Slot 2</SelectItem>
                            <SelectItem value="3">Slot 3</SelectItem>
                            <SelectItem value="4">Slot 4</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select onValueChange={(value: string) => {
                        const selectedSubject = PROF_DETAILS[selectedValues.section].find(subject => subject.subject === value);
                        setSelectedValues((prev) => ({
                            ...prev,
                            subject: selectedSubject?.subject || '',
                            facultyName: selectedSubject?.facultyName || ''
                        }));
                    }}>
                        <SelectTrigger className="w-full max-w-full md:max-w-80">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {PROF_DETAILS[selectedValues.section].map((subject) => (
                                <SelectItem key={subject.subject} value={subject.subject}>
                                    {subject.subject}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
        </Card>
    )
}
export default SelectSubject