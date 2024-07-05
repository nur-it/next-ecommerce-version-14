import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section>
      <div className="container mx-auto py-5 max-w-screen-2xl px-3 space-y-4 sm:px-10">
        <div className="flex flex-wrap w-full gap-7">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Skeleton key={index + 1} count={1} height={105} width={120} />
          ))}
        </div>

        <div className="pt-10">
          <Skeleton count={1} height={40} />
        </div>

        <div className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-5 pt-3">
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
    </section>
  );
};

export default loading;
