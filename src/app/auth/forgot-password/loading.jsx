import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section className="py-10 lg:py-20 px-5">
      <div className="container max-w-screen-sm mx-auto px-3 sm:px-10 md:py-10 py-5 border border-gray-300 rounded-md shadow shadow-gray-300">
        <div className="text-center mb-6">
          <div>
            <Skeleton count={1} height={40} />
          </div>

          <div>
            <Skeleton count={1} height={40} />
          </div>
        </div>

        <div className="py-5">
          <div className="py-2">
            <Skeleton count={1} height={40} />
          </div>

          <div className="py-2">
            <Skeleton count={1} height={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;
