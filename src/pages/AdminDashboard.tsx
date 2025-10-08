import React, { useState, useEffect } from 'react';
import {  Briefcase, FileText, Users, LogOut, Menu, X, Plus} from 'lucide-react';
import Swal from "sweetalert2";

const API_BASE  = import.meta.env.VITE_API_BASE_URL  || "http://localhost:5000/api";


// Interfaces
interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    experience: string;
    salary: string;
    salaryCurrency: string;
    description: string;
    gender: string;
    industry?: string;
    industryImage?: string | File;
}

interface Applicant {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    age: number;
    gender: string;
    experience: string;
    passportCopy: string;
    resume: string;
    appliedDate: string;
    jobTitle: string;
    jobId: number;
    status: 'approved' | 'rejected' | 'pending';
}

interface Contract {
    id: number;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    industry: string;
    location: string;
    numberOfEmployees: number;
    jobType: string;
    startDate: string;
    duration: string;
    budget: string;
    budgetCurrency: string;
    requirements: string;
    status: 'approved' | 'rejected' | 'pending';
}

const CURRENCIES = ['AED', 'USD', 'EUR', 'GBP', 'INR', 'SAR', 'AUD', 'CAD', 'CHF', 'CNY', 'JPY', 'KRW', 'MXN', 'NZD', 'SEK', 'SGD', 'THB', 'TRY', 'ZAR', 'BRL', 'RUB', 'HKD', 'IDR', 'MYR', 'PHP', 'PKR', 'BDT', 'VND', 'EGP', 'NGN'];

