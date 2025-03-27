tell application "Things3"

  set theTodos to to dos of list "Today"

  set output to ""
  repeat with aTodo in theTodos
    set todoName to name of aTodo
    set areaName to ""
    set projectName to ""

    -- Check if the to-do is part of a project
    if project of aTodo is not missing value then
      set projectName to name of project of aTodo
    end if

    -- Check if the to-do is part of an area
    if area of aTodo is not missing value then
      set areaName to name of area of aTodo
    end if

    -- Construct the output for the current to-do
    if areaName is not "" and projectName is not "" then
      set output to output & todoName & " (" & areaName & " - " & projectName & ")" & linefeed
    else if projectName is not "" then
      set output to output & todoName & " (" & projectName & ")" & linefeed
    else if areaName is not "" then
      set output to output & todoName & " (" & areaName & ")" & linefeed
    else
      set output to output & todoName & linefeed
    end if
  end repeat

  return output

end tell
