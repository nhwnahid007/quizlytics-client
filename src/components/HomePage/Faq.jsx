import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="bg-black">
      <div className="container p-4 mx-auto md:p-8 bg-black text-white">
        <h2 className="text-2xl font-semibold sm:text-4xl mb-8">
          Frequently Asked Questions:
        </h2>

        <Accordion className="w-full space-y-4" type="single" collapsible>
          <AccordionItem className="border rounded pl-4" value="item-1">
            <AccordionTrigger>Can I retake a quiz?</AccordionTrigger>
            <AccordionContent>
              Yes, you can retake quizzes as many times as you like to improve
              your score.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border rounded pl-4" value="item-2">
            <AccordionTrigger>
              Is there a time limit for each quiz?
            </AccordionTrigger>
            <AccordionContent>
              Yes, most quizzes have a time limit to add an extra challenge, but
              it varies depending on the quiz topic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border rounded pl-4" value="item-3">
            <AccordionTrigger>How is my score calculated?</AccordionTrigger>
            <AccordionContent>
              Each correct answer earns you points, and your final score is the
              sum of all correct responses. There are no penalties for incorrect
              answers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border rounded pl-4" value="item-4">
            <AccordionTrigger>
              Are there backend-focused quizzes?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We offer quizzes on MongoDB, Firebase, and Express, covering
              database management, authentication, and server-side logic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border rounded pl-4" value="item-5">
            <AccordionTrigger>
              How difficult is the React quiz?
            </AccordionTrigger>
            <AccordionContent>
              The React quiz is designed for both beginners and intermediate
              learners, covering topics like components, state management,
              hooks, lifecycle methods, and JSX.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border rounded pl-4" value="item-6">
            <AccordionTrigger>
              What can I expect in the CSS quiz?
            </AccordionTrigger>
            <AccordionContent>
              The CSS quiz includes questions on selectors, layout models
              (Flexbox, Grid), animations, responsiveness, and more.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
