

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-sm">
                    © {new Date().getFullYear()} Your Book. All rights reserved.
                </p>
                <p className="text-sm mt-2 md:mt-0">
                    Designed & developed by <a href="https://mahadi-hasan-portfolio90.netlify.app" className="text-blue-400 hover:underline">Mahadi Hasan</a>
                </p>
            </div>
        </footer>

    );
};

export default Footer;