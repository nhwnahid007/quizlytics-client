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
    <div className="bg-gray-100 p-10 overflow-hidden">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Feedback & Reviews
      </h1>

      <div className="container mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[autoplay]}
          className="relative"
        >
          <CarouselContent>
            {feedback.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-full h-[480px] bg-white shadow-md p-6 rounded-xl">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <div>
                        <Image
                          src={item.image}
                          alt="feedback"
                          width={140}
                          height={140}
                          className="rounded-full mx-auto mt-4"
                        />
                        <h2 className="text-xl text-primary-color text-opacity-80 font-bold text-center mt-4">
                          {item.name}
                        </h2>
                      </div>
                      <div className="flex flex-col mx-auto text-center items-center justify-center">
                        {/* <h2 className="text-xl text-primary-color text-opacity-80 font-bold text-center mt-4">
                          {item.name}
                        </h2> */}
                        <div className="flex mt-2">
                          <p className="flex items-center mx-auto">
                            <span className="mr-2">Rating:</span>
                            {Array.from({length: item.rating}).map(
                              (_, index) => (
                                <FaStar key={index} style={{color: "gold"}} />
                              )
                            )}
                          </p>
                        </div>
                        <p className="my-4 italic flex gap-2 text-center mx-auto">
                          <span>
                            <FaQuoteLeft className="text-2xl" />
                          </span>
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
