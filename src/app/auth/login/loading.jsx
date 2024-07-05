import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center">
                  <div>
                    <Skeleton count={1} height={40} />
                  </div>

                  <div>
                    <Skeleton count={1} height={40} />
                  </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default loading;
