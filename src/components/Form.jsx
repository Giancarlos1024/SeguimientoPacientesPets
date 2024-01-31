import { useState, useEffect } from 'react';
import Error from './Error';


const Form = ({ patients, setPatients, patient, setPatient }) => {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');
    const [animalType, setAnimalType] = useState(''); 
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(patient).length > 0) {
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setEntryDate(patient.date);
            setExitDate(patient.exitDate);
            setAnimalType(patient.animalType);  // Agregar al estado si existe
            setSymptoms(patient.symptoms);
        }
    }, [patient]);

    const generateId = () => {
        const random = Math.random().toString(36).slice(4);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([name, owner, email, entryDate, animalType, symptoms].includes('')) {
            setError(true);
            return;
        }
        setError(false);

        const objectPatient = {
            name,
            owner,
            email,
            date: entryDate,
            exitDate,
            animalType,  // Agregar al objeto del paciente
            symptoms,
        }

        if (patient.id) {
            objectPatient.id = patient.id;
            const updatedPatient = patients.map(patientState => patientState.id === patient.id ? objectPatient : patientState);
            setPatients(updatedPatient);
            setPatient({});
        }
        if (!patient.id) {
            objectPatient.id = generateId();
            setPatients([...patients, objectPatient]);
        }

        // Reiniciar el form
        setName('');
        setOwner('');
        setEmail('');
        setEntryDate('');
        setExitDate('');
        setAnimalType('');
        setSymptoms('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 font-serif " >
            <h2 className="font-serif text-blue-500 text-3xl text-center">
                Pacientes Pets
            </h2>
            <p className="mt-5 text-center text-lg mb-5">
                Agregar pacientes {' '}
                <span className="font-bold text-black">
                    Pets
                </span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-50 border-2 shadow-md rounded-lg py-10 px-5 mb-10"
            >
                {error && <Error><p>todos los campos son obligatorios</p></Error>}
                <div className="mb-5 ">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="pet"
                    >Nombre Mascota</label>
                    <input
                        id="pet"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="animalType"
                    >Tipo de Animal</label>
                    <input
                        id="animalType"
                        type="text"
                        placeholder="Ej. Perro, Gato, etc."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={animalType}
                        onChange={(e) => setAnimalType(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="owner"
                    >Nombre Propietario</label>
                    <input
                        id="owner"
                        type="text"
                        placeholder="Nombre de la propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={owner}
                        onChange={ (e) => setOwner(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="email"
                    >Correo Electronico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="alta"
                    >Fecha de Ingreso</label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="alta"
                    >Fecha de Salida</label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={exitDate}
                        onChange={(e) => setExitDate(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="symptoms"
                    >Sintomas</label>
                    <textarea
                        id="symptoms"
                        className="border-w w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los sintomas"
                        value={symptoms}
                        onChange={ (e) => setSymptoms(e.target.value) }
                    />
                </div>
                <input
                    type="submit"
                    className="transition-all w-full bg-indigo-600 font-bold p-3 cursor-pointer uppercase text-white hover:bg-black"
                    value={ patient.id ? 'Editar paciente' : 'Agregar Paciente' }
                />

            </form>
        </div>
    )
}

export default Form;
