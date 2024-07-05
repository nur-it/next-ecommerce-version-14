import Skeleton from "react-loading-skeleton";

const Loading = async () => {
  return (
    <section>
      <div className="container mx-auto py-5 max-w-screen-2xl px-3 space-y-4 sm:px-10">
        <div className="flex w-full gap-7">
          <div className={`w-full`}>
            <Skeleton count={1} height={300} />
          </div>

          <div className="w-full">
            <Skeleton count={1} height={300} />
          </div>
        </div>

        <div>
          <Skeleton count={1} height={100} />
        </div>

        <div>
          <div className="my-10 flex justify-center">
            <div className="text-center w-full lg:w-2/5">
              <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                <Skeleton count={1} height={30} />
              </h2>

              <p className="text-base font-sans text-gray-600 leading-6">
                <Skeleton count={1} height={20} />
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <div key={index}>
                <Skeleton count={1} height={75} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="my-10 flex justify-center">
            <div className="text-center w-full lg:w-2/5">
              <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                <Skeleton count={1} height={35} />
              </h2>

              <p className="text-base font-sans text-gray-600 leading-6">
                <Skeleton count={1} height={20} />
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <div key={index} className="shadow-sm border border-gray-200">
                <Skeleton count={1} height={150} />

                <div className="flex justify-between mx-3">
                  <div className="w-full">
                    <Skeleton count={2} height={15} />
                  </div>

                  <div className="w-full flex justify-end items-center">
                    <Skeleton count={1} height={25} width={25} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <div key={index} className="shadow-sm border border-gray-200">
                <Skeleton count={1} height={150} />

                <div className="flex justify-between mx-3">
                  <div className="w-full">
                    <Skeleton count={2} height={15} />
                  </div>

                  <div className="w-full flex justify-end items-center">
                    <Skeleton count={1} height={25} width={25} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
