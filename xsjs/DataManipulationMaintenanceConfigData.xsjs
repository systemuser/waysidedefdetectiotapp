var aCmd = $.request.parameters.get('cmd');
switch (aCmd){
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
     pstmt = conn.prepareStatement("SELECT * FROM \"waysidecloudapp.dbtables::MaintenanceConfig_Data\"");

        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
            

        	    record.MessageName    = rs.getString(1);
        	    record.InterfaceName  = rs.getString(2);
        	    record.ParamName    = rs.getString(3);
        	    record.ParamXPath  = rs.getString(4);
        	    record.ParamLabel    = rs.getString(5);

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
    //var productId = $.request.parameters.get('product_id');
    //var productName = $.request.parameters.get('product_name');
    var MessageName     = $.request.parameters.get('MessageName');
    var InterfaceName   = $.request.parameters.get('InterfaceName');
    var ParamName       = $.request.parameters.get('ParamName');
    var ParamXPath      = $.request.parameters.get('ParamXPath');
    var ParamLabel      = $.request.parameters.get('ParamLabel');
    
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::MaintenanceConfig_Data\" VALUES (?,?,?,?,?)';
  
        pstmt = conn.prepareStatement(query);
       
        pstmt.setString(1, MessageName);
        pstmt.setString(2, InterfaceName);
        pstmt.setString(3, ParamName);
        pstmt.setString(4, ParamXPath);
        pstmt.setString(5, ParamLabel);
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
//https://s11hanaxs.hanatrial.ondemand.com/p1891766442trial/hanadb/hihana/hana/DataManipulationMaintenanceConfigData.xsjs?cmd=insert&MessageName=MessageName&InterfaceName=InterfaceName&ParamName=ParamName&ParamXPath=ParamXPath&ParamLabel=ParamLabel