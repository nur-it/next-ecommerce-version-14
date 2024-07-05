import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section>
      <div className="container mx-auto py-5 max-w-screen-2xl px-3 space-y-4 sm:px-10">
        <div className="w-3/12">
          <Skeleton count={1} height={30} />
        </div>

        <div className="flex w-full gap-7">
          <div className="w-3/4 flex gap-4">
            <div className="w-full">
              <div>
                <Skeleton count={1} height={400} />
              </div>

              <div className="flex gap-3 pt-4">
                {[1, 2, 3, 4].map((index) => (
                  <Skeleton
                    key={index + 1}
                    count={1}
                    height={105}
                    width={120}
                  />
                ))}
              </div>
            </div>

            <div className="w-full pt-4">
              <Skeleton count={1} height={20} width={200} />
              <Skeleton count={1} height={15} width={60} />
              <Skeleton count={1} height={25} width={60} />

              <div className="flex gap-4 pt-4">
                <div className="w-full">
                  <Skeleton count={1} height={30} />
                </div>

                <div className="w-full">
                  <Skeleton count={1} height={30} />
                </div>
              </div>

              <div className="pt-4">
                <Skeleton count={1} height={20} width={150} />
              </div>

              <div className="pt-5">
                <Skeleton count={1} height={15} width={250} />
                <Skeleton count={1} height={15} width={250} />
                <Skeleton count={1} height={15} width={250} />
              </div>
            </div>
          </div>

          <div className="w-3/12">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div className="flex w-full gap-5 py-2.5" key={index + 1}>
                <div>
                  <Skeleton count={1} height={40} width={40} />
                </div>

                <div className="w-full">
                  <Skeleton count={1} height={20} />
                  <Skeleton count={1} height={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;
