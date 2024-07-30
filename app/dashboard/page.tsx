import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import EmployeesStats from './components/employees/employees-stats';

const DashBoardPage = () => {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employees stats</TabsTrigger>
        <TabsTrigger value="teams">Teams stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees"><EmployeesStats/></TabsContent>
      <TabsContent value="teams">Teams stats</TabsContent>
    </Tabs>
  );
}

export default DashBoardPage