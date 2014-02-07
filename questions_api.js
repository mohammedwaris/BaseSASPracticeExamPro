var db;

function initializeDB(callback){
	db = window.openDatabase("basesas", "1.0", "Base SAS", 1024*1024);
	callback();
}
function createDB(callback){
	db = window.openDatabase("basesas", "1.0", "Base SAS", 1024*1024);
	db.transaction(insertRecord, function(error){
									//error
									alert('error: ' + err.code);
									 
								 }, function(){
								 	//success
								 	callback();
								 }); 
}

function insertRecord(tx){
	tx.executeSql('DROP TABLE IF EXISTS questions');
	tx.executeSql('CREATE TABLE IF NOT EXISTS questions (id INTEGER NOT NULL,question varchar(1000) NOT NULL,option1 varchar(500) NOT NULL,option2 varchar(500) NOT NULL,option3 varchar(500) NOT NULL,option4 varchar(500) NOT NULL,answer varchar(1) NOT NULL,set_num INTEGER NOT NULL,explanation varchar(500),subject varchar(50),PRIMARY KEY (id))');
	len = jsonQuestions.length;
	for(i=0;i<len;i++){
		id = jsonQuestions[i].id;
		question = jsonQuestions[i].question;
		option1 = jsonQuestions[i].option1; 
		option2 = jsonQuestions[i].option2;
		option3 = jsonQuestions[i].option3;
		option4 = jsonQuestions[i].option4;
		answer = jsonQuestions[i].answer;
		set_num = jsonQuestions[i].set_num;
		explanation = jsonQuestions[i].explanation;
		subject = jsonQuestions[i].subject;	
		sql = 'INSERT INTO questions (id, question, option1, option2, option3, option4, answer, set_num, explanation, subject) VALUES(?,?,?,?,?,?,?,?,?,?)'; 
        tx.executeSql(sql, [id, question, option1, option2, option3, option4, answer, set_num, explanation, subject ]);
        //alert(sql); 				  	
	}
	
}
 
function success(){
	//alert('Record inserted');
}

function fail(tx, error){
	//alert('Record insertion fail');
}

function get64Questions(callback){
		
	 db.transaction(function(tx){ 
	 tx.executeSql("SELECT * FROM questions WHERE set_num != -1 AND subject = 'base_sas'", [],
	 								function(tx, results){
										rows = results.rows;
										len = rows.length;
										var questions = new Array();
										for(i=0;i<64;i++){
											question = new Object();
											question.id = rows.item(i).id;
											question.question = rows.item(i).question;
											question.option1 = rows.item(i).option1;
											question.option2 = rows.item(i).option2;
											question.option3 = rows.item(i).option3;
											question.option4 = rows.item(i).option4;
											question.answer = rows.item(i).answer;
											question.set_num = rows.item(i).set_num;
											question.explanation = rows.item(i).explanation;
											question.subject = rows.item(i).subject;
											questions.push(question);										
										}
										questions = shuffle(questions);
										var first64Questions = new Array();
										for(i=0;i<64;i++){
											first64Questions.push(questions[i]);
										}
										callback(first64Questions);
									});	 	
	 });//end of tx.executeSql
	
}

function get10Questions(callback){
		
	 db.transaction(function(tx){
	 					tx.executeSql("SELECT * FROM questions WHERE set_num != -1 AND subject = 'base_sas'", [],
	 								function(tx, results){
										rows = results.rows;
										//alert(len);
										var questions = new Array();
										for(i=0;i<10;i++){
											question = new Object();
											question.id = rows.item(i).id;
											question.question = rows.item(i).question;
											question.option1 = rows.item(i).option1;
											question.option2 = rows.item(i).option2;
											question.option3 = rows.item(i).option3;
											question.option4 = rows.item(i).option4;
											question.answer = rows.item(i).answer;
											question.set_num = rows.item(i).set_num;
											question.explanation = rows.item(i).explanation;
											question.subject = rows.item(i).subject;
											questions.push(question);										
										}
										questions = shuffle(questions);
										var first10Questions = new Array();
										for(i=0;i<10;i++){
											first10Questions.push(questions[i]);
										}
										callback(first10Questions);
									});	 	
	 				});
	
}

function getPracticeQuestions(callback){
		
	 db.transaction(function(tx){
	 					tx.executeSql("SELECT * FROM questions WHERE subject = 'base_sas'", [],
	 								function(tx, results){
										rows = results.rows;
										len = rows.length;
										//alert(len);
										var questions = new Array();
										for(i=0;i<len;i++){
											question = new Object();
											question.id = rows.item(i).id;
											question.question = rows.item(i).question;
											question.option1 = rows.item(i).option1;
											question.option2 = rows.item(i).option2;
											question.option3 = rows.item(i).option3;
											question.option4 = rows.item(i).option4;
											question.answer = rows.item(i).answer;
											question.set_num = rows.item(i).set_num;
											question.explanation = rows.item(i).explanation;
											question.subject = rows.item(i).subject;
											questions.push(question);										
										}
										questions = shuffle(questions);
										callback(questions);
									});	 	
	 				});
	
}

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}