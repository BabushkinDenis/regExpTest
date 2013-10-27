function option(){
this.optionStr = ko.observable();
this.optionIsDone=ko.observable();
this.optionsResponse=ko.observable();
}


function question() {
	var question=this;
	question.answePatern="";
	question.answeFlags="";
	
	this.title = ko.observable();
    this.options = ko.observableArray();
	
	this.usermethod=ko.observable();
	this.userPatern = ko.observable();
	this.userFlags = ko.observable();
	
	this.questionIsDone = ko.computed(function() {
		var total=0;
		ko.utils.arrayForEach(question.options(), function(item){if (item.optionIsDone()){total ++;}});
		return question.options().length==total  ? "completed" : "notcompleted";
	});
	
	
	this.checkRespones = function() {
			
		var userRe=new RegExp(this.userPatern(), this.userFlags())
		var answeRe=new RegExp(this.answePatern, this.answeFlags)
			
		ko.utils.arrayForEach(question.options(), function(item) {
		
			switch (question.usermethod()) {
				case "search":
					if(item.optionStr().search(userRe)==-1)item.optionsResponse("Нет");else item.optionsResponse("Да");
					if(item.optionStr().search(userRe)===item.optionStr().search(answeRe)){item.optionIsDone(true);}
					else item.optionIsDone(false);
				break
				case "match":
					item.optionsResponse(item.optionStr().match(userRe).toString())
					if(item.optionStr().match(userRe).toString()==item.optionStr().match(answeRe).toString()){item.optionIsDone(true);}
					else item.optionIsDone(false);
					
				break
				case "replace":
					
					item.optionsResponse(item.optionStr().replace(userRe,""))
					if(item.optionStr().replace(userRe,"")==item.optionStr().replace(answeRe,"")){item.optionIsDone(true);}
					else item.optionIsDone(false);
				break
			}
	
			
			
	    });
		 
	};
	
	
}



function UnitViewModel() {
    var Unit = this;
	Unit.questions = ko.observableArray([]);
    var question_1=new question().title('Необходимо написать одно регулярное выражение, которое проверит, есть ли в строке буква');    
	question_1.options.push(new option().optionStr('67790066'));
	question_1.options.push(new option().optionStr('6778g8977'));
	question_1.options.push(new option().optionStr('a776983h3'));
	question_1.usermethod('search');
	question_1.answePatern="[a-z]";
	question_1.answeFlags="gi";
	Unit.questions.push(question_1);	
	
	var question_2=new question().title('Нужно написать одно регулярное выражение, которое бы из двух нижеперечисленных строк убрало гласные');    
	question_2.options.push(new option().optionStr('Миша'));
	question_2.options.push(new option().optionStr('огурец'));
	question_2.options.push(new option().optionStr('Оля'));
	question_2.usermethod('replace');
	question_2.answePatern="[иаоуея]";
	question_2.answeFlags="gi";
	Unit.questions.push(question_2);
	
	var question_3=new question().title('Нужно написать одно регулярное выражение, чтобы в строке найти те слова, которые начинаются на a и заканчиваются на b');    
	question_3.options.push(new option().optionStr('ab aa acb abc acdcdcdb'));
	question_3.usermethod('match');
	question_3.answePatern="\\a\\w*b\\b";
	question_3.answeFlags="gi";
	Unit.questions.push(question_3);
	
	
		
	
	
	Unit.incompleteQuestions = ko.computed(function() {
	   var total=0;
	   ko.utils.arrayForEach(Unit.questions(), function(item) {
        if (item.questionIsDone()=="completed") {total ++;}
	    });
	return total
	});
	
	
    
}

ko.applyBindings(new UnitViewModel());