// PrivacyPolicy.js
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold mb-4">JaguarPalace Crypto Website Document Locker - Privacy Policy</h1>

            {/* <p className="text-gray-700 mb-6">Last Updated: [Date]</p> */}

            <p className="mb-6">Welcome to JaguarPalace, your trusted platform for securing and managing your important
                documents through cutting-edge cryptographic technology. This Privacy Policy is designed to inform you
                about how we collect, use, disclose, and safeguard your personal information when you use our website
                and services.</p>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>

                <p className="mb-2">**1.1 Personal Information:**</p>
                <ul className="list-disc ml-6">
                    <li>**Account Information:** When you create a JaguarPalace account, we collect your name, email
                        address, and password.</li>
                    <li>**Document Information:** In the course of using our services, you may upload and store
                        documents on our platform. JaguarPalace employs encryption techniques to secure your
                        documents, ensuring confidentiality.</li>
                </ul>

                <p className="mb-2">**1.2 Usage Information:**</p>
                <ul className="list-disc ml-6">
                    <li>**Log Data:** We automatically collect certain information when you access JaguarPalace,
                        including your IP address, browser type, operating system, and the pages you view.</li>
                    <li>**Cookies:** JaguarPalace uses cookies to enhance your experience, personalize content, and
                        analyze usage patterns. You can manage cookie preferences through your browser settings.</li>
                </ul>
            </div>

            {/* Additional sections omitted for brevity */}

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
                <p>If you have any questions, concerns, or feedback regarding this Privacy Policy, please contact us at
                    <a href="mailto:contact@jaguarpalace.com" className="text-blue-500">contact@jaguarpalace.com</a>.
                </p>
            </div>

            <p className="mt-4">Thank you for choosing JaguarPalace as your trusted document locker. Your privacy and
                security are our top priorities.</p>
        </div>
    );
};

export default PrivacyPolicy;
