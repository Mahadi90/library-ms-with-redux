import bannerimg from '../../assets/banner.jpg'


const Banner = () => {
    return (
        <div className='relative'>
            <img className='w-full mt-20 lg:h-[100vh] h-auto' src={bannerimg} alt="" />
            <div className='absolute top-1/3 left-2 md:left-4 lg:left-10 text-white space-y-2'>
                <h3 className='text-4xl lg:text-7xl font-bold'>Your Book</h3>
                <p className='text-md font-semibold text-slate-200'>Pick your favorit book and <br />be happy with us</p>
            </div>
        </div>
    );
};

export default Banner;