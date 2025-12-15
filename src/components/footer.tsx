import Link from "next/link";
import { siteConfig } from "@/lib/config";
import TwitterIcon from "@/components/icons/twitter";
import InstagramIcon from "@/components/icons/instagram";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="font-headline text-2xl font-bold text-white">{siteConfig.brandName}</h3>
                        <p className="mt-2 text-sm">The future of clean is here.</p>
                        <div className="mt-4 flex space-x-4">
                            <Link href={siteConfig.socials.twitter} target="_blank" aria-label="Twitter">
                                <TwitterIcon className="h-6 w-6 transition-colors hover:text-white" />
                            </Link>
                            <Link href={siteConfig.socials.instagram} target="_blank" aria-label="Instagram">
                                <InstagramIcon className="h-6 w-6 transition-colors hover:text-white" />
                            </Link>
                        </div>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Products</h4>
                            <ul className="mt-4 space-y-2 text-sm">
                                {siteConfig.navLinks.slice(0, 3).map(link => (
                                     <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Company</h4>
                            <ul className="mt-4 space-y-2 text-sm">
                                {siteConfig.footerLinks.slice(0, 2).map(link => (
                                     <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-white tracking-wider uppercase text-sm">Legal</h4>
                            <ul className="mt-4 space-y-2 text-sm">
                                 {siteConfig.footerLinks.slice(2, 4).map(link => (
                                     <li key={link.name}><Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {siteConfig.brandName}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
