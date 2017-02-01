# Contact List

A starter repo for the ACA full stack contact list project.

Extensions

a.
Add another list of contacts underneath the existing list for "Selected Contacts". Then implement the following functionality while trying to reuse as much code as possible:
Initially, the "Selected Contacts" should show the message "No contacts selected"
When you click on a contact in the searchable contact list, it should be removed from the original list and should appear in the new "Selected Contacts" list.
When you click on a contact in the "Selected Contacts" list, it should be removed from that list and should reappear in the searchable contact list.
Add a "Reset" button to the bottom of the page that resets the whole application to its initial state. (Page reload does not count :smile:)
Add search highlighting to your searchable contact list. For example: When you have the string "coo" typed in your input field, the part "Coo" in "Daly Cooper" should have a different color.


b.
Add a new container with a headline "Action history" underneath or right next to your two lists.
The initial message should show something like this: "You have not performed any actions yet."
The following messages should appear in the action history and should be added to the top of the list (Examples):
You have selected "Dale Cooper, FBI Agent"
You removed "Dale Cooper, FBI Agent" from your selection
All contacts were removed
The application was reset to its initial state
Add a button to the bottom of the list, that clears the action history.
The maximum number of action items should be limited to 10 entries. Only the most recent entries should be displayed.
Implement an expiration time for the action history that automatically removes all entires that are older than 1 minute.
Add a button (X) to each action item that lets the user remove an item from the action history.