function question() {
	this.title = ko.observable();
    this.abc = ko.observableArray();
	this.respones="";  
	this.isDone = ko.observable("notcompleted");
	this.userResponse = ko.observable();
	this.checkRespones = function() {
		 		
		 this.isDone("completed");
		 this.userResponse("");
	    };
}



function UnitViewModel() {
    var Unit = this;
	Unit.questions = ko.observableArray([]);
        
	Unit.questions.push(new question().title('Необходимо написать одно регулярное выражение, которое проверит, есть ли в строке буква').abc(["0123456789", "24489ы879", "8884O8489"]));	
	Unit.questions.push(new question().title('Нужно написать одно регулярное выражение, которое бы из двух нижеперечисленных строк убрало гласные').abc(["Миша", "Огурец"]));	
	
	Unit.incompleteQuestions = ko.computed(function() {
	   var total=0;
	   ko.utils.arrayForEach(Unit.questions(), function(item) {
        if (item.isDone()=="completed") {
            total ++;
        }
	    });
	return total
	});
	
    
}

ko.applyBindings(new UnitViewModel());


  