// ---------------- POST JOB PAGE ----------------
const PostJobPage: React.FC<{
    jobs: Job[];
    fetchJobs: () => void;
}> = ({ jobs, fetchJobs }) => {
    const [formData, setFormData] = useState<Job>({
        id: 0,
        title: '',
        company: '',
        location: '',
        industryImage: undefined,
        type: '',
        experience: '',
        salary: '',
        salaryCurrency: 'AED',
        description: '',
        gender: ''
    });
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            Swal.fire('Validation Error', 'Job title is required', 'error');
            return false;
        }
        if (!formData.company.trim()) {
            Swal.fire('Validation Error', 'Company name is required', 'error');
            return false;
        }
        if (!formData.location.trim()) {
            Swal.fire('Validation Error', 'Location is required', 'error');
            return false;
        }
        if (!formData.type) {
            Swal.fire('Validation Error', 'Job type is required', 'error');
            return false;
        }
        if (!formData.experience.trim()) {
            Swal.fire('Validation Error', 'Experience requirement is required', 'error');
            return false;
        }
        if (!formData.salary.trim()) {
            Swal.fire('Validation Error', 'Salary is required', 'error');
            return false;
        }
        if (!formData.gender) {
            Swal.fire('Validation Error', 'Gender preference is required', 'error');
            return false;
        }
        if (!formData.description.trim()) {
            Swal.fire('Validation Error', 'Job description is required', 'error');
            return false;
        }
        return true;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            let uploadedImageUrl = "";

            // 1️⃣ Upload image to Supabase (if a NEW file is selected)
            if (formData.industryImage && formData.industryImage instanceof File) {
                const imageFormData = new FormData();
                imageFormData.append("industryImage", formData.industryImage);

                const uploadResponse = await fetch(`${API_BASE}/upload/job-image`, {
                    method: "POST",
                    body: imageFormData,
                });

                const uploadData = await uploadResponse.json();
                if (uploadResponse.ok) {
                    uploadedImageUrl = uploadData.url;
                } else {
                    console.error("Image upload failed:", uploadData);
                }
            }

            // 2️⃣ Create or Update the job
            const jobData = {
                title: formData.title,
                company: formData.company,
                location: formData.location,
                type: formData.type,
                experience: formData.experience,
                salary: formData.salary,
                salaryCurrency: formData.salaryCurrency,
                description: formData.description,
                gender: formData.gender,
                industry: formData.industry,
                industryImage: uploadedImageUrl || (typeof formData.industryImage === 'string' ? formData.industryImage : ""),
            };

            const response = await fetch(
                isEditMode ? `${API_BASE}/jobs/${formData.id}` : `${API_BASE}/jobs`,
                {
                    method: isEditMode ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(jobData),
                }
            );

            if (response.ok) {
                Swal.fire("Success", isEditMode ? "Job updated successfully!" : "Job created successfully!", "success");
                fetchJobs();
                handleCancelEdit(); // Reset form
            } else {
                Swal.fire("Error", isEditMode ? "Failed to update job" : "Failed to create job", "error");
            }
        } catch (err) {
            console.error("Error submitting job:", err);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };


    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This job will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280"
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`${API_BASE}/jobs/${id}`, { method: "DELETE" });

            if (!res.ok) {
                throw new Error('Failed to delete job');
            }

            Swal.fire({
                title: "Deleted!",
                text: "The job has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#1E3A8A"
            });

            fetchJobs();
        } catch (err) {
            console.error(err);
            Swal.fire('Error deleting job');
        }
    };

    const handleView = (job: Job) => {
        setSelectedJob(job);
        setIsViewModalOpen(true);
    };

    const handleEdit = (job: Job) => {
        setFormData(job);
        setIsEditMode(true);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData({
            id: 0,
            title: '',
            company: '',
            location: '',
            type: '',
            experience: '',
            salary: '',
            salaryCurrency: 'AED',
            description: '',
            gender: ''
        });
        setIsEditMode(false);
        setIsFormOpen(false);
    };

    return (
        <div className={`min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background Image for Post Job Section */}


            <div className="relative z-10">
                {/* Post Job Button */}
                <div className="flex justify-end mb-6 transform transition-all duration-500" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}>
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} />
                        {isFormOpen ? 'Close Form' : 'Post a Job'}
                    </button>
                </div>

                {/* Form Modal */}
                {isFormOpen && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-slideDown border-2 border-blue-600">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <Briefcase className="text-blue-600" size={24} />
                                {isEditMode ? 'Edit Job' : 'Post New Job'}
                            </h2>
                            {isEditMode && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-red-600 hover:text-red-800 font-medium flex items-center gap-2 transition-colors"
                                >
                                    <X size={20} />
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Job Title *"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Company *"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry || ""}
                                onChange={handleInputChange}
                                placeholder="Industry (e.g., Technology, Cleaning, Construction)"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Upload Industry Image (optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setFormData({ ...formData, industryImage: e.target.files?.[0] })
                                        }
                                    }
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
                                />
                            </div>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Location *"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            >
                                <option value="">Job Type *</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="Experience Required *"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                            <div className="flex gap-2">
                                <select
                                    name="salaryCurrency"
                                    value={formData.salaryCurrency}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 transition-all"
                                >
                                    {CURRENCIES.map(curr => (
                                        <option key={curr} value={curr}>{curr}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    placeholder="Salary Range (e.g., 5000-8000) *"
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 transition-all"
                                />
                            </div>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            >
                                <option value="">Gender Preference *</option>
                                <option value="Any">Any</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Job Description *"
                                className="border border-gray-300 p-3 rounded-lg md:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                rows={4}
                                required
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                            >
                                {isEditMode ? 'Update Job' : 'Post Job'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Posted Jobs Table */}
                <div className="bg-blue-600 rounded-lg shadow-lg p-6 animate-fadeIn border-2 border-blue-600">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                        <FileText className="text-white" size={20} />
                        Posted Jobs
                    </h3>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg bg-white">
                        <table className="w-full">
                            <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="p-3 text-left font-semibold">Title</th>
                                <th className="p-3 text-left font-semibold">Company</th>
                                <th className="p-3 text-left font-semibold">Location</th>
                                <th className="p-3 text-center font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jobs.map(job => (
                                <tr key={job.id} className="border-t hover:bg-gray-50 transition-colors">
                                    <td className="p-3">{job.title}</td>
                                    <td className="p-3">{job.company}</td>
                                    <td className="p-3">{job.location}</td>
                                    <td className="p-3">
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={() => handleView(job)}
                                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleEdit(job)}
                                                className="text-green-600 hover:text-green-800 font-medium transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job.id)}
                                                className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* View Job Modal */}
                {isViewModalOpen && selectedJob && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                        <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
                            <h3 className="text-2xl font-bold mb-4">Job Details</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Title</p>
                                        <p className="font-semibold">{selectedJob.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Company</p>
                                        <p className="font-semibold">{selectedJob.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-semibold">{selectedJob.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Type</p>
                                        <p className="font-semibold">{selectedJob.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Experience</p>
                                        <p className="font-semibold">{selectedJob.experience}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Salary</p>
                                        <p className="font-semibold">{selectedJob.salaryCurrency} {selectedJob.salary}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-semibold">{selectedJob.gender || 'Any'}</p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t">
                                    <p className="text-sm text-gray-500 mb-2">Description</p>
                                    <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    setSelectedJob(null);
                                }}
                                className="mt-6 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}} />
        </div>
    );
};

// ---------------- APPLICATIONS PAGE ----------------
const ApplicationsPage: React.FC<{
    applicants: Applicant[],
    fetchApplicants: () => void,
    jobs: Job[]
}> = ({ applicants, fetchApplicants, jobs }) => {
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

    const getJobTitle = (jobId: number) => {
        const job = jobs.find(j => j.id === jobId);
        return job ? job.title : 'Unknown Job';
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            const response = await fetch(`${API_BASE}/applications/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            await Swal.fire({
                title: "Status Updated!",
                text: `Application status changed to ${status}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            fetchApplicants();
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Error',
                text: 'Failed to update status',
                icon: 'error',
                confirmButtonColor: '#DC2626'
            });
        }
    };

    const deleteApplicant = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This application will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280"
        });

        if (!result.isConfirmed) return;

        try {
            await fetch(`${API_BASE}/applications/${id}`, { method: "DELETE" });
            Swal.fire({
                title: "Deleted!",
                text: "The application has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#1E3A8A"
            });
            fetchApplicants();
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "Failed to delete application.",
                icon: "error",
                confirmButtonText: "Retry",
                confirmButtonColor: "#DC2626"
            });
        }
    };

    return (
        <div className="min-h-screen">
            {/* Background Image for Applications Section */}


            <div className="bg-blue-600 rounded-lg shadow-lg animate-fadeIn">
                <h2 className="text-2xl font-semibold text-white p-6 flex items-center gap-2">
                    <Users className="text-white" size={24} />
                    Applications
                </h2>
                <div className="bg-white rounded-lg p-4">


                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left font-semibold">Full Name</th>
                            <th className="p-3 text-left font-semibold">Job Applied</th>
                            <th className="p-3 text-left font-semibold">Phone</th>
                            <th className="p-3 text-left font-semibold">Status</th>
                            <th className="p-3 text-center font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applicants.map(app => (
                            <tr key={app.id} className="border-t hover:bg-gray-50 transition-colors">
                                <td className="p-3">{app.fullName}</td>
                                <td className="p-3">{getJobTitle(app.jobId)}</td>
                                <td className="p-3">{app.phone}</td>
                                <td className="p-3">
                                    <select
                                        value={app.status}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            updateStatus(app.id, e.target.value);
                                        }}
                                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={() => setSelectedApplicant(app)}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => deleteApplicant(app.id)}
                                            className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* View Applicant Modal */}
                {selectedApplicant && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                        <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
                            <h3 className="text-2xl font-bold mb-4">Applicant Details</h3>
                            <div className="space-y-3">
                                <p><span className="font-semibold">Name:</span> {selectedApplicant.fullName}</p>
                                <p><span className="font-semibold">Email:</span> {selectedApplicant.email}</p>
                                <p><span className="font-semibold">Phone:</span> {selectedApplicant.phone}</p>
                                <p><span className="font-semibold">Country:</span> {selectedApplicant.country}</p>
                                <p><span className="font-semibold">Age:</span> {selectedApplicant.age}</p>
                                <p><span className="font-semibold">Gender:</span> {selectedApplicant.gender}</p>
                                <p><span className="font-semibold">Experience:</span> {selectedApplicant.experience}</p>
                                {selectedApplicant.resume && (
                                    <p>
                                        <span className="font-semibold">Resume:</span>{" "}
                                        <a
                                            href={selectedApplicant.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Resume
                                        </a>
                                    </p>
                                )}
                                {selectedApplicant.passportCopy && (
                                    <p>
                                        <span className="font-semibold">Passport Copy:</span>{" "}
                                        <a
                                            href={selectedApplicant.passportCopy}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Passport
                                        </a>
                                    </p>
                                )}
                                <p><span className="font-semibold">Job Applied:</span> {getJobTitle(selectedApplicant.jobId)}</p>
                                <p><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${selectedApplicant.status === 'approved' ? 'bg-green-100 text-green-800' : selectedApplicant.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{selectedApplicant.status}</span></p>
                            </div>
                            <button
                                onClick={() => setSelectedApplicant(null)}
                                className="mt-6 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
            `}} />
            </div>
        </div>
    );
};

