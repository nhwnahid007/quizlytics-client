import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CustomExam = ({ setCustomExam, setQuizKey }) => {
  const handleChange = (e) => {
    setQuizKey(e.target.value);
  };
  const handleStart = () => {
    setCustomExam(false);
    console.log("exam started");
  };

  return (
    <div className="h-[300px] flex flex-col justify-center items-center">
      <div className="mb-4 text-center">
        <label className="block text-gray-700">Enter Quiz Key to Start</label>
        <Input
          type="text"
          name="question"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />

        <Button
          onClick={handleStart}
          type="submit"
          className="mt-4"
          variant="default"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default CustomExam;
