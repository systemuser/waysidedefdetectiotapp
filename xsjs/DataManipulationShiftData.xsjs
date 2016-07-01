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
        	record.productId = rs.getString(1);
        	record.productName = rs.getString(2);
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

table.schemaName = "NEO_6JPBVD37WSX2QT1FE2YGPB0KX";

table.tableType = COLUMNSTORE;

    var StationId       = $.request.parameters.get('StationId');
    var Shift        = $.request.parameters.get('Shift');
    var StartTime           = $.request.parameters.get('StartTime');
    var ShiftDuration          = $.request.parameters.get('ShiftDuration');
    var ComplianceTarget           = $.request.parameters.get('ComplianceTarget');
    var ShiftSuperVisor        = $.request.parameters.get('ShiftSuperVisor');
  
    
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::Shift_Data\" VALUES (?,?,?,?,?,?)';
  
        pstmt = conn.prepareStatement(query);
       
        pstmt.setString(1, StationId);
        pstmt.setString(2, Shift);
        pstmt.setString(3, StartTime);
        pstmt.setString(4, ShiftDuration);
        pstmt.setString(5, ComplianceTarget);
        pstmt.setString(6, ShiftSuperVisor);
        
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
//https://s11hanaxs.hanatrial.ondemand.com/p1891766442trial/hanadb/hihana/hana/DataManipulationShiftData.xsjs?cmd=insert&StationId=StationId&Shift=Shift&StartTime=StartTime&ShiftDuration=ShiftDuration&ComplianceTarget=ComplianceTarget&ShiftSuperVisor=ShiftSuperVisor