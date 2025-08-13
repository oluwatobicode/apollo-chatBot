function About() {
  return (
    <div className="m-5">
      <div className="">
        <div className="flex flex-col items-center justify-center">
          <h2 className="md:text-[48px] text-[20px] md:w-[709px] mb-5 font-fontTwo font-bold text-center md:leading-[56.25px] leading-normal">
            Smart Conversations. Instant Help.
          </h2>
          <div className="bg-textColor rounded-3xl  flex items-center justify-center mb-10">
            <img
              src="https://res.cloudinary.com/ddbld6szb/image/upload/DesktopHome_urvqli.png"
              className="p-10  lg:w-[865.69px] lg:h-[615.6px]"
              alt="desktop"
            />
          </div>

          <div className="flex flex-col items-center justify-center mb-10 w-full">
            <h2 className="md:text-[48px]  text-[20px]  md:w-[709px] mb-5 font-fontTwo font-bold text-center md:leading-[56.25px] leading-normal">
              Saved Conversations. Never Lose a Thought.
            </h2>
            <div className="bg-textColor rounded-3xl  h-fit flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/ddbld6szb/image/upload/DesktopChat_eetnyi.png"
                className="p-10 lg:w-[865.69px] lg:h-[615.6px]"
                alt="desktop"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
