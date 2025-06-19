
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loaders/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axioInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Loaders/Drawer";
import SkeletonLoader from "../../components/Loaders/SkeletonLoader";

const InterviewPrep = () => {
  const { sessionID } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionID)
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate an explanation. Please try again.");
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const airesponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = airesponse.data;
      const sessionId = sessionID;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added more Q&A!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionID) {
      fetchSessionDetailsById();
    }
  }, [sessionID]);

  return (
  <DashboardLayout>
    {/* Header Section */}
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-md p-8 md:p-10 space-y-4">
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || "-"}
            questions={sessionData?.questions?.length || "-"}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Questions Column */}
          <div className={`${
            openLearnMoreDrawer 
              ? "lg:col-span-7" 
              : "lg:col-span-8 lg:col-start-3"
          } transition-all duration-300 ease-in-out`}>
            
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Interview Q & A
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Practice with AI-generated questions tailored to your role and experience level
              </p>
            </div>

            {/* Questions Container */}
            <div className="space-y-6">
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 80,
                      delay: index * 0.08,
                    }}
                    layout
                    layoutId={`question-${data._id}`}
                    className="transform hover:scale-[1.01] transition-transform duration-200"
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      openLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More Button */}
             {sessionData?.questions?.length > 0 && (
          <motion.div 
            className="flex justify-center pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading || isUpdateLoader}
              onClick={uploadMoreQuestions}
            >
              <div className="flex items-center gap-3">
                {isUpdateLoader ? (
                  <SpinnerLoader />
                ) : (
                  <LuListCollapse className="text-xl transition-transform group-hover:rotate-12" />
                )}
                <span className="text-base">
                  {isUpdateLoader ? "Loading..." : "Load More Questions"}
                </span>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          </motion.div>
        )}


              {/* Empty State */}
              {sessionData?.questions?.length === 0 && (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-gray-400 mb-4">
                    <LuListCollapse className="mx-auto text-6xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No questions yet
                  </h3>
                  <p className="text-gray-500">
                    Questions will appear here once they're generated
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Spacer for when drawer is closed */}
          {!openLearnMoreDrawer && (
            <div className="hidden lg:block lg:col-span-2"></div>
          )}
        </div>
      </div>
    </div>

    {/* AI Response Drawer */}
    <Drawer
      isOpen={openLearnMoreDrawer}
      onClose={() => setOpenLearnMoreDrawer(false)}
      title={!isLoading && explanation?.title}
    >
      <div className="p-6">
        {errorMsg && (
          <motion.div 
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-start gap-3 text-amber-700">
              <LuCircleAlert className="text-lg mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          </motion.div>
        )}
        
        <div className="prose prose-sm max-w-none">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </div>
      </div>
    </Drawer>
  </DashboardLayout>
);
}

export default InterviewPrep;