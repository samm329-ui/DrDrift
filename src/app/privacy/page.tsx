import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dr. Drift',
  description: 'Read the Dr. Drift Privacy Policy to understand how we collect, use, and protect your personal information.',
};

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-sm text-muted-foreground">Last updated: 14 December 2025</p>

                    <p>
                        Dr. Drift (“we”, “our”, “us”) respects your privacy and is committed to protecting the personal information you share with us through our website www.drdrift.com.
                    </p>
                    <p>
                        This Privacy Policy explains how we collect, use, store, and protect your information when you visit or interact with our website.
                    </p>

                    <h3 className="font-headline">1. Information We Collect</h3>
                    <p>We may collect the following types of information:</p>
                    
                    <h4>a) Personal Information (Voluntarily Provided)</h4>
                    <p>When you fill out a form, contact us, or inquire about our products or services, we may collect:</p>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Company name</li>
                        <li>City / location</li>
                        <li>Any message or details you submit</li>
                    </ul>

                    <h4>b) Non-Personal Information (Automatically Collected)</h4>
                    <p>When you browse our website, we may collect:</p>
                    <ul>
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device type</li>
                        <li>Pages visited</li>
                        <li>Time spent on the website</li>
                        <li>Referral source</li>
                    </ul>
                    <p>This data is collected through cookies or analytics tools to improve website performance and user experience.</p>

                    <h3 className="font-headline">2. How We Use Your Information</h3>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Respond to inquiries and contact requests</li>
                        <li>Provide product or business information</li>
                        <li>Improve our website and services</li>
                        <li>Analyze traffic and usage patterns</li>
                        <li>Maintain website security</li>
                        <li>Comply with legal or regulatory requirements</li>
                    </ul>
                    <p>We do not sell, rent, or trade your personal information to third parties.</p>

                    <h3 className="font-headline">3. Cookies & Tracking Technologies</h3>
                    <p>Our website may use cookies or similar technologies to:</p>
                    <ul>
                        <li>Improve functionality</li>
                        <li>Understand user behavior</li>
                        <li>Measure website performance</li>
                    </ul>
                    <p>You can choose to disable cookies through your browser settings. Doing so may affect some features of the website.</p>

                    <h3 className="font-headline">4. Data Sharing & Third Parties</h3>
                    <p>We may share limited data only with:</p>
                    <ul>
                        <li>Website hosting providers</li>
                        <li>Analytics tools (e.g., Google Analytics)</li>
                        <li>Service providers assisting in website operations</li>
                    </ul>
                    <p>All third parties are required to handle data securely and only for legitimate business purposes.</p>

                    <h3 className="font-headline">5. Data Security</h3>
                    <p>
                        We take reasonable technical and organizational measures to protect your information from unauthorized access, loss or misuse, and disclosure or alteration. However, no method of online transmission or storage is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h3 className="font-headline">6. Data Retention</h3>
                    <p>We retain personal information only for as long as necessary to fulfill the purpose for which it was collected and meet legal, accounting, or operational requirements.</p>

                    <h3 className="font-headline">7. Your Rights</h3>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Request access to your personal data</li>
                        <li>Request correction of inaccurate information</li>
                        <li>Request deletion of your data (subject to legal obligations)</li>
                    </ul>
                    <p>To exercise these rights, contact us using the details below.</p>

                    <h3 className="font-headline">8. Children’s Privacy</h3>
                    <p>Our website is not intended for individuals under the age of 18, and we do not knowingly collect personal data from minors.</p>

                    <h3 className="font-headline">9. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last updated” date.</p>

                    <h3 className="font-headline">10. Contact Us</h3>
                    <p>If you have any questions or concerns about this Privacy Policy or your data, you may contact us at:</p>
                    <p>
                        <strong>Dr. Drift</strong><br />
                        📧 Email: drdriftpvtltd@gmail.com<br />
                        📍 Location: 11/10 Newland Extension, Jadavpur, Jheel Road, 700075, Kolkata, India
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
