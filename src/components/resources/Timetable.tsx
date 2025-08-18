import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const timetableData = {
  "firstYear": [
    { course: "ME 101", room: "LH 101", day: "Monday", start: "08:30", end: "09:30" },
    { course: "ME 103", room: "LH 102", day: "Monday", start: "09:30", end: "10:30" },
    { course: "ME 105", room: "LH 103", day: "Monday", start: "10:30", end: "11:30" },
    { course: "ME Lab", room: "Lab 1", day: "Monday", start: "14:00", end: "16:00" },
    // ... rest of your data
  ],
  "secondYear": [
    // Monday
    { course: "ME221", room: "S1:VMCC21, S2:LC302", day: "Monday", start: "08:30", end: "09:25" },
    { course: "ME223", room: "S1:ESE113, S2:ESE106, S3:LC001", day: "Monday", start: "10:30", end: "11:25" },
    { course: "ME225", room: "S1:ESE102, S2:ESE109, S3:ESE112", day: "Monday", start: "11:30", end: "12:25" },
    { course: "EC101", room: "LA002", day: "Monday", start: "15:30", end: "16:55" },

    // Tuesday
    { course: "ME225", room: "S1:ESE102, S2:ESE109, S3:ESE112", day: "Tuesday", start: "08:30", end: "09:25" },
    { course: "ME221", room: "S1:VMCC21, S2:LC302", day: "Tuesday", start: "09:30", end: "10:25" },
    { course: "ME223", room: "S1:ESE113, S2:ESE106, S3:LC001", day: "Tuesday", start: "11:30", end: "12:25" },

    // Wednesday
    { course: "ME209", room: "S1:F24, S2:J04, S3:ESE113", day: "Wednesday", start: "11:05", end: "12:30" },

    // Thursday
    { course: "ME223", room: "S1:ESE113, S2:ESE106, S3:LC001", day: "Thursday", start: "08:30", end: "09:25" },
    { course: "ME225", room: "S1:ESE102, S2:ESE109, S3:ESE112", day: "Thursday", start: "09:30", end: "10:25" },
    { course: "ME221", room: "S1:VMCC21, S2:LC302", day: "Thursday", start: "10:30", end: "11:25" },
    { course: "EC101", room: "LA002", day: "Thursday", start: "15:30", end: "16:55" },

    // Friday
    { course: "ME209", room: "S1:F24, S2:J04, S3:ESE113", day: "Friday", start: "11:05", end: "12:30" }
  ],
  "thirdYear": [
    // Monday
    { course: "ME323", room: "F24", day: "Monday", start: "08:30", end: "09:25" },
    { course: "ME319", room: "ESE113", day: "Monday", start: "09:30", end: "10:25" },
    { course: "ME346", room: "ESE110", day: "Monday", start: "10:35", end: "11:30" },
    { course: "ME306", room: "IC2 SOM", day: "Monday", start: "11:35", end: "12:30" },
    { course: "ME224 S1", room: "", day: "Monday", start: "14:00", end: "15:25" },

    // Tuesday
    { course: "ME306", room: "IC2 SOM", day: "Tuesday", start: "08:30", end: "09:25" },
    { course: "ME323", room: "F24", day: "Tuesday", start: "09:30", end: "10:25" },
    { course: "ME319", room: "ESE113", day: "Tuesday", start: "10:35", end: "11:30" },
    { course: "ME346", room: "ESE110", day: "Tuesday", start: "11:35", end: "12:30" },
    { course: "ME374 S1", room: "", day: "Tuesday", start: "14:00", end: "15:25" },

    // Wednesday
    // (Lab sessions removed as requested)

    // Thursday
    { course: "ME346", room: "ESE105", day: "Thursday", start: "08:30", end: "09:25" },
    { course: "ME306", room: "IC3 SOM", day: "Thursday", start: "09:30", end: "10:25" },
    { course: "ME323", room: "LC101", day: "Thursday", start: "10:35", end: "11:30" },
    { course: "ME319", room: "ESE102", day: "Thursday", start: "11:35", end: "12:30" },
    { course: "ME224 S2", room: "", day: "Thursday", start: "14:00", end: "15:25" },

    // Friday
    { course: "ME374 S2", room: "", day: "Friday", start: "14:00", end: "15:25" }
  ],
};

const WeeklyTimetable = () => {
  const [year, setYear] = useState("firstYear");

  // Get current week Monday date for static week display
  const getCurrentWeekMonday = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday;
  };

  const transformToEvents = () => {
    const mondayDate = getCurrentWeekMonday();
    const dayMap = {
      'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4
    };

    return (timetableData as any)[year]?.map((cls: any, index: number) => {
      const eventDate = new Date(mondayDate);
      eventDate.setDate(mondayDate.getDate() + dayMap[cls.day as keyof typeof dayMap]);
      
      const startDateTime = new Date(eventDate);
      const [startHour, startMin] = cls.start.split(':').map(Number);
      startDateTime.setHours(startHour, startMin, 0, 0);
      
      const endDateTime = new Date(eventDate);
      const [endHour, endMin] = cls.end.split(':').map(Number);
      endDateTime.setHours(endHour, endMin, 0, 0);

      return {
        id: index.toString(),
        title: cls.course,
        start: startDateTime,
        end: endDateTime,
        extendedProps: {
          room: cls.room
        }
      };
    }) || [];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Class Timetable</span>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="firstYear">First Year</SelectItem>
              <SelectItem value="secondYear">Second Year</SelectItem>
              <SelectItem value="thirdYear">Third Year</SelectItem>
              <SelectItem value="fourthYear">Fourth Year</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="weekly-timetable">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            initialDate={getCurrentWeekMonday()}
            headerToolbar={false} // Hide all header toolbar
            dayHeaderFormat={{ weekday: 'long' }} // Show only weekday names (Monday, Tuesday, etc.)
            events={transformToEvents()}
            weekends={false}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            height="auto"
            expandRows={true}
            allDaySlot={false}
            eventContent={(eventInfo) => (
              <div className="p-1 text-xs">
                <div className="font-semibold">{eventInfo.event.title}</div>
                <div className="text-xs opacity-80">{eventInfo.event.extendedProps.room}</div>
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyTimetable;
