"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipboardMinus, UserX } from "lucide-react";
import React from "react";

const AllUser = () => {
  const {
    data: users,
    error: roleError,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axios(`https://quizlytics.jonomukti.org/allUsers`);
      return data; // Return all user data
    },
  });

  // Handle loading and error states if necessary
  if (roleLoading) return <div>Loading...</div>;
  if (roleError) return <div>Error loading data</div>;

  return (
    <div className="text-gray-900 bg-gray-200 p-20">
      <div className="p-4 flex items-center justify-center">
        <h1 className="text-3xl ">Users</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <Table className="w-full text-md bg-white shadow-md rounded mb-4">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-left p-3 px-5 min-w-[150px]">Name</TableHead>
              <TableHead className="text-left p-3 px-5 min-w-[200px]">Email</TableHead>
              <TableHead className="text-left p-3 px-5">Role</TableHead>
              <TableHead className="text-left p-3 px-5">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-b hover:bg-orange-100">
                <TableCell className="p-3 px-5">
                  <span className="bg-transparent min-w-[200px]">{user.name}</span>
                </TableCell>
                <TableCell className="p-3 px-5">
                  <span className="bg-transparent">{user.email}</span>
                </TableCell>
                <TableCell className="p-3 px-5">
                  <select defaultValue={user.role} className="bg-transparent border-b border-gray-300 focus:outline-none">
                    <option value="user">user</option>
                    <option value="teacher">teacher</option>
                    <option value="admin">admin</option>
                  </select>
                </TableCell>
                <TableCell className="flex justify-start">
                  <button
                    type="button"
                    className="text-sm flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    <span className="text-sm"><UserX /></span> Remove User
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUser;
