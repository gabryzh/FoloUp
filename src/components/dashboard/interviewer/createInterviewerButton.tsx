"use client";

import { Card, CardContent } from "@/components/ui/card";
import { InterviewerService } from "@/services/interviewers.service";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

function CreateInterviewerButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingZh, setIsLoadingZh] = useState(false);

  const createInterviewers = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/create-interviewer", {});
    console.log(response);
    setIsLoading(false);
    InterviewerService.getAllInterviewers();
    window.location.reload();
  };

  const createChineseInterviewers = async () => {
    setIsLoadingZh(true);
    const response = await axios.get("/api/create-interviewer-zh", {});
    console.log(response);
    setIsLoadingZh(false);
    InterviewerService.getAllInterviewers();
    window.location.reload();
  };

  return (
    <>
      <Card
        className="p-0 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 h-40 w-36 ml-1 mr-3 rounded-xl shrink-0 overflow-hidden shadow-md"
        onClick={() => createInterviewers()}
      >
        <CardContent className="p-0">
          {isLoading ? (
            <div className="w-full h-20 overflow-hidden flex justify-center items-center">
              <Loader2 size={40} className="animate-spin" />
            </div>
          ) : (
            <div className="w-full h-20 overflow-hidden flex justify-center items-center">
              <Plus size={40} />
            </div>
          )}
          <p className="my-3 mx-auto text-xs text-wrap w-fit text-center">
            Create English Interviewers
          </p>
        </CardContent>
      </Card>
      <Card
        className="p-0 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 h-40 w-36 ml-1 mr-3 rounded-xl shrink-0 overflow-hidden shadow-md"
        onClick={() => createChineseInterviewers()}
      >
        <CardContent className="p-0">
          {isLoadingZh ? (
            <div className="w-full h-20 overflow-hidden flex justify-center items-center">
              <Loader2 size={40} className="animate-spin" />
            </div>
          ) : (
            <div className="w-full h-20 overflow-hidden flex justify-center items-center">
              <Plus size={40} className="text-red-500" />
            </div>
          )}
          <p className="my-3 mx-auto text-xs text-wrap w-fit text-center">
            创建中文面试官
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default CreateInterviewerButton;
