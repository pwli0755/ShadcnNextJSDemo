import React from "react";
import SupportTicketsResolved from "./support-tickets-resolved";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, PieChartIcon, StarIcon, Users2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import cm from "@/public/images/cm.jpg";
import rl from "@/public/images/rl.jpg";
import tf from "@/public/images/tf.jpg";
import TeamDistributionChart from "./team-distribution-chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TeamsStats = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-base">Total teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Users2Icon />
              <span className="text-5xl font-bold">8</span>
            </div>
            <Button size="xs" asChild>
              <Link href="/dashboard/teams">VIEW ALL</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-base">
            <span>Team leaders</span>
            <StarIcon className="text-yellow-400" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={cm.src}></AvatarImage>
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Colin Murray</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>LF</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={rl.src}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>KJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>TJ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={tf.src}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>JJ</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex justify-between items-center">
              Team distribution <PieChartIcon />{" "}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TeamDistributionChart />
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ListChecks /> Support tickets resolved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SupportTicketsResolved />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamsStats;
