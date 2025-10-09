import React from 'react';
import { Phone, Mail, Clock, Globe } from 'lucide-react';



const ContactPage: React.FC = () => {
    const whatsappNumber = '+971 581 062 091';

    const handleWhatsAppClick = () => {
        const cleanNumber = whatsappNumber.replace(/[^\d]/g, ''); // remove + and symbols
        window.open(`https://wa.me/${cleanNumber}`, '_blank');
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl text-blue-100">
                        We're here to help you find the perfect talent solution for your business
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>

                            <div>

                                {/* WhatsApp - Now at the top */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 0C10.745 0 0 10.745 0 24c0 4.243 1.1 8.225 3.025 11.681L0 48l12.569-3.025A23.868 23.868 0 0024 48c13.255 0 24-10.745 24-24S37.255 0 24 0z" fill="#25D366"/>
                                            <path d="M35.544 12.456A14.904 14.904 0 0024 7.5c-8.284 0-15 6.716-15 15 0 2.644.682 5.127 1.875 7.294L9 37.5l7.931-1.806A14.904 14.904 0 0024 37.5c8.284 0 15-6.716 15-15 0-4.013-1.563-7.781-4.456-10.544zM24 34.5c-2.381 0-4.644-.619-6.581-1.688l-.469-.281-4.856 1.106 1.144-4.631-.319-.506A11.918 11.918 0 0112 22.5c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12z" fill="#fff"/>
                                            <path d="M29.888 25.631c-.319-.163-1.894-.938-2.188-1.044-.294-.106-.506-.163-.719.163-.213.325-.825 1.044-1.013 1.256-.187.213-.375.238-.694.075-.319-.163-1.344-.494-2.556-1.575-.944-.844-1.581-1.888-1.769-2.213-.187-.325-.019-.5.144-.662.144-.15.319-.394.481-.594.163-.2.213-.337.319-.556.106-.219.05-.413-.025-.575-.075-.163-.719-1.731-.988-2.369-.262-.619-.525-.537-.719-.544-.187-.006-.4-.006-.612-.006s-.563.075-.856.375c-.294.3-1.125 1.1-1.125 2.681s1.15 3.106 1.313 3.325c.162.219 2.256 3.444 5.462 4.831.763.331 1.356.531 1.819.681.762.244 1.456.209 2.006.125.612-.094 1.894-.775 2.162-1.525.269-.75.269-1.394.188-1.525-.082-.131-.294-.213-.613-.375z" fill="#fff"/>
                                        </svg>
                                        WhatsApp
                                    </h3>
                                    <button
                                        onClick={handleWhatsAppClick}
                                        className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2"
                                    >
                                        WhatsApp Chat  {whatsappNumber}
                                    </button>

                                </div>

                                {/* Phone */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                                    <a href="tel:+971 2 366 807" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        +971 2 366 807
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                                <a href="mailto:jobs@nexustalent.com" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    jobs@nexustalenthr.com
                                </a>
                            </div>

                            {/* Website */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Website</h3>
                                <a href="https://www.nexustalenthr.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    www.nexustalenthr.com
                                </a>
                            </div>

                            {/* Office Hours */}
                            <div className="mb-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Office Hours
                                </h3>
                                <div className="ml-7 space-y-2 text-gray-600">
                                    <p>Monday - Friday: <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span></p>
                                    <p>Saturday: <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span></p>
                                    <p>Sunday: <span className="font-medium text-red-600">Closed</span></p>
                                </div>
                            </div>



                            {/* WhatsApp CTA */}

                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="lg:sticky lg:top-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/contact-image.jpg"
                                alt="Contact us"
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop';
                                }}
                            />
                        </div>

                        {/* Location Info */}


                        <div className="mt-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3630.9555862766456!2d54.356807675359036!3d24.48699567817498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI5JzEzLjIiTiA1NMKwMjEnMzMuOCJF!5e0!3m2!1sen!2slk!4v1759903143561!5m2!1sen!2slk"
                                width="100%"
                                height="250"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>


                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">© 2024 Nexus Talent HR. All rights reserved.</p>
                </div>
            </footer>

        </div>

    );
};

export default ContactPage;