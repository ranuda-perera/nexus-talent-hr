import React from 'react';
import { Users, Globe, Award, TrendingUp, Building2, Heart, Lightbulb, Target } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Candidates Placed', value: '2,500+', color: 'text-blue-600' },
    { icon: Building2, label: 'Client Companies', value: '150+', color: 'text-green-600' },
    { icon: Globe, label: 'Industries Served', value: '12', color: 'text-purple-600' },
    { icon: Award, label: 'Years of Excellence', value: '15+', color: 'text-amber-600' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We set the highest standards and strive to exceed expectations in every project we undertake.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster an environment of mutual respect and support.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace change and continuously seek creative solutions to complex challenges.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices at all times.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'We prioritize our clients\' success and deliver solutions that create lasting value.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We invest in our people\'s development and create opportunities for career advancement.',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We are the UAE's premier human resources consultancy, connecting exceptional talent with leading companies across the region and creating meaningful career opportunities for professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                To bridge the gap between exceptional talent and outstanding companies by providing comprehensive recruitment solutions, career guidance, and professional development opportunities that drive success for both candidates and clients across the UAE.
              </p>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                  Connect top talent with leading companies
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                  Provide comprehensive career guidance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                  Build lasting professional relationships
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-3xl p-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-purple-100 text-lg leading-relaxed mb-6">
                To be the most trusted human resources consultancy in the Middle East, recognized for our excellence in talent acquisition, commitment to career development, and positive impact on the professional landscape of the UAE.
              </p>
              <ul className="space-y-3 text-purple-100">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-300 rounded-full mr-3"></span>
                  Leading recruitment consultancy in the UAE
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-300 rounded-full mr-3"></span>
                  Trusted partner for career development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-300 rounded-full mr-3"></span>
                  Innovative recruitment solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide our decisions, shape our culture, and define who we are as an organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Join Our Story</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Connect with leading companies across the UAE through Nexus HR. We're here to help you find your perfect career opportunity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">UAE Head Office</h3>
              <p className="text-blue-100 text-sm">Hamdan Street, Abu Dhabi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Career Consultants</h3>
              <p className="text-blue-100 text-sm">jobs@nexustelenthr.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <p className="text-blue-100 text-sm">@NexusHRUAE</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;