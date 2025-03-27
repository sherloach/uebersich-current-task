import { css } from "uebersicht";

export const refreshFrequency = 5000;

const containerClassName = css({
  position: 'fixed',
  left: '10px',
  bottom: '10px',
  background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.85) 0%, rgba(10, 10, 10, 0.95) 100%)',
  borderRadius: '8px',
  padding: '12px 16px',
  maxWidth: '400px',
  maxHeight: '70px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
  zIndex: 1,
  backdropFilter: 'blur(10px)',
  color: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
});

const headerClassName = css({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '2px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  letterSpacing: '0.3px',
});

const taskRowClassName = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '5px',
  marginTop: '6px',
  marginLeft: "3px",
  overflow: 'hidden',
});

const taskNameClassName = css({
  fontSize: '14px',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textTransform: 'capitalize',
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  opacity: 0.9,
});

const tagClassName = css({
  fontSize: '10px',
  fontWeight: '600',
  padding: '2px 8px',
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(4px)',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  letterSpacing: '0.2px',
});

export const command = "osascript current-task/lib/next-task.applescript";

export const initialState = {
  task: "",
};

export const updateState = ({ output, error }, previousState) => {
  if (error) {
    const err_output = { ...previousState, error: error };
    console.error(err_output);
    return err_output;
  }

  console.log('Raw output:', output);

  // Initialize variables
  let project = "";
  let taskName = "";
  let tags = [];

  if (output) {
    // For example: "Daily habbits-test- In Progress Focused Home"

    // First, let's split by the first dash to get the project name
    const firstDashIndex = output.indexOf('-');
    if (firstDashIndex !== -1) {
      project = output.substring(0, firstDashIndex).trim();

      // Now let's extract the known tags
      const knownTags = ["Focused", "Home"];
      const remainingText = output.substring(firstDashIndex + 1);

      // Create a temporary string to work with
      let tempText = remainingText;
      let extractedTags = [];

      // Extract each known tag
      knownTags.forEach(tag => {
        if (tempText.includes(tag)) {
          extractedTags.push(tag);
          // Remove the tag from the text
          tempText = tempText.replace(new RegExp(tag, 'g'), '');
        }
      });

      // Also remove "In Progress" explicitly
      tempText = tempText.replace(/In Progress/g, '');

      // Clean up the task name (remove extra dashes and spaces)
      taskName = tempText.replace(/-/g, '').replace(/\s+/g, ' ').trim();

      // Set the tags without duplicates
      tags = [...new Set(extractedTags)];
    } else {
      // If there's no dash, the whole string is the task name
      taskName = output;
    }
  }

  console.log('Parsed data:', { project, taskName, tags });

  return {
    ...previousState,
    project: project,
    taskName: taskName,
    tags: tags
  };
};

export const render = (state) => {
  if (!state?.project && !state?.taskName) return null;

  return (
    <div className={containerClassName}>
      <div className={headerClassName}>
        <svg width="18" height="18" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.0001 21V13M14.0001 21L5.72231 16.5655C5.20798 16.2899 4.95081 16.1522 4.80878 15.915C4.66675 15.6777 4.66675 15.386 4.66675 14.8025V8M14.0001 21L18.6667 18.5L22.2779 16.5655C22.7922 16.2899 23.0494 16.1522 23.1914 15.915C23.3334 15.6777 23.3334 15.386 23.3334 14.8025V8M14.0001 13L4.66675 8M14.0001 13L23.3334 8M4.66675 8L13.0556 3.50595C13.5179 3.25829 13.7491 3.13446 14.0001 3.13446C14.2511 3.13446 14.4822 3.25829 14.9445 3.50595L23.3334 8" stroke="white" stroke-width="2" stroke-linejoin="round" />
          <path d="M17.6666 14.5C17.6666 15.0523 18.1143 15.5 18.6666 15.5C19.2189 15.5 19.6666 15.0523 19.6666 14.5H17.6666ZM18.5246 10.585L19.3825 10.0713L18.5246 10.585ZM8.86103 6.38148L17.1388 10.816L18.0833 9.05304L9.80547 4.61852L8.86103 6.38148ZM19.6666 14.5V11.6975H17.6666V14.5H19.6666ZM17.1388 10.816C17.4136 10.9632 17.5541 11.0398 17.6489 11.1036C17.7249 11.1548 17.6974 11.1502 17.6666 11.0987L19.3825 10.0713C19.2097 9.78262 18.9826 9.59056 18.7659 9.44467C18.568 9.31141 18.3228 9.18135 18.0833 9.05304L17.1388 10.816ZM19.6666 11.6975C19.6666 11.4258 19.6678 11.1481 19.6438 10.9108C19.6175 10.6509 19.5554 10.3601 19.3825 10.0713L17.6666 11.0987C17.6357 11.0472 17.6447 11.0209 17.6539 11.112C17.6654 11.2257 17.6666 11.3857 17.6666 11.6975H19.6666Z" fill="white" />
        </svg>

        {state.project}
      </div>

      <div className={taskRowClassName}>
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="4.5" height="4.5" rx="2" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 6.75 6.75)" stroke="white" stroke-width="2" />
          <path d="M13.5 15.75L15.75 12.75L13.5 9.75" stroke="white" stroke-width="2" />
          <path d="M15.75 12.75H10.5C8.63623 12.75 7.70435 12.75 6.96927 12.4455C5.98915 12.0395 5.21046 11.2608 4.80448 10.2807C4.5 9.54565 4.5 8.61377 4.5 6.75V6.75" stroke="white" stroke-width="2" />
        </svg>


        <span className={taskNameClassName}>{state.taskName}</span>

        {state.tags && state.tags.length > 0 && (
          state.tags.map((tag, index) => (
            <div key={index} className={tagClassName}>
              {tag}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
