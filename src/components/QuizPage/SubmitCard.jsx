import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SubmitCard = ({ item }) => {
  return (
    <div className="mb-4">
      <Card>
        <CardHeader>
          <CardTitle>{item.question}</CardTitle>
          <CardDescription>Options:</CardDescription>
        </CardHeader>
        <CardContent>
          {item.options?.map((option) => (
            <li key={option[0]}>{option}</li>
          ))}
        </CardContent>
        <CardFooter>
          <p>
            Correct Answer:{" "}
            {item.options.find(
              (answer) => answer == item.options[item.correct_answer]
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmitCard;
