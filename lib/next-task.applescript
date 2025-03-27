tell application "Things3"
    -- Get all to-dos in the Today list
    set todayTasks to to dos of list "Today"

    -- Find tasks with "In Progress" tag
    set inProgressTasks to {}
    repeat with aTask in todayTasks
        if tag names of aTask contains "In Progress" then
            set end of inProgressTasks to aTask
        end if
    end repeat

    -- Check if there are any matching tasks
    if length of inProgressTasks > 0 then
        -- Get the first task
        set aTask to item 1 of inProgressTasks
        set taskName to name of aTask
        set taskTags to tag names of aTask
        set tagList to ""

        -- Get project name (if any)
        set projectName to ""
        try
            set taskProject to project of aTask
            set projectName to name of taskProject
        on error
            -- Task might be in an area or not in any project
            try
                set taskArea to area of aTask
                set projectName to name of taskArea & " (Area)"
            on error
                set projectName to "No Project"
            end try
        end try

        set taskOutput to ""
        -- Get tags
        set todoTags to tags of aTask
        repeat with aTag in todoTags
          set tagList to tagList & " " & name of aTag
        end repeat

        if tagList is not "" then
          set taskOutput to taskOutput & "-" & tagList
        end if

        return projectName & "-" & taskName & taskOutput
    else
        return "No Project-No tasks"
    end if
end tell
