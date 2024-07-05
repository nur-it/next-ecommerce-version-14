import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section>
      <div className="container mx-auto py-5 max-w-screen-2xl px-3 space-y-4 sm:px-10">
        <div className="flex w-full gap-7">
          <div className={`w-full`}>
            <Skeleton count={1} height={150} />
          </div>

          <div className="w-full">
            <Skeleton count={1} height={150} />
          </div>
        </div>

        <div className="flex w-full gap-7">
          <div className={`w-full`}>
            <Skeleton count={1} height={150} />
          </div>

          <div className="w-full">
            <Skeleton count={1} height={150} />
          </div>
        </div>

        <div className="flex w-full gap-7">
          <div className={`w-full`}>
            <Skeleton count={1} height={150} />
          </div>

          <div className="w-full">
            <Skeleton count={1} height={150} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;
