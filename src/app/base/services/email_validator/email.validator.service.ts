import {Injectable} from '@angular/core'
import {Validators} from '@angular/forms'

@Injectable()
export class EmailValidatorService {
    EMAIL_PATTERN = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    GMAIL_PATTERN = /@gmail.com$/
    OUTLOOK_PATTERN = /@outlook.com$/
    
    validateEmailFormat(email: string) {
        return this.EMAIL_PATTERN.test(email)
    }

    validateEmailType(email: string) {
        return this.GMAIL_PATTERN.test(email) || this.OUTLOOK_PATTERN.test(email)
    }
}