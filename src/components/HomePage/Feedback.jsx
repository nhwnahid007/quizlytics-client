"use client";
import Image from "next/image";
import React from "react";
import {FaQuoteLeft, FaQuoteRight} from "react-icons/fa";
import {useState, useEffect} from "react";
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
import {Slice} from "lucide-react";

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
        console.error(err.message); // Log the error message
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <h1 className="text-4xl font-bold text-black text-center mb-12">
        Feedback & Reviews
      </h1>

      <div className="container mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[autoplay]}
        >
          <CarouselContent>
            {feedback.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-full h-[480px] bg-white shadow-md p-6 rounded-xl">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <Image
                        src={item.image}
                        alt="feedback"
                        width={140}
                        height={140}
                        className="rounded-full mx-auto mt-4"
                      />
                      <div className="flex flex-col mx-auto text-center items-center justify-center">
                        <h2 className="text-xl text-primary-color text-opacity-80 font-bold text-center mt-4">
                          {item.name}
                        </h2>
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
                          {/* <span>
                            <FaQuoteRight />
                          </span> */}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

const feedbackData = [
  {
    user: "https://i.ibb.co/com/LpCLJ6t/04-unsplash.png",
    name: "Ahmed Zubayer",
    description:
      "This app is awesome! The quizzes are fun, and the variety of topics keeps it interesting. Perfect for passing time while learning something new.",
  },
  {
    user: "https://i.ibb.co/com/Srzp6qk/01-unsplash.png",
    name: "Julkarnine Sayer",
    description:
      "The app is well-designed, and the leaderboard adds a competitive edge. It’s great to compete with friends and see who knows more.",
  },
  {
    user: "https://i.ibb.co/com/cNhTxpw/02-unsplash.png",
    name: "Kamal Ataturk",
    description:
      "Super engaging quizzes with a smooth interface. I’ve learned so much while having fun. Plus, the achievements system is a nice touch!",
  },
  // {
  //     "user": "https://i.ibb.co/com/3Yzcp0W/03-Unsplash.png",
  //     "name": "Tahsen Kabir",
  //     "description": "A great app to sharpen your brain! The timed quizzes make it challenging, and I really enjoy the different difficulty levels."
  // },
  // {
  //     "user": "https://i.ibb.co/com/fkTcxpf/13-unsplash.png",
  //     "name": "Abu Sufian Kabbo",
  //     "description": "This app is a hidden gem. I’ve been hooked ever since I downloaded it. The range of topics is impressive, and it’s really easy to use!"
  // },
  // {
  //     "user": "https://i.ibb.co/com/8zfmYkj/09-unsplash.png",
  //     "name": "Mujahid Shanto",
  //     "description": "I love the challenge of beating the timer. It’s a great way to test your knowledge and improve your speed. Highly recommend!"
  // }
];

export default Feedback;
