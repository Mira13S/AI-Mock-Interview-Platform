import React, { useState, useEffect, useRef } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  openLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 20); // extra buffer for padding
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-2xl mb-6 overflow-hidden shadow-md border border-gray-200 transition-transform hover:scale-[1.01] hover:shadow-lg duration-300">
      {/* Top Section */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-start gap-4 px-6 pt-5 pb-3">
        {/* Left Side - Question */}
        <div className="flex items-start gap-2 flex-1">
          <span className="text-sm font-bold text-orange-500 mt-0.5">Q:</span>
          <h3
            onClick={toggleExpand}
            className="text-base font-medium text-gray-900 leading-snug hover:text-orange-600 cursor-pointer transition-colors break-words"
          >
            {question}
          </h3>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onTogglePin}
            className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
            title={isPinned ? "Unpin Question" : "Pin Question"}
          >
            {isPinned ? <LuPinOff size={20} /> : <LuPin size={20} />}
          </button>

          <button
            onClick={() => {
              setIsExpanded(true);
              openLearnMore();
            }}
            className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 font-medium transition cursor-pointer"
          >
            <LuSparkles />
            Learn More
          </button>

          <button
            onClick={toggleExpand}
            className="text-gray-400 hover:text-gray-800 transition-transform"
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Answer Section */}
      <div
        className="border-t border-gray-100 transition-all duration-300 ease-in-out px-6 overflow-hidden"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="text-sm text-gray-700 pt-4 pb-6 leading-relaxed">
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
