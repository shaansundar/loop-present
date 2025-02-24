"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useSelectedValues } from "@/app/hooks/state/selected-values";
import { useEffect, useState } from "react"
export function DatePicker() {

    const [date, setDate] = useState<Date>();
    const { setSelectedValues } = useSelectedValues();


    useEffect(() => {
        if (date) {
            const formattedDate = format(date, "dd/MM/yyyy");
            setSelectedValues((prev) => ({ ...prev, date: formattedDate }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full md:w-72 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
