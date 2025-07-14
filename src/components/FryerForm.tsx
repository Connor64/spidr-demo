import './FryerForm.css'
import { useState } from 'react'

function FryerForm() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const [costGuess, setCostGuess] = useState<number>(0.00);
    const [pin, setPin] = useState<string>("");
    const [validPin, setValidPin] = useState<boolean>(true);
    const [validSubmission, setValidSubmission] = useState<boolean>(true);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmission = (e: React.FormEvent) => {
        e.preventDefault();

        // If any fields aren't filled correctly, don't submit the data
        if ((firstName == "") || (lastName == "") ||
            (phoneNum == "") || !validEmail ||
            (costGuess < 0) || !validPin) {
                console.log("Invalid Submission");
                setValidSubmission(false);
                return;
            }

        setSubmitted(true);

        // Print formatted data
        console.log(
            `SPIDR FORM SUBMISSION:\n
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Phone Number: ${phoneNum}\n
            Email: ${email}\n
            Cost Guess: ${costGuess}\n
            PIN: ${pin}`
        );

        // Print the json object directly to console
        const submission = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNum,
            email: email,
            costGuess: costGuess,
            pin: pin
        }
        console.log(submission);

    }

    return (
        <div id='fryer-form'>
            <h1>Spidr Design Airfryer Form:</h1>
            <hr style={{width: "30%", marginBottom: "20px"}}></hr>
            <h5 id='form-description'>
                Want your very own <strong>Spidr Design Air Fryer</strong>? Fill out our form and guess the price to be entered into our sweepstakes! Only the <strong>first 10</strong> diehard Spidr fans that accurately guess the price will receive one, so act fast!
            </h5>
            <hr></hr>
            <form className="form-container" style={{display: submitted ? 'none' : 'flex'}}>
                <div className='entry-field'>
                    <h3>First Name:</h3>
                    <input type="text" className="form-field" placeholder="First Name" aria-label="First Name" name="firstName"
                            value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                    <h5 className='form-error' style={{display: (validSubmission || firstName != "") ? 'none' : 'inline'}}>Please enter a first name.*</h5>
                </div>


                <div className='entry-field'>
                    <h3>Last Name:</h3>
                    <input type="text" className="form-field" placeholder="Last Name" aria-label="Last Name" name="lastName"
                        value={lastName} onChange={e => setLastName(e.target.value)} required/>
                    <h5 className='form-error' style={{display: (validSubmission || firstName != "") ? 'none' : 'inline'}}>Please enter a last name.*</h5>
                </div>


                <div className='entry-field'>
                    <h3>Phone Number:</h3>
                    <input type="text" className="form-field" placeholder="Phone Number" aria-label="Phone Number" name="phoneNum"
                            value={phoneNum} onChange={e => {
                                let [formattedPhone, isPinValid] = PhoneFormat(e.target.value);
                                setPhoneNum(formattedPhone);
                                // setValidPin(isPinValid)
                            }} required/>
                    <h5 className='form-error' style={{display: (validSubmission || firstName != "") ? 'none' : 'inline'}}>Please enter a phone number.*</h5>
                </div>


                <div className='entry-field'>
                    <h3>Email Address:</h3>
                    <input type="email" className="form-field" placeholder="Email Address" aria-label="Email Address" name="email"
                            value={email} onChange={e => {
                                let userEmail = e.target.value;
                                
                                // Validate email address (RFC 5322 compliant except for comments & foldable whitespace)
                                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                                setEmail(userEmail);
                                setValidEmail(emailRegex.test(userEmail));
                            }} required/>
                    <h5 className='form-error' style={{display: validEmail ? 'none' : 'inline'}}>Please enter a valid email*</h5>
                </div>


                <div className='entry-field'>
                    <h3>Guess Air Fryer's Cost (Dollars):</h3>
                    <input type="number" className="form-field" placeholder="Air Fryer Cost Guess (Dollars)" aria-label="Air Fryer Cost Guess" name="costGuess"
                            value={costGuess} min="0.00" onChange={e => setCostGuess(CostFormat(e.target.value))} required/>
                    <h5 className='form-error' style={{display: (validSubmission || costGuess >= 0) ? 'none' : 'inline'}}>Please enter a dollar amount.*</h5>
                </div>
        

                <div className='entry-field'>
                    <h3>Spidr PIN (16 digits):</h3>
                    <input type="text" className="form-field" placeholder="PIN (16 Digits)" aria-label="PIN (16 Digits)" name="pin"
                            value={pin} onChange={e => {
                                let [formattedPin, isPinValid] = PinFormat(e.target.value);
                                setPin(formattedPin);
                                setValidPin(isPinValid)
                            }} required/>
                    <h5 className='form-error' style={{display: validPin ? 'none' : 'inline'}}>Please enter a valid PIN*</h5>
                </div>
                <br></br>
                <br></br>

            </form>
            <div className='submit-container' style={{display: submitted ? 'none' : 'flex'}}>
                <button className="btn" type="submit" style={{alignSelf: 'center'}} onClick={handleSubmission}>Submit</button>
                <h5 className='form-error' style={{display: validSubmission ? 'none' : 'inline'}}>
                    Incorrect data/format in one or more fields*
                </h5>
            </div>

            <h3 style={{display: submitted ? 'inline' : 'none'}}>
                Thank you for submitting!
            </h3>
            <br></br>
            <br></br>
            <div className='bg-noise'></div>
        </div>
    );
}

