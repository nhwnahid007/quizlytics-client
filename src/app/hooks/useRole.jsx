"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";


const useRole = () => {

  const { data: session } = useSession();
  console.log(session);
  

  const user = session?.user;

  console.log(user?.email);

  const { data: role = "" } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      
      const { data } = await axios(`https://quizlytics.jonomukti.org/user/role?email=${user?.email}`);
      
      return data.role;
    },
  });

  console.log(role);
  return [role];
};

export default useRole;
