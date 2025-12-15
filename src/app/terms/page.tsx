import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Dr. Drift',
  description: 'Read the Dr. Drift Terms of Service to understand the rules and guidelines for using our website.',
};

const TermsOfServicePage = () => {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
                    <p className="text-sm text-muted-foreground">Last updated: 14 December 2025</p>
                    
                    <p>
                        Welcome to the official website of Dr. Drift (“we”, “our”, “us”). By accessing or using our website www.drdrift.com, you agree to comply with and be bound by the following Terms of Service. If you do not agree with these terms, please do not use the website.
                    </p>

                    <h3 className="font-headline">1. Use of the Website</h3>
                    <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
                    <ul>
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on the rights of others</li>
                        <li>Disrupt or damage the website or its functionality</li>
                        <li>Attempt unauthorized access to any part of the website</li>
                    </ul>
                    <p>We reserve the right to restrict or terminate access if these terms are violated.</p>

                    <h3 className="font-headline">2. Website Content & Intellectual Property</h3>
                    <p>All content on this website, including but not limited to text, images, graphics, logos, product descriptions, videos, designs, and layout, is the intellectual property of Dr. Drift unless otherwise stated.</p>
                    <p>You may not copy, reproduce, distribute, or modify any content or use our branding, logos, or materials for commercial purposes without prior written permission.</p>

                    <h3 className="font-headline">3. Product Information & Availability</h3>
                    <p>Product descriptions, specifications, and pricing (if shown) are provided for informational purposes only and may be updated or changed without prior notice.</p>
                    <p>We make reasonable efforts to ensure accuracy but do not guarantee that all information is error-free, complete, or current at all times.</p>

                    <h3 className="font-headline">4. No Professional or Commercial Guarantees</h3>
                    <p>Our products are intended for general cleaning purposes only. Results may vary based on surface type, usage method, and environmental conditions.</p>
                    <p>Dr. Drift does not guarantee specific outcomes beyond standard product functionality and is not responsible for misuse or improper application of products.</p>

                    <h3 className="font-headline">5. Third-Party Links</h3>
                    <p>This website may contain links to third-party websites or services. These links are provided for convenience only.</p>
                    <p>We do not control or endorse third-party content and are not responsible for their privacy practices, terms, accuracy, or reliability.</p>

                    <h3 className="font-headline">6. Limitation of Liability</h3>
                    <p>To the fullest extent permitted by law, Dr. Drift shall not be liable for any indirect, incidental, or consequential damages, loss of data, profits, or business opportunities, or damages arising from the use or inability to use this website. Use of this website is at your own risk.</p>

                    <h3 className="font-headline">7. Disclaimer</h3>
                    <p>This website and its content are provided on an “as is” and “as available” basis, without warranties of any kind, either express or implied. We do not warrant that the website will always be available or error-free or that the content is complete or accurate at all times.</p>

                    <h3 className="font-headline">8. Indemnification</h3>
                    <p>You agree to indemnify and hold harmless Dr. Drift, its owners, partners, and affiliates from any claims, losses, or damages arising from your use of the website, violation of these Terms, or misuse of content or products.</p>

                    <h3 className="font-headline">9. Termination</h3>
                    <p>We reserve the right to suspend or terminate access to the website at any time, without notice, for conduct that violates these Terms or is harmful to our business or users.</p>

                    <h3 className="font-headline">10. Governing Law & Jurisdiction</h3>
                    <p>These Terms of Service shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in India.</p>

                    <h3 className="font-headline">11. Changes to These Terms</h3>
                    <p>We may update these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Continued use of the website constitutes acceptance of the updated terms.</p>

                    <h3 className="font-headline">12. Contact Information</h3>
                    <p>For questions regarding these Terms of Service, please contact:</p>
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

export default TermsOfServicePage;
