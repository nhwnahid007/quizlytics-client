"use client";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {FaStar} from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Card, CardContent} from "../ui/card";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const autoplay = Autoplay({delay: 3000});

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          "https://quizlytics.jonomukti.org/all-feedback"
        );
        setFeedback(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="bg-gray-100 p-4 overflow-hidden mt-4">
      <h1 className="text-4xl font-bold text-black text-center mb-3">
        Feedback & Reviews
      </h1>

      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[autoplay]}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-1">
          {feedback.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="">
                  <CardContent className="flex aspect-square p-4 justify-center">
                    <div>
                      <div className="flex gap-3 mx-auto">
                        <div>
                          <Image
                            src={item?.image}
                            alt="feedback"
                            width={90}
                            height={80}
                            className="rounded-md"
                          />
                        </div>
                        <div className="ml-2">
                          <h2 className="text-lg font-bold">
                            {item.name.length > 20
                              ? item.name.substring(0, 20)
                              : item.name}
                          </h2>
                          <h2 className="opacity-75 italic">{"Teacher"}</h2>
                          <h2 className="opacity-75 italic">
                            {"X high school"}
                          </h2>
                          <p className="flex items-center mx-auto">
                            <span className="mr-2 opacity-75 italic">
                              Rating:
                            </span>
                            {Array.from({length: item.rating}).map(
                              (_, index) => (
                                <FaStar key={index} style={{color: "gold"}} />
                              )
                            )}
                          </p>
                        </div>
                      </div>
                      <div className=" mt-4 md:mt-5">
                        <p className="italic text-justify mx-auto">
                          {item.message.split(" ").slice(0, 28).join(" ")}
                          {item.message.split(" ").length > 28 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default Feedback;
