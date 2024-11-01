"use client";
import Image from "next/image";
import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {FaQuoteLeft, FaStar} from "react-icons/fa";
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
  // const autoplay = Autoplay({delay: 3000});

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
    <div className="bg-gray-100 p-10 overflow-hidden">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Feedback & Reviews
      </h1>

      <div className="container mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          // plugins={[autoplay]}
          className="relative"
        >
          <CarouselContent className="md:ml-64 md:mr-64">
            {feedback.slice(0,3).map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-[300] h-[384] md:min-h-96 bg-white shadow-md p-4 rounded-xl border-2 border-primary-color">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-2">
                      <div className="flex items-start gap-5 pt-0 mt-0 h-28">
                        <div>
                          <Image
                            src={item?.image}
                            alt="feedback"
                            width={90}
                            height={80}
                            className="rounded-md"
                          />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold">
                            {item.name.length > 12
                              ? item.name.substring(0, 12) 
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
                      <div className="flex flex-col mx-auto text-center items-center justify-center min-h-[272]">
                        <p className="my-4 italic flex gap-2 text-justify mx-auto">
                          {item.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute left-0" />
          <CarouselNext className="hidden md:flex absolute right-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default Feedback;
