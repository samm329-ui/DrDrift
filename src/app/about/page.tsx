import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Dr. Drift',
  description: 'Learn about Dr. Drift\'s mission to bring industrial-grade cleanliness with everyday simplicity, honesty, and efficiency.',
};

const AboutPage = () => {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-8">About Dr. Drift</h1>

                    <p className="text-lg text-muted-foreground">
                        Dr. Drift is a next-generation home and hospitality cleaning solutions brand built with one clear mission: to bring industrial-grade cleanliness with everyday simplicity, honesty, and efficiency.
                    </p>
                    <p>
                        Born out of a deep understanding of how cleaning products are actually used—not how they’re marketed—Dr. Drift focuses on performance-first formulations that deliver visible results without unnecessary gimmicks. Every product is designed to solve real cleaning problems faced by households, hotels, and commercial spaces, especially in high-usage Indian environments.
                    </p>

                    <h2 className="font-headline">What We Do</h2>
                    <p>
                        Dr. Drift develops and supplies high-performance cleaning solutions across key categories, including:
                    </p>
                    <ul>
                        <li>Floor Cleaners</li>
                        <li>Toilet Cleaners</li>
                        <li>Dishwashing Solutions</li>
                    </ul>
                    <p>
                        Our products are engineered to balance cleaning power, material safety, and cost efficiency, making them ideal for both professional use (hotels, commercial buyers, white-label partners) and everyday consumers.
                    </p>

                    <h2 className="font-headline">Our Approach</h2>
                    <p>
                        Unlike conventional FMCG brands that prioritize branding over substance, Dr. Drift follows a ground-up, product-led approach:
                    </p>
                    <ul>
                        <li>Function before fragrance</li>
                        <li>Effectiveness before exaggeration</li>
                        <li>Consistency before scale</li>
                    </ul>
                    <p>
                        We focus on understanding surfaces, stains, water chemistry, and usage conditions to ensure that every product performs reliably across different environments.
                    </p>

                    <h2 className="font-headline">Why “Dr. Drift”?</h2>
                    <p>The name Dr. Drift reflects our philosophy:</p>
                    <ul>
                        <li><strong>“Dr.”</strong> stands for precision, care, and problem-solving</li>
                        <li><strong>“Drift”</strong> represents flow, movement, and adaptability</li>
                    </ul>
                    <p>
                        Together, they symbolize smart cleaning that adapts to real-world needs, not lab-only promises.
                    </p>

                    <h2 className="font-headline">Built for Scale, Designed for Trust</h2>
                    <p>Dr. Drift is currently structured to serve:</p>
                    <ul>
                        <li>3–4 star hotels</li>
                        <li>Institutional buyers</li>
                        <li>White-label partners</li>
                        <li>Emerging retail channels</li>
                    </ul>
                    <p>
                        As the brand grows, our long-term vision includes expanded retail presence, digital-first distribution, and continuous product innovation, while maintaining strict quality control and transparent practices.
                    </p>

                    <h2 className="font-headline">Our Vision</h2>
                    <p>To become a trusted Indian cleaning solutions brand known for:</p>
                    <ul>
                        <li>Honest formulations</li>
                        <li>Reliable performance</li>
                        <li>Scalable supply</li>
                        <li>Modern, no-nonsense branding</li>
                    </ul>
                    <p>
                        We aim to redefine how cleaning products are perceived—not as commodities, but as tools of efficiency, hygiene, and everyday progress.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