// ---------------- CONTRACTS PAGE ----------------
const ContractsPage: React.FC<{ contracts: Contract[], fetchContracts: () => void }> = ({ contracts, fetchContracts }) => {
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    const updateStatus = async (id: number, status: string) => {
        console.log('🔄 Updating contract status');
        console.log('   ID:', id);
        console.log('   Status:', status);

        try {
            const url = `${API_BASE}/contracts/${id}/status`;
            console.log('   Calling URL:', url);

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            const data = await response.json();
            console.log('   Response:', response.status, data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update status');
            }

            await Swal.fire({
                title: "Status Updated!",
                text: `Contract status changed to ${status}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            fetchContracts();
        } catch (err: any) {
            console.error('❌ Error updating contract status:', err);
            Swal.fire({
                title: 'Error',
                text: err.message || 'Failed to update status',
                icon: 'error',
                confirmButtonColor: '#DC2626'
            });
        }
    };

    const deleteContract = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This contract will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280"
        });

        if (!result.isConfirmed) return;

        try {
            await fetch(`${API_BASE}/contracts/${id}`, { method: "DELETE" });
            Swal.fire({
                title: "Deleted!",
                text: "The contract has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#1E3A8A"
            });
            fetchContracts();
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "Failed to delete contract.",
                icon: "error",
                confirmButtonText: "Retry",
                confirmButtonColor: "#DC2626"
            });
        }
    };

    return (
        <>
            <div
                className="relative min-h-screen">
                {/* Background Image for Contracts Section */}


                <div className="bg-blue-600 rounded-lg shadow-lg p-6 animate-fadeIn">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
                        <FileText className="text-white" size={24} />
                        Contracts
                    </h2>
                    <div className="bg-white rounded-lg p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full border rounded-lg">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left font-semibold">Company</th>
                                <th className="p-3 text-left font-semibold">Industry</th>
                                <th className="p-3 text-left font-semibold">Phone</th>
                                <th className="p-3 text-left font-semibold">Status</th>
                                <th className="p-3 text-center font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(contracts) && contracts.length > 0 ? (
                                contracts.map((c) => (
                                    <tr key={c.id} className="border-t hover:bg-gray-50 transition-colors">
                                        <td className="p-3">{c.companyName}</td>
                                        <td className="p-3">{c.industry}</td>
                                        <td className="p-3">{c.phone}</td>
                                        <td className="p-3">
                                            <select
                                                value={c.status}
                                                onChange={(e) => updateStatus(c.id, e.target.value)}
                                                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-3 justify-center">
                                                <button
                                                    onClick={() => setSelectedContract(c)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => deleteContract(c.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-4 text-gray-500">
                                        No contracts found
                                    </td>
                                </tr>
                            )}
                            </tbody>

                        </table>
                    </div>

                    {/* View Contract Modal */}
                    {selectedContract && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                            <div
                                className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
                                <h3 className="text-2xl font-bold mb-4">Contract Details</h3>
                                <div className="space-y-3">
                                    <p><span className="font-semibold">Company:</span> {selectedContract.companyName}
                                    </p>
                                    <p><span
                                        className="font-semibold">Contact Person:</span> {selectedContract.contactPerson}
                                    </p>
                                    <p><span className="font-semibold">Email:</span> {selectedContract.email}</p>
                                    <p><span className="font-semibold">Phone:</span> {selectedContract.phone}</p>
                                    <p><span className="font-semibold">Industry:</span> {selectedContract.industry}</p>
                                    <p><span className="font-semibold">Location:</span> {selectedContract.location}</p>
                                    <p><span
                                        className="font-semibold">Employees Needed:</span> {selectedContract.numberOfEmployees}
                                    </p>
                                    <p><span className="font-semibold">Job Type:</span> {selectedContract.jobType}</p>
                                    <p><span className="font-semibold">Start Date:</span> {formatDate(selectedContract.startDate)}</p>

                                    <p><span className="font-semibold">Duration:</span> {selectedContract.duration}</p>
                                    <p><span
                                        className="font-semibold">Budget:</span> {selectedContract.budgetCurrency} {selectedContract.budget}
                                    </p>
                                    <p><span
                                        className="font-semibold">Requirements:</span> {selectedContract.requirements}
                                    </p>
                                    <p><span className="font-semibold">Status:</span> <span
                                        className={`px-2 py-1 rounded ${selectedContract.status === 'approved' ? 'bg-green-100 text-green-800' : selectedContract.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{selectedContract.status}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedContract(null)}
                                    className="mt-6 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>


            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
            `
            }}/>
        </>
    );

};


// ---------------- MAIN DASHBOARD ----------------
const AdminDashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'post-job' | 'applications' | 'contracts'>('post-job');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);

    const fetchJobs = async () => {
        try {
            const res = await fetch(`${API_BASE}/jobs`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        }
    };

    const fetchApplicants = async () => {
        try {
            const res = await fetch(`${API_BASE}/applications`);
            const data = await res.json();
            setApplicants(data);
        } catch (err) {
            console.error('Error fetching applications:', err);
        }
    };

    const fetchContracts = async () => {
        try {
            const res = await fetch(`${API_BASE}/contracts`);
            const data = await res.json();
            setContracts(data);
        } catch (err) {
            console.error('Error fetching contracts:', err);
        }
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Logout",
            text: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280"
        });

        if (result.isConfirmed) {
            // Clear any stored session data
            localStorage.removeItem('adminToken');
            sessionStorage.clear();

            // Show success message
            await Swal.fire({
                title: "Logged Out",
                text: "You have been successfully logged out.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#1E3A8A",
                timer: 2000
            });

            // Redirect to login page or home page
            window.location.href = '/login'; // Change this to your actual login route
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchApplicants();
        fetchContracts();
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
                <div className="p-6 border-b border-blue-800 flex justify-between items-center">
                    {sidebarOpen && <h1 className="text-xl font-bold">Nexus Talent</h1>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-blue-800 p-2 rounded transition-colors">
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>
                <nav className="p-4 flex-1">
                    <button
                        onClick={() => setCurrentPage('post-job')}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-blue-800 rounded mb-2 transition-all duration-200 ${currentPage === 'post-job' ? 'bg-blue-800 shadow-lg' : ''}`}
                    >
                        <Briefcase /> {sidebarOpen && 'Post Job'}
                    </button>
                    <button
                        onClick={() => setCurrentPage('applications')}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-blue-800 rounded mb-2 transition-all duration-200 ${currentPage === 'applications' ? 'bg-blue-800 shadow-lg' : ''}`}
                    >
                        <Users /> {sidebarOpen && 'Applications'}
                    </button>
                    <button
                        onClick={() => setCurrentPage('contracts')}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-blue-800 rounded transition-all duration-200 ${currentPage === 'contracts' ? 'bg-blue-800 shadow-lg' : ''}`}
                    >
                        <FileText /> {sidebarOpen && 'Contracts'}
                    </button>
                </nav>
                <div className="p-4 border-t border-blue-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 hover:bg-blue-800 rounded transition-colors"
                    >
                        <LogOut /> {sidebarOpen && 'Logout'}
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto bg-white">
                <header className="bg-white shadow-sm p-6 border-b z-20 relative">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {currentPage === 'post-job' && 'Post Job'}
                            {currentPage === 'applications' && 'Applications'}
                            {currentPage === 'contracts' && 'Contracts'}
                        </h1>

                    </div>
                </header>
                <div className="p-6">
                    {currentPage === 'post-job' && <PostJobPage jobs={jobs} fetchJobs={fetchJobs} />}
                    {currentPage === 'applications' && <ApplicationsPage applicants={applicants} fetchApplicants={fetchApplicants} jobs={jobs} />}
                    {currentPage === 'contracts' && <ContractsPage contracts={contracts} fetchContracts={fetchContracts} />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;