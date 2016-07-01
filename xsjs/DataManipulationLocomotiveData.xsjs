var aCmd = $.request.parameters.get('cmd');
switch (aCmd)
{
    case "select":
        getDataFromTable();
        break;
    case "insert":
    	insertDataIntoTable();
        break;
    case "delete":
    	deleteDataFromTable();
        break;    
    default:
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody('Invalid Command: ', aCmd);
}
function getDataFromTable(){
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var output = {results: [] };
    try {
     pstmt = conn.prepareStatement("SELECT * FROM \"waysidecloudapp.dbtables::LocomotiveData\"");

        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
            
   
        record.TrainName = rs.getString(1);
        record.LocomotiveId = rs.getString(2);
        record.StartingStation = rs.getString(3);
    
        record.DestinationStation = rs.getString(4);
        record.NextStation = rs.getString(5);
        record.LocomotiveDetails = rs.getString(6);
    
        record.LocomotiveOrientation = rs.getString(7);
        record.TrainDepart = rs.getString(8);
        record.TrainArrival = rs.getString(9);
    
        record.Status = rs.getString(10);
        
        output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
	var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;
} 
function insertDataIntoTable(){

    var TrainName        = $.request.parameters.get('TrainName');
    var LocomotiveId     = $.request.parameters.get('LocomotiveId');
    var StartingStation  = $.request.parameters.get('StartingStation');
    
    var DestinationStation      = $.request.parameters.get('DestinationStation');
    var NextStation             = $.request.parameters.get('NextStation');
    var LocomotiveDetails       = $.request.parameters.get('LocomotiveDetails');
    
    var LocomotiveOrientation         = $.request.parameters.get('LocomotiveOrientation');
    var TrainDepart = $.request.parameters.get('TrainDepart');
    var TrainArrival   = $.request.parameters.get('TrainArrival');
    
    var Status   = $.request.parameters.get('Status');
   
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::LocomtiveData\" VALUES (?,?,?,?,?,?,?,?,?,?)';
     
        pstmt = conn.prepareStatement(query);
        
        pstmt.setString(1, TrainName);
        pstmt.setString(2, LocomotiveId);
        pstmt.setString(3, StartingStation);
        
        pstmt.setString(4, DestinationStation);
        pstmt.setString(5, NextStation);
        pstmt.setString(6, LocomotiveDetails);
           
        pstmt.setString(7, LocomotiveOrientation);
        pstmt.setString(8, TrainDepart);
        pstmt.setString(9, TrainArrival);
        
        pstmt.setString(10, Status);
       

        rs = pstmt.executeUpdate();
        conn.commit();
        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
    $.response.contentType = 'application/json';
    $.response.setBody(rs + ' Record Inserted successfully');
    $.response.status = $.net.http.OK;
} 
function deleteDataFromTable(){
    var productId = $.request.parameters.get('product_id');
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    try {
    	query = 'DELETE FROM \"p1940454979trial.hanaxs.hello::PRODUCT\" WHERE product_id = ?';
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, productId);
        pstmt.executeUpdate();
        conn.commit();

        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
    $.response.contentType = 'application/json';
    $.response.setBody('Record deleted successfully');
    $.response.status = $.net.http.OK;
} 
//https://s11hanaxs.hanatrial.ondemand.com/p1891766442trial/hanadb/hihana/hana/DataManipulationInboundMessageDetails.xsjs?cmd=insert&MSG_TYPE=MSG_TYPE&MSG_NAME=MSG_NAME&MSG_ID=MSG_ID&MSG_TRANS_ID=MSG_TRANS_ID&MSG_QUEUE=MSG_QUEUE&MSG_QUEUE_SEQ=MSG_QUEUE_SEQ&MSG_DOC=MSG_DOC&MSG_PROC_STATUS=MSG_PROC_STATUS&MSG_RECV_TIME=0001-01-01 00:00:00.0000000&MSG_PROC_TIME=MSG_PROC_TIME&MSG_SRC=MSG_SRC