import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '20px',
        }}>

            <div style={{ textAlign: 'center' }}>
                <h2>Quick Links</h2>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    <li><a href="/link1" style={{ color: '#fff', textDecoration: 'none' }}>
                        Alumni</a></li>
                    <li><a href="/link2" style={{ color: '#fff', textDecoration: 'none' }}>Partners</a></li>
                    <li><a href="/link2" style={{ color: '#fff', textDecoration: 'none' }}>Donors</a></li>
                </ul>
            </div>
            {/* Column 2: Our Story */}
            <div>
                <h2>Our Story</h2>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>Our Work & Impact
                    </a></li>
                    <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>Our Reports

                    </a></li>
                    <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>Get Involved
                    </a></li>
                </ul>
            </div>

            {/* Column 3: Support */}
            <div>
                <h2>Support</h2>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    <li><a href="/support" style={{ color: '#fff', textDecoration: 'none' }}>Terms and Conditions
                    </a></li>
                    <li><a href="/support" style={{ color: '#fff', textDecoration: 'none' }}>Data Privacy

                    </a></li>
                    <li><a href="/support" style={{ color: '#fff', textDecoration: 'none' }}>Contact
                    </a></li>
                </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
                <h2>Contact Us</h2>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    <p><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Have a query? Contact us on the details below, we <br />
                        would be happy to help!
                        <br />
                        <br />

                        1050 Printech Ave
                        Honeydew, Johannesburg
                        South Africa, 011 699 3000</a></p>
                </ul>
            </div>

            {/* Social Media Icons */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                <div>
                    <a href="https://www.facebook.com" style={{ color: '#fff', marginRight: '10px' }}><FaFacebook /></a>
                    <a href="https://www.instagram.com" style={{ color: '#fff', marginRight: '10px' }}><FaInstagram /></a>
                    <a href="https://www.linkedin.com" style={{ color: '#fff', marginRight: '10px' }}><FaLinkedin /></a>
                    <a href="https://www.twitter.com" style={{ color: '#fff', marginRight: '10px' }}><FaTwitter /></a>
                    <a href="https://www.youtube.com" style={{ color: '#fff' }}><FaYoutube /></a>
                </div>
            </div>

            {/* Logo */}
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <img src="/path-to-alu-logo.png" alt="ALU Logo" style={{ maxWidth: '100px' }} />
            </div>
        </footer>
    );
};

export default Footer;
