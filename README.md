
### Extensions

## Completed
- Let's assume that we don't want to show the form when the page is initially loaded:
- Initially the ContactForm should not be visible
- Instead display a button "Add Contact" instead that shows the ContactForm when it is clicked
- When the contact was successfully stored in the database, hide the form again and show the button
- The input for all fields is required. So far, we have only disabled the submit button. Now implement a message next to each input element that is only displayed when the input is not valid. Implement that logic in the component that you created in the previous step. Also change the style of the input element (A red border for example for the invalid state).
- How can you clear out the fields in the ContactForm when the form is submitted
- Can you figure out how to show some sort of indicator to the user that a network request is happening
- when a new contact is being saved, or when a contact is being deleted

## To do

- When a contact is deleted, make it semi-transparent at first while the network request is being processed and only remove it when the contact is successfully deleted in the backend. If the network request fails, display an error message. You might want to check out the module classnames to implement the different UI states.
- Move the input elements of the contact form with the labels into its own component.


- Implement field component with own validations
- Implement deselect button style for selected items
- Add bootstrap and style for basic appeal
- Check for URL in avatar link

### In Progress
- When a contact is deleted, make it semi-transparent at first while the network request is being processed and only remove it when the contact is successfully deleted in the backend. If the network request fails, display an error message. You might want to check out the module classnames to implement the different UI states.