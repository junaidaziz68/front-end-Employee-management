(function() {
    const dataForm = document.querySelector('#data-form');
    const id = document.querySelector('#id');

    function findById() {
        setStatus('Finding Employee to delete...')
        fetch(`http://127.0.0.1:8080/users/${id.value}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Uh oh, something went wrong...');
        })
          .then(user => {
            confirm = window.confirm("Are you sure you want to delete " + user.firstName + "?")
            if (confirm) {
                remove();
            }
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    function remove() {
        fetch(`http://127.0.0.1:8080/users/${id.value}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) return response.json();
            else throw new Error('Uh oh, something went wrong...');
        }).then(json => {
            setStatus('Employee DELETED');
            console.log(json);
        }).catch(error => {
            setStatus('FAILED TO delete Employee');
            handleError(error);
        });
    }

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        findById();
    });

})();