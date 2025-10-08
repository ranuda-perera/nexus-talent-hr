import React, { useState } from 'react';
import { Users, Building2, Calendar, FileText, X, Send, CheckCircle } from 'lucide-react';
import Swal from "sweetalert2";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// === API Base URL ===
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


const CURRENCIES = ['AED', 'USD', 'EUR', 'GBP', 'INR', 'SAR'];

const BUDGET_RANGES = [
    '0 - 50,000',
    '50,000 - 100,000',
    '100,000 - 250,000',
    '250,000 - 500,000',
    '500,000 - 1,000,000',
    '1,000,000+'
];

interface FormData {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    countryCode: string;
    industry: string;
    location: string;
    numberOfEmployees: string;
    jobType: string;
    startDate: string;
    duration: string;
    requirements: string;
    budgetMin: string;
    budgetMax: string;
    budgetCurrency: string;
    budgetRange: string;
}

interface ValidationErrors {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    industry?: string;
    location?: string;
    numberOfEmployees?: string;
    jobType?: string;
    startDate?: string;
    budgetMin?: string;
    budgetMax?: string;
}

const RequestWorkforcePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        countryCode: '+971',
        industry: '',
        location: '',
        numberOfEmployees: '',
        jobType: '',
        startDate: '',
        duration: '',
        requirements: '',
        budgetMin: '',
        budgetMax: '',
        budgetCurrency: 'AED',
        budgetRange: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must contain only digits';
        } else if (formData.phone.length < 7 || formData.phone.length > 15) {
            newErrors.phone = 'Phone number must be between 7 and 15 digits';
        }
        if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.numberOfEmployees) {
            newErrors.numberOfEmployees = 'Number of employees is required';
        } else if (parseInt(formData.numberOfEmployees) < 1) {
            newErrors.numberOfEmployees = 'Must be at least 1 employee';
        }
        if (!formData.jobType) newErrors.jobType = 'Job type is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (formData.budgetMin && !/^\d+$/.test(formData.budgetMin)) newErrors.budgetMin = 'Budget must be a number';
        if (formData.budgetMax && !/^\d+$/.test(formData.budgetMax)) newErrors.budgetMax = 'Budget must be a number';
        if (formData.budgetMin && formData.budgetMax && parseInt(formData.budgetMin) > parseInt(formData.budgetMax)) {
            newErrors.budgetMax = 'Maximum budget must be greater than minimum';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            const budget = formData.budgetRange || (formData.budgetMin && formData.budgetMax ? `${formData.budgetMin} - ${formData.budgetMax}` : '');
            const res = await fetch(`${API_BASE}/contracts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    phone: `${formData.countryCode} ${formData.phone}`,
                    budget,
                    numberOfEmployees: parseInt(formData.numberOfEmployees)
                }),
            });

            if (!res.ok) throw new Error("Failed to submit workforce request");
            Swal.fire({
                title: "Request Submitted!",
                text: "Your workforce request has been successfully submitted. We will contact you shortly.",
                icon: "success",
                confirmButtonText: "Okay",
                confirmButtonColor: "#1E3A8A",
                background: "#ffffff",
                color: "#111827"
            });

            setIsModalOpen(false);
            setFormData({
                companyName: '', contactPerson: '', email: '', phone: '', countryCode: '+971',
                industry: '', location: '', numberOfEmployees: '', jobType: '', startDate: '',
                duration: '', requirements: '', budgetMin: '', budgetMax: '', budgetCurrency: 'AED', budgetRange: ''
            });
            setErrors({});
        } catch (err) {
            console.error("Error submitting workforce request:", err);
            Swal.fire({
                title: "Submission Failed",
                text: "There was an error while submitting your workforce request. Please try again.",
                icon: "error",
                confirmButtonText: "Retry",
                confirmButtonColor: "#DC2626",
                background: "#fff5f5",
                color: "#b91c1c"
            });

        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold mb-6 animate-fade-in">Request Workforce</h1>
                        <p className="text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Need multiple employees for your business? We provide bulk workforce solutions tailored to your needs
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-blue-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Users className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Bulk Hiring</h3>
                        <p className="text-gray-600 leading-relaxed">Get access to multiple qualified candidates at once for your large-scale hiring needs</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-green-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Pre-Screened Talent</h3>
                        <p className="text-gray-600 leading-relaxed">All candidates are thoroughly vetted and trained to meet your specific requirements</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-purple-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Calendar className="w-10 h-10 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Deployment</h3>
                        <p className="text-gray-600 leading-relaxed">Fast turnaround time with employees ready to start within your required timeframe</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-t-4 border-blue-600 mb-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <Building2 className="w-12 h-12 text-blue-600" />
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">Ready to Build Your Team?</h2>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Submit your workforce requirements and let us handle the rest. Our team will get back to you within 24 hours with a customized solution.
                        </p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-10 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
                            <Users className="w-6 h-6" />
                            Request Workforce
                        </button>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { num: 1, title: 'Submit Request', desc: 'Fill out the workforce request form with your requirements' },
                            { num: 2, title: 'Consultation', desc: 'Our team reviews and contacts you for detailed discussion' },
                            { num: 3, title: 'Candidate Matching', desc: 'We source and screen qualified candidates for your needs' },
                            { num: 4, title: 'Deployment', desc: 'Employees are deployed to your location as scheduled' }
                        ].map((step) => (
                            <div key={step.num} className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">{step.num}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500 px-8 py-6 rounded-t-3xl z-10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Request Workforce</h2>
                                    <p className="text-blue-100 mt-2">Fill out the form below and we'll get back to you soon</p>
                                </div>
                                <button onClick={() => { setIsModalOpen(false); setErrors({}); }} className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="px-8 py-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-blue-600" />Company Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name <span className="text-red-500">*</span></label>
                                            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="Your Company Ltd." />
                                            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person <span className="text-red-500">*</span></label>
                                            <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="John Doe" />
                                            {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="john@company.com" />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                            <div className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl`}>
                                                <PhoneInput
                                                    defaultCountry="ae"
                                                    value={`${formData.countryCode}${formData.phone}`}
                                                    onChange={(phone, meta) => {
                                                        const dialCode = `+${meta.country.dialCode}`;
                                                        const localNumber = phone.replace(dialCode, '').trim();

                                                        setFormData({
                                                            ...formData,
                                                            phone: localNumber,
                                                            countryCode: dialCode,
                                                        });
                                                    }}
                                                    inputStyle={{
                                                        width: '100%',
                                                        border: 'none',
                                                        padding: '12px',
                                                        fontSize: '14px',
                                                        borderRadius: '0.75rem',
                                                    }}
                                                    countrySelectorStyleProps={{
                                                        buttonStyle: {
                                                            border: 'none',
                                                            borderRight: '1px solid #e5e7eb',
                                                            backgroundColor: 'transparent',
                                                            padding: '12px',
                                                        },
                                                        dropdownStyleProps: {
                                                            style: {
                                                                zIndex: 9999,
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Industry <span className="text-red-500">*</span></label>
                                            <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.industry ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="e.g. Hospitality, Construction" />
                                            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                                            <input type="text" name="location" value={formData.location} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="Dubai, UAE" />
                                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-blue-600" />Workforce Requirements
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Employees <span className="text-red-500">*</span></label>
                                            <input type="number" name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleInputChange} onKeyPress={(e) => { if (!/\d/.test(e.key)) e.preventDefault(); }} min="1" className={`w-full px-4 py-3 border ${errors.numberOfEmployees ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="e.g. 50" />
                                            {errors.numberOfEmployees && <p className="text-red-500 text-sm mt-1">{errors.numberOfEmployees}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type <span className="text-red-500">*</span></label>
                                            <select name="jobType" value={formData.jobType} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.jobType ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                                                <option value="">Select Job Type</option>
                                                <option value="cleaning">Cleaning Staff</option>
                                                <option value="security">Security Personnel</option>
                                                <option value="maintenance">Maintenance Workers</option>
                                                <option value="hospitality">Hospitality Staff</option>
                                                <option value="construction">Construction Workers</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                                            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className={`w-full px-4 py-3 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} />
                                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contract Duration</label>
                                            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. 6 months, 1 year, Permanent" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Budget</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Budget Range (Optional)</label>
                                        <select name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                            <option value="">Choose a range...</option>
                                            {BUDGET_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
                                        </select>
                                    </div>
                                    <p className="text-center text-gray-500 my-4">OR</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                                            <select name="budgetCurrency" value={formData.budgetCurrency} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                {CURRENCIES.map((curr) => <option key={curr} value={curr}>{curr}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Budget</label>
                                            <input type="text" name="budgetMin" value={formData.budgetMin} onChange={handleInputChange} onKeyPress={(e) => { if (!/\d/.test(e.key)) e.preventDefault(); }} className={`w-full px-4 py-3 border ${errors.budgetMin ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="50000" />
                                            {errors.budgetMin && <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Budget</label>
                                            <input type="text" name="budgetMax" value={formData.budgetMax} onChange={handleInputChange} onKeyPress={(e) => { if (!/\d/.test(e.key)) e.preventDefault(); }} className={`w-full px-4 py-3 border ${errors.budgetMax ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="100000" />
                                            {errors.budgetMax && <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-600" />Additional Requirements
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Specific Requirements & Qualifications</label>
                                        <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Please describe any specific skills, qualifications, experience level, or other requirements for the workforce..." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 rounded-b-3xl border-t border-gray-200">
                            <div className="flex justify-end gap-4">
                                <button onClick={() => { setIsModalOpen(false); setErrors({}); }} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-all font-semibold">Cancel</button>
                                <button onClick={handleSubmit} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center gap-2 shadow-lg">
                                    <Send className="w-5 h-5" />Submit Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="bg-gray-900 text-white py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">© 2024 Nexus Talent HR. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default RequestWorkforcePage;