import styles from './App.module.css'
import {useState, useRef} from 'react'
import axios from 'axios'

function App() {

  const [isDisabled, setIsDisabled] = useState(true);
  const [isName, setIsName] = useState();
  const [isLastName, setIsLastName] = useState();
  const [isAddress, setIsAddress] = useState();
  const [isPhone, setIsPhone] = useState();
  const [isEmail, setIsEmail] = useState();
  const [isChecked, setIsChecked] = useState();

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

  const handleFirstName = (e) => {
    if (e.target.value.length < 1) {
      setIsName("Name need to have at least 1 character")
    }
    else {
      setIsName("")
    }
  }

  const handleLastName = (e) => {
    if (e.target.value.length < 1) {
      setIsLastName("Last name need to have at least 1 character")
    }
    else {
      setIsLastName("")
    }
  }

  const handlePhone = (e) => {
    if (e.target.value.match(e.target.pattern) === null && e.target.value !== "" ) {
      setIsPhone("Bad Format");
    }
    else if (e.target.value === "") {
      setIsPhone("Required")
    }
    else {
      setIsPhone("")
    }

  }

  const handleAddress = (e) => {
    if (e.target.value.length < 1) {
      setIsAddress("Address need to have at least 1 character")
    }
    else {
      setIsAddress("")
    }
  }

  const handleEmail = (e) => {
    if (!(e.target.value.includes("@")) && e.target.value !== "") {
      setIsEmail("Bad Format")
    }
    else if (e.target.value === "") {
      setIsEmail("Required")
    }
    else {
      setIsEmail("")
    }
  }

  const handleCheckBox = (e) => {
    if (!(e.target.checked)) {
      setIsChecked("Required")
    } 
    else {
      setIsChecked("")
    }
  }


  return (
    <div className={styles.container}>
      <form onSubmit={Submit} onChange={handleButton} id="form">
        <label>First Name:</label><br/>
        <input name="firstName" id="FirstName" type="text" ref={FirstName} onBlur={handleFirstName} required/><br />
        <p>{isName}</p>
        <br />
        <label>Last Name:</label><br/>
        <input name="lastName" id="LastName" type="text" onBlur={handleLastName} ref={LastName} required /><br />
        <p>{isLastName}</p>
        <br />
        <label>Address:</label><br/>
        <input name="address" id="Address" type="address" onBlur={handleAddress} ref={Address} required /><br />
        <p>{isAddress}</p>
        <br />
        <label>Phone:</label><br/>
        <input name="phone" id="Phone" type="tel" placeholder="+12323456789" pattern="[+][0-9]{12}" onBlur={handlePhone} ref={Phone} required /><br />
        <p>{isPhone}</p>
        <br />
        <label>Email:</label><br/>
        <input name="email" id="Email" type="email" onBlur={handleEmail} ref={Email} required /><br />
        <p>{isEmail}</p>
        <br />
        <label>Terms of Service:</label>
        <input name="checkbox" type="checkbox" onChange={handleCheckBox} required />
        <p>{isChecked}</p>
        <br />
        <button type="submit" disabled={isDisabled}>Save</button>
      </form>
    </div>
  );
}

export default App;
