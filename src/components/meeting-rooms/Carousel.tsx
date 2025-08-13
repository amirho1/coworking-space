import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface MeetingCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  list: string[];
}

export default function MeetingCarousel({ list, ...props }: MeetingCarouselProps = { list: [] }) {
  return (
    <div className="m-auto flex justify-center items-center " {...props}>
      <Carousel className="w-8/12">
        <CarouselContent>
          {list.map((url, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-none">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image src={url} alt="عکس های اتاق میتینگ" width={200} height={200} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
