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
     pstmt = conn.prepareStatement("SELECT * FROM \"waysidecloudapp.dbtables::RegionStation_Data\"");

        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
            
        record.RegionName   = rs.getString(1);
        record.RegionId     = rs.getString(2);
        record.StationName  = rs.getString(3);
        	
        record.StationId            = rs.getString(4);
        record.StationCoordinateX   = rs.getString(5);
        record.StationCoordinateY   = rs.getString(6);
        
        record.WorkCenter_Id = rs.getString(7);
        		
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

    var RegionName      = $.request.parameters.get('RegionName');
    var RegionId        = $.request.parameters.get('RegionId');
    var StationName     = $.request.parameters.get('StationName');
    var StationId       = $.request.parameters.get('StationId');
    var StationCoordinateX      = $.request.parameters.get('StationCoordinateX');
    var StationCoordinateY      = $.request.parameters.get('StationCoordinateY');
    var WorkCenter_Id           = $.request.parameters.get('WorkCenter_Id');
  
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::RegionStation_Data\" VALUES (?,?,?,?,?,?,?)';
     
        pstmt = conn.prepareStatement(query);
        
        pstmt.setString(1, RegionName);
        pstmt.setString(2, RegionId);
        pstmt.setString(3, StationName);
        pstmt.setString(4, StationId);
        pstmt.setString(5, StationCoordinateX);
        pstmt.setString(6, StationCoordinateY);
        pstmt.setString(7, WorkCenter_Id);
       

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
