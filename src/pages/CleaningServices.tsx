import React from 'react';
import { Download, Users, Shield, Eye, Heart, Clock, Phone, Mail, MapPin } from 'lucide-react';

const CleaningServices: React.FC = () => {
  const pricingTiers = [
    { range: '1-5 Workers', price: '3,500 AED', description: 'Perfect for small offices and retail spaces' },
    { range: '5-10 Workers', price: '3,000 AED', description: 'Ideal for medium-sized businesses' },
    { range: '10+ Workers', price: '2,500 AED', description: 'Best value for large enterprises' }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Professionally Trained Staff',
      description: 'All our cleaners are trained to meet international hygiene and safety standards.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Guaranteed Reliability',
      description: 'We promise a replacement within 3 working days if your assigned cleaner is absent or does not meet expectations.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Eye,
      title: 'Attention to Detail',
      description: 'We focus on deep cleaning and consistent results, not just surface-level work.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Customer-Focused',
      description: 'Our staff are trained to be polite, discreet, and respectful in your environment.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'We tailor cleaning schedules to match your specific working hours.',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional Cleaning
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent"> Staff Solutions</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Reliable, Trained, and Fully Managed Cleaning Professionals for Your Business
            </p>
          </div>
        </div>
      </section>

      {/* Our Cleaning Service Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Cleaning Service</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              NEXUS provides top-tier, full-time professional cleaners to maintain your workspace to the highest standards. 
              We handle the hiring, training, and management, so you don't have to.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Our Cleaners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Cleaners?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures you receive the highest quality cleaning services with complete peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options & Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Options & Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options to suit businesses of all sizes across the UAE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.range}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-4">{tier.price}</div>
                  <div className="text-sm text-gray-600 mb-6">per cleaner</div>
                  <p className="text-gray-700">{tier.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-800 font-medium">
              <strong>Please note:</strong> We can provide male or female staff based on your preference.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Us for a Custom Quote</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Ready to elevate your workspace's cleanliness? Reach out to our team for more information and to discuss your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Contact Person</div>
                    <div className="text-gray-600">D. L. Senanayake</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+123-456-7890</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">dhanushka@nexustalenthr.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600">Hamdan Street, Abu Dhabi</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Partner with Nexus HR?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-blue-100">15+ years of experience in UAE recruitment and staffing</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-blue-100">Comprehensive background checks and training programs</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-blue-100">24/7 support and replacement guarantee</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-blue-100">Flexible contracts tailored to your business needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Download our comprehensive proposal to learn more about our cleaning services and pricing options.
          </p>
          
          <a
            href="/proposal.pdf"
            download="Nexus_HR_Cleaning_Services_Proposal.pdf"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Download className="mr-3 h-6 w-6" />
            Download Full Proposal PDF
          </a>
          
          <p className="text-green-200 text-sm mt-4">
            Complete service details, terms, and conditions included
          </p>
        </div>
      </section>
    </div>
  );
};

export default CleaningServices;