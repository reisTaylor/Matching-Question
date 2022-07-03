import { LightningElement, wire, track } from 'lwc';
import getExamQuestion from '@salesforce/apex/ExamQuestionController.getExamQuestion';
import getExamAnswer from '@salesforce/apex/ExamAnswerController.getExamAnswer';

export default class DisplayExamQuestion extends LightningElement {
    @track items       = []; //this will hold the Question key/value pairs
    @track ansItems    = []; //this will hold the Answer key/value pairs
    @track value       = ''; //to initialize the combo box values
    @track chosenValue = '';

    @wire(getExamQuestion) getExamQuestion({ data, error }) {
        
        console.log('data: '  + JSON.stringify(data));
        console.log('error: ' + JSON.stringify(error));
        
        if (data) {

            var temp  = [];
            for(var i = 0; i < data.length; i++) {
                var currentExamQuestion   = data[i];
                var examQuestionObject    = {};
                console.log('currentExamQuestion.Name: '          + currentExamQuestion.Name);
                console.log('currentExamQuestion.PremiseOne__c: ' + currentExamQuestion.PremiseOne__c);
                examQuestionObject.label  = 'First Premise';
                examQuestionObject.value  = currentExamQuestion.PremiseOne__c;
                temp.push({ label :         currentExamQuestion.PremiseOne__c, 
                            value :         currentExamQuestion.PremiseOne__c });
                

                var examQuestion2Object   = {};
                console.log('currentExamQuestion.Name: '            + currentExamQuestion.Name);
                console.log('currentExamQuestion.PremiseTwo__c: '   + currentExamQuestion.PremiseTwo__c);
                examQuestion2Object.label = 'Second Premise';
                examQuestion2Object.value = currentExamQuestion.PremiseTwo__c;
                temp.push({ label :         currentExamQuestion.PremiseTwo__c, 
                            value :         currentExamQuestion.PremiseTwo__c });
               

                var examQuestion3Object   = {};
                console.log('currentExamQuestion.Name: '            + currentExamQuestion.Name);
                console.log('currentExamQuestion.PremiseThree__c: ' + currentExamQuestion.PremiseThree__c);
                examQuestion3Object.label = 'Third Premise';
                examQuestion3Object.value = currentExamQuestion.PremiseThree__c;
                temp.push({ label :         currentExamQuestion.PremiseThree__c, 
                            value :         currentExamQuestion.PremiseThree__c });
                

               //temp.push({ label : currentExamQuestion.Name, value : currentExamQuestion.Name });
               //console.log('temp ' + temp);
            }
            this.items = temp;
            console.log('items: ' + JSON.stringify(this.items));
        
        } else if (error) {
            this.error    = error;
            this.contacts = undefined;
        }
    }

    @wire(getExamAnswer) getExamAnswer({ data, error }) {
        
        console.log('data: '  + JSON.stringify(data));
        console.log('error: ' + JSON.stringify(error));
        
        if (data) {

            var temp = [];
            //console.log('data: ' + JSON.stringify(data));

            for(var i = 0; i < data.length; i++) {
                var currentExamAnswer  = data[i];
                var examAnswerObject   = {};
                console.log('currentExamAnswer: '                      + currentExamAnswer);
                console.log('currentExamAnswer.Name: '                 + currentExamAnswer.Name);
                console.log('currentExamAnswer.PremiseOne_Answer__c: ' + currentExamAnswer.PremiseOne_Answer__c);
                examAnswerObject.label = 'First Premise Answer';
                examAnswerObject.value = currentExamAnswer.PremiseOne_Answer__c;
                temp.push({ label :      currentExamAnswer.PremiseOne_Answer__c, 
                            value :      currentExamAnswer.PremiseOne_Answer__c });
                

                var examAnswer2Object   = {};
                console.log('currentExamAnswer.Name: '                 + currentExamAnswer.Name);
                console.log('currentExamAnswer.PremiseTwo_Answer__c: ' + currentExamAnswer.PremiseTwo_Answer__c);
                examAnswer2Object.label = 'Second Premise';
                examAnswer2Object.value = currentExamAnswer.PremiseTwo_Answer__c;
                temp.push({ label :       currentExamAnswer.PremiseTwo_Answer__c, 
                            value :       currentExamAnswer.PremiseTwo_Answer__c });
               

                var examAnswer3Object   = {};
                console.log('currentExamAnswer.Name: '            + currentExamAnswer.Name);
                console.log('currentExamAnswer.PremiseThree__c: ' + currentExamAnswer.PremiseThree_Answer__c);
                examAnswer3Object.label = 'Third Premise';
                examAnswer3Object.value = currentExamAnswer.PremiseThree_Answer__c;
                temp.push({ label :       currentExamAnswer.PremiseThree_Answer__c, 
                            value :       currentExamAnswer.PremiseThree_Answer__c });
                

               //temp.push({ label : currentExamQuestion.Name, value : currentExamQuestion.Name });
               //console.log('temp ' + temp);
            }
            this.ansItems = temp;
            console.log('ansItems: ' + JSON.stringify(this.ansItems));
        
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
    //getter to return Question items that are mapped 
    //to the options attribute
    getItems() {
        return this.items;
    }
    //getter to return answer ansItems that are mapped 
    //to the options attribute
    getAnsItems() {
        return this.ansItems;
    }
    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        console.log('event: ' + event);
        const selectedOption = event.detail.value;
        console.log('selected value=' + selectedOption);
        console.log('this.chosenValue ' + this.chosenValue);
        this.chosenValue = selectedOption;
    }
    //will return the user-selected value from combobox
    getSelectedValue() {
        return this.chosenValue;
    } 
}