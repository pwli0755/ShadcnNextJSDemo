import React from "react";
import WorkLocationStats from "./work-location-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import cm from "@/public/images/cm.jpg";
import Image from "next/image";
import Link from "next/link";

const EmployeesStats = () => {
  const totalEmployees = 100;
  const employeesPresent = 80;
  const employeesPresentPercentage = (employeesPresent / totalEmployees) * 100;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="">
          <CardHeader>
            <CardTitle className="font-bold text-base">
              Total employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <UserIcon />
                <span className="text-5xl font-bold">{totalEmployees}</span>
              </div>
              <Button size="xs" asChild>
                <Link href="/dashboard/employees">VIEW ALL</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle className="font-bold text-base">
              Employees present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {employeesPresentPercentage > 75 ? (
                  <UserCheck2Icon />
                ) : (
                  <UserRoundXIcon />
                )}
                <span className="text-5xl font-bold">{employeesPresent}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {employeesPresentPercentage > 75 ? (
              <span className="text-xs text-green-500 flex gap-1 items-center">
                <BadgeCheckIcon />
                {employeesPresentPercentage}% of employees are present
              </span>
            ) : (
              <span className="text-xs text-red-500 flex gap-1 items-center">
                <AlertTriangleIcon />
                Only {employeesPresentPercentage}% of employees are present
              </span>
            )}
          </CardFooter>
        </Card>
        <Card className=" border-primary border">
          <CardHeader>
            <CardTitle className="font-bold text-base">
              Employee of the month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={cm.src} alt="Employee of the month avatar" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <span className="text-2xl font-bold">Colin Murray!</span>{" "}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-primary flex items-center gap-2 text-xs ">
              <PartyPopperIcon /> <span>Congratulations, Colin!</span>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon />
            <span>Employee work location trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WorkLocationStats />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesStats;
