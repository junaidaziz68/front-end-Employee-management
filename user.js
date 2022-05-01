function User(firstName, lastName, email, id = null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
}

const userHeaders = ['id', 'firstName', 'lastName', 'email'];

// containerElement is the element we want to render the table into
// users is an array of objects representing user data
function renderUserTable(users, containerElement) {
    const tableManager = new TableManager();
    const table = tableManager.createTable(userHeaders, users);
    containerElement.replaceChildren(table);
}