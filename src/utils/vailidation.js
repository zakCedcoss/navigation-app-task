export const validatePhone = (phone) => {
    const phoneNumber = Number(phone)
    if (phone === "") {
        return "Phone field cannot be empty !!!";
    }
    if (isNaN(phoneNumber)) {
        return "Phone cannot be string";
    }
    if(phone.length > 10) {
        return "Phone greater than 10 digits"
    }
}

export const validateEmail = (email) => {
    if (email === "") {
        return "Email field cannot be empty"
    }
    if (!email.includes("@")) {
        return "Email must contain @"
    }
    if (email[0] === "@") {
        return "Email must not start with @"
    }
    if(!email.split("@")[1].includes(".")) {
        return "Email must have .com, .in, etc extension"
    }
    if(email.split("@")[1][0] === ".") {
        return "Email must not have dot(.) just after @"
    }
}