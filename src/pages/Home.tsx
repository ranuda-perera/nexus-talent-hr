import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Building2, Star, TrendingUp, Globe, Award } from 'lucide-react';

const Home: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Active Employees', value: '2,500+' },
    { icon: Building2, label: 'Office Locations', value: '15' },
    { icon: Star, label: 'Employee Rating', value: '4.8/5' }
  ];

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Now Hiring in UAE
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Build Your
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent"> Career</span>
                  <br />
                  in the UAE
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Connect with leading companies across the UAE through Talent Nexus HR and find your perfect career opportunity with our trusted client partners.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link
                      to="/jobs"
                      className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-amber-400 hover:to-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-xl"
                  >
                    Explore Opportunities
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                      to="/about"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
                  >
                    Learn About Us
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                          <stat.icon className="h-6 w-6 text-amber-300" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-blue-200 text-sm">{stat.label}</div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                  <div className="space-y-4">
                    {[
                      'Access to exclusive job opportunities with top UAE companies',
                      'Professional career guidance and placement support',
                      'Competitive packages negotiated on your behalf',
                      'Ongoing career development and growth opportunities',
                      'Positions across Abu Dhabi, Dubai, and the wider UAE'
                    ].map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <p className="text-blue-100">{feature}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <Star className="h-4 w-4 mr-2" />
                Featured Positions
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Journey Today</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover exciting career opportunities with our esteemed client companies across the UAE and find the perfect role that matches your skills and aspirations.
              </p>
            </div>

            <div className="text-center">
              <Link
                  to="/jobs"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                View All Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in connecting exceptional talent with outstanding companies, creating opportunities where careers flourish.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'We maintain the highest standards in recruitment, ensuring perfect matches between candidates and companies.'
                },
                {
                  icon: Users,
                  title: 'Collaboration',
                  description: 'We work closely with both candidates and client companies to build lasting professional relationships.'
                },
                {
                  icon: Globe,
                  title: 'Innovation',
                  description: 'We use innovative recruitment strategies and technology to connect the right people with the right opportunities.'
                }
              ].map((value, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the next step in your career and connect with the UAE's leading companies through Nexus HR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Browse All Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Home;