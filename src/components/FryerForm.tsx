import './FryerForm.css'
import { useState } from 'react'

function FryerForm() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [email, setEmail] = useState<string>(""); // TODO: Tell user if email is invalid
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const [costGuess, setCostGuess] = useState<number>(0.00); // TODO: make this use a number and parse it as a number, correcting user if incorrectly formatted
    const [validCost, setValidCost] = useState<boolean>(true);
    const [pin, setPin] = useState<string>(""); // TODO: Automatically format the
    const [validPin, setValidPin] = useState<boolean>(true);

    const handleSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log(
            `SPIDR FORM SUBMISSION:\n
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Phone Number: ${phoneNum}\n
            Email: ${email}\n
            Cost Guess: ${costGuess}\n
            PIN: ${pin}`
        );
    }

    return (
        <div className="form-container">
            <form className="fryer-form"></form>
            <h2>First Name:</h2>
            <input type="text" className="form-field" placeholder="First Name" aria-label="First Name" name="firstName"
                    value={firstName} onChange={e => setFirstName(e.target.value)} required/>


            <h2>Last Name:</h2>
            <input type="text" className="form-field" placeholder="Last Name" aria-label="Last Name" name="lastName"
                    value={lastName} onChange={e => setLastName(e.target.value)} required/>


            <h2>Phone Number:</h2>
             <input type="text" className="form-field" placeholder="Phone Number" aria-label="Phone Number" name="phoneNum"
                    value={phoneNum} onChange={e => setPhoneNum(e.target.value)} required/>


            <h2>Email Address:</h2>
            <input type="email" className="form-field" placeholder="Email Address" aria-label="Email Address" name="email"
                    value={email} onChange={e => {
                        var userEmail = e.target.value;
                        
                        // Validate email address (RFC 5322 compliant except for comments & foldable whitespace)
                        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        setValidEmail(emailRegex.test(userEmail));
                        setEmail(userEmail);
                    }} required/>
            <br></br>
            <p style={{display: validEmail ? "none" : "inline", color: "red"}}>Please enter a valid email</p>

    
            <h2>Guess the cost of the air fryer:</h2>
            $ <input type="number" className="form-field" placeholder="Air Fryer Cost Guess" aria-label="Air Fryer Cost Guess" name="costGuess"
                    value={costGuess} min="0.00" onChange={e => {
                        const userInput = e.target.value;
                        const maxDecimalPoints = 2;

                        // Remove non-digit and non-decimal point
                        var costSanitized = userInput.replace(/[^\d.]/g, '');

                        // Ensure only one decimal point
                        const parts = costSanitized.split('.');
                        if (parts.length > 2) {
                            costSanitized = parts[0] + '.' + parts.slice(1).join('');
                        }

                        // Limit to 2 decimal places
                        if (costSanitized.includes('.')) {
                            const [integer, decimal] = costSanitized.split('.');
                            costSanitized = integer + '.' + decimal.slice(0, maxDecimalPoints);
                        }
                        
                        setCostGuess(parseFloat(costSanitized));
                    }} required/>

    
            <h2>Super Secret Spidr PIN (16 digits):</h2>
            <input type="text" className="form-field" placeholder="PIN (16 Digits)" aria-label="PIN (16 Digits)" name="pin"
                    value={pin} onChange={e => {
                        const userInput = e.target.value;
                        const delimiter = '-';
                        const validPinLength = 16;

                        // Remove all non-digit characters
                        const digitsOnly = userInput.replace(/\D/g, '').slice(0, validPinLength);

                        // Splits the pin into 4-digit-long sections
                        const pinSections = digitsOnly.match(/[0-9]{1,4}/g) || [];

                        // Join the sections with a hyphen
                        var formattedPin = pinSections.join(delimiter);

                        // If the user typed a hyphen manually, retain it
                        const sectionLength = 4;
                        if (userInput.endsWith(delimiter) && ((formattedPin.length % (sectionLength + 1)) === sectionLength)) {
                            formattedPin += delimiter;
                        }

                        setPin(formattedPin);
                        setValidPin(digitsOnly.length === validPinLength);
                    }} required/>
            <br></br>
            <br></br>
            <button type="submit" onClick={handleSubmission}>Submit</button>
        </div>
    );
}

export default FryerForm