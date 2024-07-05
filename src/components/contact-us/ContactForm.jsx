"use client";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
// internal imports
import Error from "@components/form/Error";
import InputArea from "@components/form/InputArea";
import Label from "@components/form/Label";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { notifySuccess } from "@utils/toast";

const ContactForm = ({ storeCustomizationSetting }) => {
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form submit
  const submitHandler = () => {
    notifySuccess(
      "your message sent successfully. We will contact you shortly."
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full mx-auto flex flex-col justify-center"
    >
      <div className="mb-12">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif mb-3">
          {showingTranslateValue(
            storeCustomizationSetting?.contact_us?.form_title
          )}
        </h3>

        <p className="text-base opacity-90 leading-7">
          {showingTranslateValue(
            storeCustomizationSetting?.contact_us?.form_description
          )}
        </p>
      </div>

      <div className="flex flex-col space-y-5">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
          <div className="w-full md:w-1/2 ">
            <InputArea
              register={register}
              label={t("common:contact-page-form-input-name")}
              name="name"
              type="text"
              placeholder={t("common:contact-page-form-plaholder-name")}
            />
            <Error errorName={errors.name} />
          </div>

          <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
            <InputArea
              register={register}
              label={t("common:contact-page-form-input-email")}
              name="email"
              type="email"
              placeholder={t("common:contact-page-form-plaholder-email")}
            />
            <Error errorName={errors.email} />
          </div>
        </div>

        <div className="relative">
          <InputArea
            register={register}
            label={t("common:contact-page-form-input-subject")}
            name="subject"
            type="text"
            placeholder={t("common:contact-page-form-plaholder-subject")}
          />
          <Error errorName={errors.subject} />
        </div>

        <div className="relative mb-4">
          <Label label={t("common:contact-page-form-input-message")} />

          <textarea
            {...register("message", {
              required: `Message is required!`,
            })}
            name="message"
            className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
            autoComplete="off"
            spellCheck="false"
            rows="4"
            placeholder={t("common:contact-page-form-plaholder-message")}
          ></textarea>
          <Error errorName={errors.message} />
        </div>

        <div className="relative">
          <button
            data-variant="flat"
            style={{
              backgroundColor: storeCustomizationSetting?.color?.bg_button?.hex,
            }}
            className={`bg-gray-800 text-white hover:text-white hover:bg-gray-900 font-serif md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto`}
          >
            {t("common:contact-page-form-send-btn")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
