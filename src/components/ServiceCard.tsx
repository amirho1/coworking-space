import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ServiceCard({
  title,
  description,
  tags = [],
}: {
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <Card className="w-[500px] bg-white rounded-xl overflow-hidden pt-0">
      {/* Placeholder Image */}
      <CardHeader className="h-48 p-0 w-full bg-gray-300 overflow-hidden">
        <Image
          src="/images/coworking.webp"
          alt="Service"
          className="object-cover w-full "
          width={300}
          height={300}
          loading="lazy"
        />
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Headline and Subhead */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Title and Tags */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-3 py-1 rounded-full border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                {tag}
              </Badge>
            ))}
          </h4>
        </div>

        {/* Button */}
        <Button className="w-auto w-full px-6 py-2 rounded-md text-sm">رزرو</Button>
      </CardContent>
    </Card>
  );
}
