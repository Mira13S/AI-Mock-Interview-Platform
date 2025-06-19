import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader';
import axiosInstance from '../../utils/axioInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError('Please fill all the required fields.');
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-blue-900">Start a New Interview Journey</h3>
        <p className="text-sm text-gray-600 mt-1">
          Fill out a few quick details to generate your personalized interview questions.
        </p>
      </div>

      <form onSubmit={handleCreateSession} className="space-y-4">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange('role', target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange('experience', target.value)}
          label="Years of Experience"
          placeholder="e.g., 1, 3, 5+"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange('topicsToFocus', target.value)}
          label="Topics to Focus On"
          placeholder="e.g., React, Node.js"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange('description', target.value)}
          label="Description (Optional)"
          placeholder="Any specific goals or notes"
          type="text"
        />

        {error && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 rounded-full font-semibold text-sm text-white mt-2 transition-all
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
            }`}
        >
          {isLoading ? <SpinnerLoader /> : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
