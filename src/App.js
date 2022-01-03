import styles from './App.module.css'
import {useState, useRef} from 'react'
import axios from 'axios'

function App() {

  const [isDisabled, setIsDisabled] = useState(true);

  const FirstName = useRef();
  const LastName = useRef();
  const Address = useRef();
  const Phone = useRef();
  const Email = useRef();


  const handleButton = () => {
    var form = document.getElementById('form');
    var isValidForm = form.checkValidity();
    if (isValidForm === true) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
    }
  }

  const Submit = (e) => {
    e.preventDefault();

    const data = {
      "FirstName": FirstName.current.value,
      "LastName": LastName.current.value,
      "Address": Address.current.value,
      "Phone": Phone.current.value,
      "Email": Email.current.value
    }

    const config = {
      mode: 'cors',
      body: data
    }

    axios.post('http://localhost:3001/', data, config)
    .then(res => {
      if (res.data.status === 200) {
        document.getElementById("form").reset();
      }
    })
  }



  return (
    <div className={styles.container}>
      <form onSubmit={Submit} onChange={handleButton} id="form">
        <label>First Name:</label><br/>
        <input name="firstName" type="text" ref={FirstName} required />
        <br />
        <label>Last Name:</label><br/>
        <input name="lastName" type="text" ref={LastName} required />
        <br />
        <label>Address:</label><br/>
        <input name="address" type="address" ref={Address} required />
        <br />
        <label>Phone:</label><br/>
        <input name="phone" type="tel" placeholder="+12323456789" pattern="[+][0-9]{12}" ref={Phone} required />
        <br />
        <label>Email:</label><br/>
        <input name="email" type="email" ref={Email} required />
        <br />
        <label>Terms of Service:</label>
        <input name="checkbox" type="checkbox" required />
        <br />
        <button type="submit" disabled={isDisabled}>Save</button>
      </form>
    </div>
  );
}

export default App;
