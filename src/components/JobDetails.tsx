import React from 'react';
import { X, MapPin, Building, Clock, DollarSign, Calendar, Users, Award, Gift, UserCheck } from 'lucide-react';
import { Job } from '../types/Job';

interface JobDetailsProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, isOpen, onClose, onApply }) => {
  if (!isOpen || !job) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                {job.featured && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200 mr-4">
                    ⭐ Featured Position
                  </div>
                )}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.type}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
              
              {/* Client Company Section */}
              {job.clientCompany && (
                <div className="flex items-center mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  {job.clientCompany.logo && (
                    <img 
                      src={job.clientCompany.logo} 
                      alt={job.clientCompany.name}
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                  )}
                  <div>
                    <div className="text-lg font-bold text-blue-900">{job.clientCompany.name}</div>
                    <div className="text-sm text-blue-700">{job.clientCompany.industry} • {job.clientCompany.location}</div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{job.clientCompany ? `${job.department} at ${job.clientCompany.name}` : job.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
              </div>
              
              {job.genderPreference && job.genderPreference !== 'Any' && (
                <div className="flex items-center mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    This position is seeking {job.genderPreference.toLowerCase()} candidates
                  </span>
                </div>
              )}
              
              <div className="flex items-center mt-3">
                <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-lg font-semibold text-green-600">{job.salary}</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  About This Role
                </h3>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
                
                {/* Client Company Description */}
                {job.clientCompany && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">About {job.clientCompany.name}</h4>
                    <p className="text-blue-800 leading-relaxed">{job.clientCompany.description}</p>
                  </div>
                )}
              </section>

              {/* Responsibilities */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-500" />
                  Requirements & Qualifications
                </h3>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Button */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <button
                  onClick={onApply}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Apply for This Position
                </button>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Join our team and build your career in Abu Dhabi
                </p>
              </div>

              {/* Benefits */}
              <section className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-blue-500" />
                  Benefits & Perks
                </h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Company Info */}
              <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3">
                  {job.clientCompany ? `Why Work with ${job.clientCompany.name}?` : 'Why Join Us?'}
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  {job.clientCompany 
                    ? `${job.clientCompany.name} is a leading company in the ${job.clientCompany.industry} sector, committed to excellence and creating opportunities for talented professionals to thrive.`
                    : "We're one of Abu Dhabi's leading companies, committed to excellence, innovation, and creating opportunities for talented professionals to thrive."
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    <span className="text-blue-100">Award-winning workplace culture</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    <span className="text-blue-100">Career development opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    <span className="text-blue-100">International work environment</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                    <span className="text-blue-100">Placed through Nexus HR Consultancy</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;