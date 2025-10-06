import React from 'react';
import { Calendar, MapPin, Building, Clock, DollarSign, Users } from 'lucide-react';
import { Job } from '../types/Job';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-200 group"
      onClick={onClick}
    >
      {job.featured && (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200 mb-4">
          ⭐ Featured Position
        </div>
      )}

      {/* Client Company Info */}
      {job.clientCompany && (
        <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg border">
          {job.clientCompany.logo && (
            <img
              src={job.clientCompany.logo}
              alt={job.clientCompany.name}
              className="w-10 h-10 rounded-lg object-cover mr-3"
            />
          )}
          <div>
            <div className="text-sm font-semibold text-gray-900">{job.clientCompany.name}</div>
            <div className="text-xs text-gray-600">{job.clientCompany.industry}</div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">
              {job.clientCompany ? `${job.department} • ${job.clientCompany.name}` : job.department}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.type}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-3 text-gray-400" />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-3 text-gray-400" />
          <span className="text-sm">{job.experience} experience</span>
        </div>

        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
          <span className="text-sm font-medium text-green-600">{job.salary}</span>
        </div>

        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-3 text-gray-400" />
          <span className="text-sm">Posted {formatDate(job.postedDate)}</span>
        </div>

        {job.genderPreference && job.genderPreference !== 'Any' && (
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-3 text-gray-400" />
            <span className="text-sm">Seeking {job.genderPreference} candidates</span>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
        {job.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Click to view details
        </div>
        <div className="transform group-hover:translate-x-1 transition-transform text-blue-600">
          →
        </div>
      </div>
    </div>
  );
};

export default JobCard;