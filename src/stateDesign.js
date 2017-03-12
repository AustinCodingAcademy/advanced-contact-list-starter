export const stateDesign = {
  contactList: {
    searchText: '',
    contacts: {
      contacts: [],
      isLoading: false,
      errorMessage: null
    },
    selectedContacts: {
      items: [],
      isLoading: false,
      errorMessage: null
    },
    actionHistory: {
      items: [],
      isLoading: false,
      errorMessage: null
    },
    contactForm: {
      name: '',
      occupation: '',
      avatar: ''
    }
  }
};
