import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default async function Profile() {
  return (
    <Card className="max-w-xl mx-auto overflow-hidden rounded-xl shadow-sm p-0">
      {/* Banner */}
      <div className="relative h-32 bg-gradient-to-r from-sky-200 via-blue-400 to-orange-200">
        {/* Profile Image */}
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
          <Avatar className="w-20 h-20 border-4 border-white shadow-md">
            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-14 pb-6 text-center bg-white">
        <div className="flex items-center justify-center gap-2 font-semibold text-2xl">
          Ella Lauda
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-2 py-0.5 text-blue-500 bg-blue-100 border-blue-200"
          >
            <span className="text-lg">✔️</span>
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-muted-foreground text-sm">
          <span className="flex items-center gap-1" title="Company">
            🏢 Htmlstream
          </span>
          <span className="flex items-center gap-1" title="Location">
            📍 <span className="text-blue-500">San Francisco, US</span>
          </span>
          <span className="flex items-center gap-1" title="Join date">
            📅 Joined March 2017
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
