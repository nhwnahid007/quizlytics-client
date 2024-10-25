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
import { useState } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"; // Adjust the import path
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: users,
    error: roleError,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axios(`https://quizlytics.jonomukti.org/allUsers`);
      return data;
    },
  });

  if (roleLoading) return <div>Loading...</div>;
  if (roleError) return <div>Error loading data</div>;

  const handleDelete = async (email) => {
    try {
      console.log(email);

      const response = await axios.delete(`https://quizlytics.jonomukti.org/deleteUser?email=${email}`);
      if (response.data) {
        toast.success("Deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200 p-20">
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="text-sm flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setSelectedUser(user.email)}
                      >
                        <span className="text-sm"><UserX /></span> Remove User
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this user?
                      </AlertDialogDescription>
                      <AlertDialogAction
                        onClick={() => handleDelete(selectedUser)}
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                      >
                        Confirm
                      </AlertDialogAction>
                      <AlertDialogCancel asChild>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded">
                          Cancel
                        </button>
                      </AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
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
