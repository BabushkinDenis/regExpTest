function option(){
this.optionStr = ko.observable();
this.optionIsDone=ko.observable();
}

function question() {
	var question=this;
	
	this.title = ko.observable();
    this.options = ko.observableArray();
	this.questionIsDone = ko.computed(function() {
		var total=0;
		ko.utils.arrayForEach(question.options(), function(item){if (item.optionIsDone()){total ++;}});
		return question.options().length==total  ? "completed" : "notcompleted";
	});
	
	this.answePatern="";
	this.answeFlags="";
	
	this.userPatern = ko.observable();
	this.userFlags = ko.observable();
	
	
	this.checkRespones = function() {
			
		var userRe=new RegExp(this.userPatern(), this.userFlags())
		var answeRe=new RegExp(this.answePatern, this.answeFlags)
			ko.utils.arrayForEach(question.options(), function(item) {
			if(item.optionStr().match(userRe).toString()==item.optionStr().match(answeRe).toString()){
				item.optionIsDone(true);
			//	alert(item.optionStr().match(userRe));
			//	alert(item.optionStr().match(answeRe));
				}
			else item.optionIsDone(false);
			
	    });
		 
	};
	

}



function UnitViewModel() {
    var Unit = this;
	Unit.questions = ko.observableArray([]);
    var question_1=new question().title('Необходимо написать одно регулярное выражение, которое проверит, есть ли в строке буква');    
	question_1.options.push(new option().optionStr('6779f0066'));
	question_1.options.push(new option().optionStr('6778g8977'));
	question_1.options.push(new option().optionStr('a7769833h'));
	question_1.answePatern="[a-z]";
	question_1.answeFlags="gi";
	Unit.questions.push(question_1);	
	
	var question_2=new question().title('Нужно написать одно регулярное выражение, которое бы из двух нижеперечисленных строк убрало гласные');    
	question_2.options.push(new option().optionStr('Миша'));
	question_2.options.push(new option().optionStr('огlурец'));
	Unit.questions.push(question_2);
	
	
		
	
	
	Unit.incompleteQuestions = ko.computed(function() {
	   var total=0;
	   ko.utils.arrayForEach(Unit.questions(), function(item) {
        if (item.questionIsDone()=="completed") {total ++;}
	    });
	return total
	});
	
	
    
}

ko.applyBindings(new UnitViewModel());
  