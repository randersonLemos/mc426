import React, { useState } from 'react';
import axios from 'axios';


function SalveGalera () {

    const [greeting, setGretting] = useState();

    function listener () {
        // Make a request for a user with a given ID
        axios.get('http://localhost:80/salve-galera')
        .then(function (response) {
            // handle success
            console.log(response);
            setGretting(response.data['message'])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    return(
        <div>
            { greeting 
                ? (greeting)
                : (<button onClick={listener}>Salve Galera</button>)
            }
        </div>
    )
}

export default SalveGalera