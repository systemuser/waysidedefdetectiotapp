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
     pstmt = conn.prepareStatement("SELECT * FROM \"waysidecloudapp.dbtables::InboundMessageDetails\"");

        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
            
   record.MSG_TYPE = rs.getString(1);
    record.MSG_NAME = rs.getString(2);
   record.MSG_ID = rs.getString(3);
    
    record.MSG_TRANS_ID = rs.getString(4);
   record.MSG_QUEUE = rs.getString(5);
    record.MSG_QUEUE_SEQ = rs.getString(6);
    
    record.MSG_DOC = rs.getString(7);
    record.MSG_PROC_STATUS = rs.getString(8);
    record.MSG_RECV_TIME = rs.getString(9);
    
   record.MSG_PROC_TIME = rs.getString(10);
    record.MSG_SRC = rs.getString(11);
            
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

    var MSG_TYPE        = $.request.parameters.get('MSG_TYPE');
    var MSG_NAME        = $.request.parameters.get('MSG_NAME');
    var MSG_ID          = $.request.parameters.get('MSG_ID');
    
    var MSG_TRANS_ID    = $.request.parameters.get('MSG_TRANS_ID');
    var MSG_QUEUE       = $.request.parameters.get('MSG_QUEUE');
    var MSG_QUEUE_SEQ   = $.request.parameters.get('MSG_QUEUE_SEQ');
    
    var MSG_DOC         = $.request.parameters.get('MSG_DOC');
    var MSG_PROC_STATUS = $.request.parameters.get('MSG_PROC_STATUS');
    var MSG_RECV_TIME   = $.request.parameters.get('MSG_RECV_TIME');
    
    var MSG_PROC_TIME   = $.request.parameters.get('MSG_PROC_TIME');
    var MSG_SRC         = $.request.parameters.get('MSG_SRC');
  
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::InboundMessageDetails\" VALUES (?,?,?,?,?,?,?,?,?,?,?)';
     
        pstmt = conn.prepareStatement(query);
        
        pstmt.setString(1, MSG_TYPE);
        pstmt.setString(2, MSG_NAME);
        pstmt.setString(3, MSG_ID);
        
        pstmt.setString(4, MSG_TRANS_ID);
        pstmt.setString(5, MSG_QUEUE);
        pstmt.setString(6, MSG_QUEUE_SEQ);
           
        pstmt.setString(7, MSG_DOC);
        pstmt.setString(8, MSG_PROC_STATUS);
        pstmt.setString(9, MSG_RECV_TIME);
        
        pstmt.setString(10, MSG_PROC_TIME);
        pstmt.setString(11, MSG_SRC);
       

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