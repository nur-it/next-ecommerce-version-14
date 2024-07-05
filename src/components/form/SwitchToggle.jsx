import Switch from "react-switch";

const SwitchToggle = ({ enable, setEnabled, name }) => {
  // handle enable
  const handleEnabled = () => {
    setEnabled(!enable);
  };

  return (
    <>
      <div className={`${"mb-3 flex flex-wrap justify-end items-center mr-3"}`}>
        <div className="flex flex-wrap items-center">
          <Switch
            name={name}
            onChange={handleEnabled}
            checked={enable}
            className="react-switch"
            uncheckedIcon={
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 16,
                  color: "white",
                  paddingRight: 15,
                  paddingTop: 1,
                }}
              >
                No
              </span>
            }
            width={70}
            height={30}
            handleDiameter={23}
            offColor="#E53E3E"
            onColor="#2F855A"
            checkedIcon={
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 16,
                  color: "white",
                  paddingRight: 15,
                  paddingTop: 1,
                }}
              >
                Yes
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};

export default SwitchToggle;
