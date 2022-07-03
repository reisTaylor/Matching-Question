/**
 * The query and getUserRoles() method both work,
 * but the results from the query are either not populated
 * within the combobox component, or the drop-down
 * button functionality isn't working
 */
public with sharing class ExamQuestionController {
    
    @AuraEnabled(cacheable=true)
    public static List<Question__c> getExamQuestion() {
        
        if (!Schema.sObjectType.Question__c.isAccessible()) {
            return null;
        } else {
            List<Question__c> questionList = [SELECT Id, Name, 
                                                     PremiseOne__c, 
                                                     PremiseTwo__c, 
                                                     PremiseThree__c 
                                              FROM Question__c
                                              LIMIT 1
                                             ];
            return questionList;
        }

    }

    

}

