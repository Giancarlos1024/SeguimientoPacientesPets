import { useState, useEffect } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import PatientList from "./components/PatientList"

function App() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const getLS = () => {
      const patientLS = JSON.parse(localStorage.getItem('patients')) ?? [];
      console.log(patientLS, 'asd')
      setPatients(patientLS)
    }

    getLS();
  }, []);


  useEffect( () => {
    localStorage.setItem('patients', JSON.stringify( patients ))
  }, [patients]);

  const deletePatient = (id) => {
    const updatedPatient = patients.filter( patient =>  patient.id !== id)
    setPatients(updatedPatient)
  }

  return (
    <div className="container mx-auto mt-20 ">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App;