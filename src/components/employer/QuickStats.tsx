import { Card, CardContent } from "../ui/card";
import { Briefcase, UserPlus, Calendar, Target } from "lucide-react";

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Positions</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Applications</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-green-600">+3 today</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-blue-600">3 this week</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Offers Extended</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-orange-600">1 pending</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}