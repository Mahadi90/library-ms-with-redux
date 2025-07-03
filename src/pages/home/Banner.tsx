import bannerimg from '../../assets/banner.jpg'

const Banner = () => {
    return (
        <div className=''>
            <img className='w-full lg:h-[80vh] h-auto' src={bannerimg} alt="" />
        </div>
    );
};

export default Banner;