/**
 * Formats the given number into a dollar amount with 2 decimal places.
 * 
 * @param costInput A raw, user-entered string containing a dollar amount.
 * @returns A parsed number with only 2 decimal places.
 */
function CostFormat(costInput: string) {
    const maxDecimalPoints = 2;

    // Remove non-digit and non-decimal point
    let costSanitized = costInput.replace(/[^\d.]/g, '');

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

    return parseFloat(costSanitized);
}

/**
 * Formats the given PIN into a hyphenated format XXXX-XXXX-XXXX-XXXX.
 * 
 * @param pinInput A raw, user-entered string containing their Spyder PIN.
 * @returns A tuple [string, boolean] contianing the formatted string and
 *          whether the PIN is a valid length.
 */
function PinFormat(pinInput: string): [string, boolean] {
    const delimiter = '-';
    const validPinLength = 16;

    // Remove all non-digit characters
    const digitsOnly = pinInput.replace(/\D/g, '').slice(0, validPinLength);

    // Splits the pin into 4-digit-long sections
    const pinSections = digitsOnly.match(/[0-9]{1,4}/g) || [];

    // Join the sections with a hyphen
    let formattedPin = pinSections.join(delimiter);

    // If the user typed a hyphen manually, retain it
    const sectionLength = 4;
    if (pinInput.endsWith(delimiter) && ((formattedPin.length % (sectionLength + 1)) === sectionLength)) {
        formattedPin += delimiter;
    }

    return [formattedPin, digitsOnly.length === validPinLength];
}

/**
 * Formats the given string into a valid phone number format XXX-XXX-XXXX.
 * 
 * @param phoneInput A raw, user-entered string containing their phone number
 * @returns A tuple [string, boolean] containing the formatted string and
 *          whether the phone number is a valid length.
 */
function PhoneFormat(phoneInput: string): [string, boolean] {
    const delimiter = '-';
    const validPhoneLength = 10;

    // Remove all non-digit characters and limit to 10 digits
    const digitsOnly = phoneInput.replace(/\D/g, '').slice(0, validPhoneLength);

    let formattedPhoneNum = '';
    
    if (digitsOnly.length > 0) {
        formattedPhoneNum += digitsOnly.slice(0, 3);
    }
    if (digitsOnly.length >= 4) {
        formattedPhoneNum += delimiter + digitsOnly.slice(3, 6);
    }
    if (digitsOnly.length >= 7) {
        formattedPhoneNum += delimiter + digitsOnly.slice(6, 10);
    }

    // If the user typed a hyphen manually, retain it
    const sectionLength = 3;
    if (phoneInput.endsWith(delimiter) && (formattedPhoneNum.length < 8) &&
        (formattedPhoneNum.length % (sectionLength + 1) == sectionLength)) {
        formattedPhoneNum += delimiter;
    }

    return [formattedPhoneNum, digitsOnly.length === validPhoneLength];
}

export default FryerForm