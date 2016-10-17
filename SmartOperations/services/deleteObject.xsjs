//**** Example for basic REQUEST RESPONSE handling
var paramName; var paramValue; var headerName; var headerValue; var contentType;
//Implementation of GET call

// getCondig
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	//START -- CALL Procedure
	
	/*var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if ( bodyStr === undefined ){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 return {"myResult":"Missing BODY"};
	}*/
	
	//var data = $.request.body.asString();
	//var dataParsed= JSON.parse(data);
	
	var factorId = $.request.parameters.get("factorId");


	/*if(data === null)
	{
		
		return {"myResult":"Error Parameter"};
	}*/
	
	var connCheck = $.db.getConnection();
	var checkStr = 'DELETE FROM "SMART_OPERATION"."PREDICT_FACTOR_MASTER" WHERE FACTOR_GUID = ?';
	var kst = connCheck.prepareStatement(checkStr);
	kst.setInteger(1,parseInt(factorId));
	kst.execute();
	kst.close();
	connCheck.commit();
	connCheck.close();
	
	var connDel = $.db.getConnection();
	var delStr = 'DELETE FROM "SMART_OPERATION"."PREDICT_FACTOR_CONFIG" WHERE FACTOR_TARGET = ?';
	var dst = connDel.prepareStatement(delStr);
	dst.setInteger(1,parseInt(factorId));
	dst.execute();
	dst.close();
	connDel.commit();
	conDel.close();
	
		
	//END -- SELECT Results
	
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
    return $.response.status;
}

//Implementation of POST call
function handlePost() {
	
	
	var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if ( bodyStr === undefined ){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 return {"myResult":"Missing BODY"};
	}
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
    return {"myResult":"POST success"};
	
	
}

// Check Content type headers and parameters
function validateInput() {
	var i; var j;
	// Check content-type is application/json
	contentType = $.request.contentType;
	if ( contentType === null || contentType.startsWith("application/json") === false){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 $.response.setBody("Wrong content type request use application/json");
		return false;
	}
	// Extract parameters and process them 
	for (i = 0; i < $.request.parameters.length; ++i) {
	    paramName = $.request.parameters[i].name;
	    paramValue = $.request.parameters[i].value;
//      Add logic	    
	}
	// Extract headers and process them 
	for (j = 0; j < $.request.headers.length; ++j) {
	    headerName = $.request.headers[j].name;
	    headerValue = $.request.headers[j].value;
//      Add logic	    
	 }
	return true;
}
// Request process 
function processRequest(){
	if (validateInput()){
		try {
		    switch ( $.request.method ) {
		        //Handle your GET calls here
		        case $.net.http.GET:
		            $.response.setBody(JSON.stringify(handleGet()));

		            break;
		            //Handle your POST calls here
		        case $.net.http.POST:
		            $.response.setBody(JSON.stringify(handlePost()));
		            break; 
		        //Handle your other methods: PUT, DELETE
		        default:
		            $.response.status = $.net.http.METHOD_NOT_ALLOWED;
		            $.response.setBody("Wrong request method");		        
		            break;
		    }
		    $.response.contentType = "application/json";	    
		} catch (e) {
		    $.response.setBody("Failed to execute action: " + e.toString());
		}
	}
}
processRequest();




