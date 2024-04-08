import { css } from "uebersicht";

export const refreshFrequency = 5000;

const containerClassName = css({
  color: "rgba(255, 255, 255)",
  fontFamily: "SauceCodePro Nerd Font",
  fontSize: "18px",
  textTransform: "capitalize",
  textAlign: "center",
  width: "100vw",
  height: "100vh",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  top: "-10px",
});

const taskClassName = css({
  color: "(255, 255, 255)",
  backgroundImage:
    "linear-gradient(to right, rgba(149, 127, 184, 0.95), rgba(106, 149, 137, 0.95))",
  padding: "14px",
  borderRadius: "10px",
  fontWeight: "500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

export const command = "osascript current-task/lib/readfile.applescript";

export const initialState = {
  task: "",
};

export const updateState = ({ output, error }, previousState) => {
  // Check for errors
  if (error) {
    const err_output = { ...previousState, error: error };
    console.error(err_output);
    return err_output;
  }

  // Split the input string into lines
  const lines = output.split('\n');

  // Find the row that starts with '- [>]'
  const currentTask = lines.find(line => line.trim().startsWith('- [>]'));
  const result = currentTask?.replace('- [>]', '').trim();

  return { ...previousState, task: result }
}

export const render = (state) => {
  if (!state?.task) return;

  return (
    <div className={containerClassName}>
      <div className={taskClassName}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 9C4 6.17157 4 4.75736 4.87868 3.87868C5.75736 3 7.17157 3 10 3H14C16.8284 3 18.2426 3 19.1213 3.87868C20 4.75736 20 6.17157 20 9V15.8276C20 18.5109 20 19.8525 19.1557 20.2629C18.3114 20.6733 17.2565 19.8444 15.1465 18.1866L14.4713 17.656C13.2849 16.7239 12.6917 16.2578 12 16.2578C11.3083 16.2578 10.7151 16.7239 9.52871 17.656L8.85346 18.1866C6.74355 19.8444 5.68859 20.6733 4.84429 20.2629C4 19.8525 4 18.5109 4 15.8276V9Z"
            fill="white"
            fillOpacity="0.55"
            stroke="white"
            strokeWidth="1.4"
          />
        </svg>
        {state?.task}
      </div>
    </div>
  );
};
