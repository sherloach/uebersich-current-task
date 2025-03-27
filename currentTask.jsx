import { css } from "uebersicht";

export const refreshFrequency = 5000;

const containerClassName = css({
  color: "rgba(255, 255, 255)",
  fontFamily: "SauceCodePro Nerd Font",
  fontSize: "18px",
  // textTransform: "capitalize",
  textAlign: "center",
  width: "100vw",
  height: "100vh",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  top: "-25px",
});

const taskClassName = css({
  color: "(255, 255, 255)",
  backgroundImage:
    "linear-gradient(to right, rgba(149, 127, 184, 0.4), rgba(106, 149, 137, 0.4))",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fontWeight: "400",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

// export const command = "osascript current-task/lib/readfile.applescript";
export const command = "osascript current-task/lib/next-task.applescript";

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

  console.log('Here', output);
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth={1.5} stroke-linecap="round" />
          <path d="M16 8L8 11" stroke="#fff" stroke-linecap="round" />
          <path d="M8 8L16 11" stroke="#fff" stroke-linecap="round" />
          <path d="M8 14.5556C8 14.504 8 14.4782 8.0019 14.4564C8.02305 14.2147 8.2147 14.0231 8.45642 14.0019C8.47817 14 8.50396 14 8.55556 14H15.4444C15.496 14 15.5218 14 15.5436 14.0019C15.7853 14.0231 15.9769 14.2147 15.9981 14.4564C16 14.4782 16 14.504 16 14.5556V15C16 17.2091 14.2091 19 12 19C9.79086 19 8 17.2091 8 15V14.5556Z" fill="#fff" />
        </svg>

        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
        {/*   <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" /> */}
        {/*   <path d="M16 8L8 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" /> */}
        {/*   <path d="M8 8L16 11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" /> */}
        {/*   <path d="M8 14.5556C8 14.504 8 14.4782 8.0019 14.4564C8.02305 14.2147 8.2147 14.0231 8.45642 14.0019C8.47817 14 8.50396 14 8.55556 14H15.4444C15.496 14 15.5218 14 15.5436 14.0019C15.7853 14.0231 15.9769 14.2147 15.9981 14.4564C16 14.4782 16 14.504 16 14.5556V15C16 17.2091 14.2091 19 12 19C9.79086 19 8 17.2091 8 15V14.5556Z" fill="#ffffff" /> */}
        {/* </svg> */}
        {state?.task}
      </div>
    </div>
  );
};
