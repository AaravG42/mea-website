
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const timeSlots = [
  "08:30 - 09:30", "09:30 - 10:30", "10:30 - 11:30", "11:30 - 12:30",
  "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Sample timetable data for different semesters
const timetableData = {
  "semester3": {
    "Monday": [
      { slot: "08:30 - 09:30", course: "ME 201", room: "LH 101" },
      { slot: "09:30 - 10:30", course: "ME 203", room: "LH 102" },
      { slot: "10:30 - 11:30", course: "ME 205", room: "LH 103" },
      { slot: "14:00 - 15:00", course: "ME Lab", room: "Lab 1" },
      { slot: "15:00 - 16:00", course: "ME Lab", room: "Lab 1" }
    ],
    "Tuesday": [
      { slot: "09:30 - 10:30", course: "ME 207", room: "LH 101" },
      { slot: "10:30 - 11:30", course: "ME 209", room: "LH 102" },
      { slot: "11:30 - 12:30", course: "ME 211", room: "LH 103" }
    ],
    // Other days would follow similar pattern
  },
  "semester5": {
    "Monday": [
      { slot: "08:30 - 09:30", course: "ME 301", room: "LH 201" },
      { slot: "09:30 - 10:30", course: "ME 303", room: "LH 202" },
      { slot: "15:00 - 16:00", course: "ME Lab", room: "Lab 2" },
      { slot: "16:00 - 17:00", course: "ME Lab", room: "Lab 2" }
    ],
    "Wednesday": [
      { slot: "10:30 - 11:30", course: "ME 305", room: "LH 201" },
      { slot: "11:30 - 12:30", course: "ME 307", room: "LH 202" },
      { slot: "14:00 - 15:00", course: "ME 309", room: "LH 203" }
    ],
    // Other days would follow similar pattern
  },
  "semester7": {
    "Tuesday": [
      { slot: "08:30 - 09:30", course: "ME 401", room: "LH 301" },
      { slot: "09:30 - 10:30", course: "ME 403", room: "LH 302" }
    ],
    "Thursday": [
      { slot: "10:30 - 11:30", course: "ME 405", room: "LH 301" },
      { slot: "11:30 - 12:30", course: "ME 407", room: "LH 302" },
      { slot: "14:00 - 16:00", course: "ME Project", room: "Project Lab" }
    ],
    // Other days would follow similar pattern
  }
};

const Timetable = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [semester, setSemester] = useState("semester3");
  const [view, setView] = useState("timetable");

  // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)
  const currentDay = date ? weekdays[((date.getDay() + 6) % 7)] : "Monday"; // Convert from Sunday-based to Monday-based

  const getTimetableForDay = (day: string) => {
    return (timetableData as any)[semester]?.[day] || [];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Academic Timetable</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester3">1st Sem</SelectItem>
                <SelectItem value="semester5">2nd Sem</SelectItem>
                <SelectItem value="semester7">3rd Sem</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={setView}>
          <TabsList className="mb-4">
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timetable">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-100 dark:bg-gray-800">Time</th>
                    {weekdays.map(day => (
                      <th key={day} className={`border p-2 ${day === currentDay ? 'bg-mea-gold/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(slot => (
                    <tr key={slot}>
                      <td className="border p-2 bg-gray-50 dark:bg-gray-700 font-medium text-sm">{slot}</td>
                      {weekdays.map(day => {
                        const courseSlot = getTimetableForDay(day).find((item: any) => item.slot === slot);
                        return (
                          <td key={`${day}-${slot}`} className={`border p-2 text-center ${day === currentDay ? 'bg-mea-gold/10 dark:bg-mea-gold/5' : 'dark:bg-gray-900'}`}>
                            {courseSlot ? (
                              <div>
                                <div className="font-medium">{courseSlot.course}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{courseSlot.room}</div>
                              </div>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-input dark:border-gray-700 p-3"
                />
              </div>
              <div className="md:w-1/2">
                <div className="rounded-md border border-input dark:border-gray-700 p-4">
                  <h3 className="font-medium text-lg mb-2">
                    {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
                  </h3>
                  <div className="space-y-2">
                    {getTimetableForDay(currentDay).map((item: any, index: number) => (
                      <div key={index} className="p-2 bg-mea-lightgray dark:bg-gray-800 rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.course}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.slot}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.room}</div>
                      </div>
                    ))}
                    {getTimetableForDay(currentDay).length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400 italic">No classes scheduled for this day.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Timetable;
