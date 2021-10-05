import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isStringOrNumber', async: false })
export class  IsStringOrNumber implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        return (typeof text === "string" || typeof text === "number")// for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Number must be either a string or number';
    }
}

@ValidatorConstraint({ name: 'mobileLength', async: false })
export class  MobileLength implements ValidatorConstraintInterface {
    validate(text: any, args: ValidationArguments) {
        if(typeof text === "number"){
        return text.toString().length === 10
        } else if (typeof text ==="string"){
            return text.length === 10
        }
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'Number must have 10 digits';
    }
}