"use client"

import { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { CARD_BG } from "../../utils/data"
import toast from "react-hot-toast"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axioInstance"
import { API_PATHS } from "../../utils/apiPaths"
import SummaryCard from "../../components/Cards/SummaryCard"
import moment from "moment"
import Modal from "../../components/Loaders/Modal"
import CreateSessionForm from ".././Home/CreateSessionForm"
import DeleteAlertContent from "../../components/Loaders/DeleteAlertContent"

const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data)
    } catch (error) {
      console.error("Error fetching session data:", error)
    }
  }

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))
      toast.success("Session Deleted Successfully")
      setOpenDeleteAlert({ open: false, data: null })
      fetchAllSessions()
    } catch (error) {
      console.error("Error deleting session data")
    }
  }

  useEffect(() => {
    fetchAllSessions()
  }, [])

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Enhanced Header Section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Your Sessions
                </h1>
                <p className="text-lg text-slate-600 font-medium">Manage and review your interview prep sessions</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
                  <span className="text-sm font-semibold text-slate-700">Total Sessions: {sessions.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Cards Grid */}
          {sessions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
              {sessions?.map((data, index) => (
                <div key={data?._id} className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocus || ""}
                    experience={data?.experience || "-"}
                    questions={data?.questions?.length || "-"}
                    description={data?.description || ""}
                    lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Enhanced Empty State */
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-12 text-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">No Sessions Yet</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Start your interview preparation journey by creating your first session.
                </p>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <LuPlus className="text-lg" />
                  Create First Session
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Floating Action Button */}
          {sessions.length > 0 && (
            <div className="fixed bottom-8 right-8 z-50">
              <button
                className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 font-semibold text-sm border border-white/20"
                onClick={() => setOpenCreateModal(true)}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LuPlus className="text-xl relative z-10" />
                <span className="relative z-10">Add New</span>

                {/* Floating animation ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-75 animate-ping"></div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Create Modal */}
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <div className="p-6 sm:p-8 bg-white rounded-2xl">
          <CreateSessionForm />
        </div>
      </Modal>

      {/* Enhanced Delete Alert Modal */}
      <Modal
  isOpen={openDeleteAlert?.open}
  onClose={() => setOpenDeleteAlert({ open: false, data: null })}
  title="Delete Session"
>
  <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl">
    <DeleteAlertContent
      content="Are you sure you want to delete this session? This action cannot be undone."
      onDelete={() => deleteSession(openDeleteAlert.data)}
    />
  </div>
</Modal>


    </DashboardLayout>
  )
}

export default Dashboard
