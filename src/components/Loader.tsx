import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loader = () => {
  return (
    <SkeletonTheme duration={1} baseColor="#202020" highlightColor="#444">
      <div className="flex h-full w-full flex-wrap content-start justify-center  ">
        <Skeleton
          containerClassName="w-[95%] mt-2"
          className="mt-2 w-[90%]"
          height={100}
        />

        <div className="mt-5">
          <Skeleton
            // width={280}
            containerClassName="w-[95vw]"
            width={"95vw"}
            count={4}
            className="mt-8"
            height={120}
            enableAnimation={true}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Loader;
