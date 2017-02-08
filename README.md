
### Live site available at: http://wholesale-change.surge.sh/
- Note: A local server must be running for the app to work, for ACA classmates, this means run your own project using npm start then this live version will load in your contacts.

- Notes for classmates: Checkout surge for easy front end deployments. Additionally when you build the contact list starter the build process has a bug, both css and js files in the index need relative pathing, so add a . to the front of the first slash and it should work

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
- When a contact is deleted, make it semi-transparent at first while the network request is being processed and only remove it when the contact is successfully deleted in the backend. If the network request fails, display an error message. You might want to check out the module classnames to implement the different UI states.
- Create delete button for contacts
- http error tracker
- Implement field component with own validations
- Improve spinner styling
