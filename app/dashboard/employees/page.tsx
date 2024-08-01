import React from "react";
import Loading from "./loading";
import { setTimeout } from "timers/promises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee, columns } from "./components/columns";
import { DataTable } from "./components/data-table";



const employees: Employee[] = [
  {
    id: 1,
    firstname: "Colin",
    lastname: "Murray",
    team: "alpha",
    isTeamLeader: true,
    avatar: "/images/cm.jpg",
  },
  {
    id: 2,
    firstname: "Tom",
    lastname: "Phillips",
    team: "alpha",
    isTeamLeader: false,
  },
  {
    id: 3,
    firstname: "Liam",
    lastname: "Fuentes",
    team: "alpha",
    isTeamLeader: false,
  },
  {
    id: 4,
    firstname: "Tina",
    lastname: "Fey",
    team: "canary",
    isTeamLeader: true,
    avatar: "/images/tf.jpg",
  },
  {
    id: 5,
    firstname: "Katie",
    lastname: "Johnson",
    team: "canary",
    isTeamLeader: false,
  },
  {
    id: 6,
    firstname: "Tina",
    lastname: "Jones",
    team: "canary",
    isTeamLeader: false,
  },
  {
    id: 7,
    firstname: "Amy",
    lastname: "Adams",
    team: "delta",
    isTeamLeader: true,
  },
  {
    id: 8,
    firstname: "Ryan",
    lastname: "Lopez",
    team: "delta",
    isTeamLeader: false,
    avatar: "/images/rl.jpg",
  },
  {
    id: 9,
    firstname: "Jenny",
    lastname: "Jones",
    team: "delta",
    isTeamLeader: false,
  },
  {
    id: 10,
    firstname: "Amy",
    lastname: "Adams",
    team: "delta",
    isTeamLeader: true,
  },
  {
    id: 11,
    firstname: "Ryan",
    lastname: "Lopez",
    team: "delta",
    isTeamLeader: false,
    avatar: "/images/rl.jpg",
  },
  {
    id: 12,
    firstname: "Jenny",
    lastname: "Jones",
    team: "delta",
    isTeamLeader: false,
  },
];

const EmployeesPage = async () => {
  await setTimeout(2000);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardContent>
          <DataTable columns={columns} data={employees} />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default EmployeesPage;
