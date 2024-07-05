"use client";
import { useFormState } from "react-dom";

// internal imports
import Error from "@components/form/Error";
import Label from "@components/form/Label";
import SubmitButton from "@components/form/SubmitButton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { changePassword } from "@services/CustomerServices";

const ChangeUserPassword = ({ userInfo, storeCustomizationSetting }) => {
  const [state, formAction] = useFormState(changePassword, undefined);

  const { showingTranslateValue } = useUtilsFunction();

  return (
    <form action={formAction} className="flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-5">
        <div>
          <Label
            label={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.user_email
            )}
          />

          <div>
            <input
              readOnly
              name="email"
              type="email"
              placeholder={showingTranslateValue(
                storeCustomizationSetting?.dashboard?.user_email
              )}
              defaultValue={userInfo?.email}
              className="py-2 pl-4 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12 cursor-not-allowed"
            />
          </div>

          <Error errorName={state?.errors?.email} />
        </div>

        <div>
          <Label
            label={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.current_password
            )}
          />

          <div>
            <input
              name="currentPassword"
              type="password"
              placeholder={showingTranslateValue(
                storeCustomizationSetting?.dashboard?.current_password
              )}
              className="py-2 pl-4 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
            />
          </div>

          <Error errorName={state?.errors?.currentPassword} />
        </div>

        <div>
          <Label
            label={showingTranslateValue(
              storeCustomizationSetting?.dashboard?.new_password
            )}
          />

          <div>
            <input
              type="password"
              name="newPassword"
              placeholder={showingTranslateValue(
                storeCustomizationSetting?.dashboard?.new_password
              )}
              className="py-2 pl-4 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
            />
          </div>

          <ul>
            {state?.errors?.newPassword?.map((error) => (
              <li key={error}>
                <Error errorName={error} />
              </li>
            ))}
          </ul>
        </div>

        <SubmitButton
          text={showingTranslateValue(
            storeCustomizationSetting?.dashboard?.change_password
          )}
        />
      </div>
    </form>
  );
};

export default ChangeUserPassword;
