(function() {
    const formInputs = document.querySelectorAll(".container input");
    const id = document.querySelector("#id");
    const dataForm = document.querySelector("#data-form");
    const dataTable = document.querySelector("#data-table");

    function createEmployeeFromFormObj(dataObject) {
        const user = new User(
            dataObject.firstName,
            dataObject.lastName,
            dataObject.email,
        );
        return user;
    }

    function updateEmployees() {
        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus("PREPARING UPDATE REQUEST");

        fetch(`http://127.0.0.1:8080/users/${id.value}`, {
                method: "PUT", 
                body: JSON.stringify(createEmployeeFromFormObj(formDataObject)),
                headers: {
                    "Content-type": "application/json", 
                },
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((user) => {
                setStatus("RENDERING TABLE");
                renderEmployeeTable([user], dataTable);
                setStatus("RESPONSE RENDERED INTO TABLE");
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    function readById() {
        setStatus("PREPARING GET REQUEST");

        return fetch(`http://127.0.0.1:8080/users/${id.value}`, {
                method: "GET",
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((user) => {
                return user;
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    id.addEventListener("change", function(event) {
        readById(id.value).then((user) => {

            formInputs[1].value = user.firstName;
            formInputs[2].value = user.lastName;
            formInputs[3].value = user.email;
        });
    });

    function handleFormSubmission(event) {
        event.preventDefault();
        updateEmployees();
    }

    dataForm.addEventListener("submit", handleFormSubmission);
})();