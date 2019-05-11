import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
// import { default as _rollupMoment } from 'moment';

const moment = _moment;

class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        var formatString = 'MMMM YYYY';
        return moment(date).format(formatString);
    }
}

@Component({
    selector: 'month-picker',
    templateUrl: './month.picker.html',
    styleUrls: [],
    providers: [
        {
            provide: DateAdapter, useClass: CustomDateAdapter
        }
    ]
})
export class MonthPickerComponent {
    @ViewChild(MatDatepicker) picker;
    date = new FormControl();
    constructor() { }

    monthSelected(params) {
        let current
        this.date.setValue(params);
        this.picker.close();
    }

    getAge(month: number, year: number) {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

    }

}
