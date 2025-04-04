
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";

// Sample labs data
const labsData = [
  {
    id: 1,
    name: "Heat Transfer Laboratory",
    location: "ME Building, Ground Floor",
    inCharge: "Prof. Amit Kumar",
    equipment: "Heat Exchangers, Thermal Conductivity Apparatus",
    contact: "amit@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 2,
    name: "Fluid Mechanics Laboratory",
    location: "ME Building, First Floor",
    inCharge: "Prof. Rajesh Sharma",
    equipment: "Wind Tunnel, Flow Visualization Setup",
    contact: "rajesh@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 3,
    name: "Manufacturing Processes Laboratory",
    location: "ME Building, Ground Floor",
    inCharge: "Prof. Sneha Patel",
    equipment: "CNC Machines, 3D Printers",
    contact: "sneha@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 4,
    name: "Dynamics and Control Laboratory",
    location: "ME Building, Second Floor",
    inCharge: "Prof. Vikram Singh",
    equipment: "Vibration Test Rigs, Control Systems",
    contact: "vikram@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 5,
    name: "Materials Testing Laboratory",
    location: "ME Building, First Floor",
    inCharge: "Prof. Ananya Desai",
    equipment: "Universal Testing Machine, Hardness Testers",
    contact: "ananya@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 6,
    name: "Computational Mechanics Laboratory",
    location: "ME Building, Third Floor",
    inCharge: "Prof. Sanjay Mehta",
    equipment: "High-Performance Computers, FEA Software",
    contact: "sanjay@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 7,
    name: "Robotics and Automation Laboratory",
    location: "ME Building, Second Floor",
    inCharge: "Prof. Neha Kapoor",
    equipment: "Robotic Arms, Automation Systems",
    contact: "neha@me.iitb.ac.in",
    website: "#"
  },
  {
    id: 8,
    name: "Thermodynamics Laboratory",
    location: "ME Building, Ground Floor",
    inCharge: "Prof. Rahul Gupta",
    equipment: "IC Engines, Refrigeration Units",
    contact: "rahul@me.iitb.ac.in",
    website: "#"
  }
];

const LabsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  // Filter labs based on search term
  const filteredLabs = labsData.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.inCharge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort function
  const sortedLabs = [...filteredLabs].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Mechanical Engineering Labs</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] cursor-pointer" onClick={() => requestSort('name')}>
                  Lab Name
                  {sortConfig?.key === 'name' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('location')}>
                  Location
                  {sortConfig?.key === 'location' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('inCharge')}>
                  In-Charge
                  {sortConfig?.key === 'inCharge' && (
                    <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead className="hidden md:table-cell">Equipment</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLabs.map((lab) => (
                <TableRow key={lab.id}>
                  <TableCell className="font-medium">{lab.name}</TableCell>
                  <TableCell>{lab.location}</TableCell>
                  <TableCell>{lab.inCharge}</TableCell>
                  <TableCell className="hidden md:table-cell">{lab.equipment}</TableCell>
                  <TableCell className="hidden md:table-cell">{lab.contact}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={lab.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLabs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No labs match your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabsList;
