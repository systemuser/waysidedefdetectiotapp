var aCmd = $.request.parameters.get('cmd');
   switch (aCmd)
{
case "insert":
    	insertDataIntoTable();
        break;
	default:
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody('Invalid Command: ', aCmd);
		}
		
function insertDataIntoTable(){
   var UserName    = $.request.parameters.get('UserName');
    var Region      = $.request.parameters.get('Region');
    var StationId   = $.request.parameters.get('StationId');
    
    var conn = $.db.getConnection();
    var pstmt;
    var query;
    var rs;
    try 
    {
    	query = 'INSERT INTO \"waysidecloudapp.dbtables::UserConfigData\" VALUES (?,?,?)';
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, UserName);
        pstmt.setString(2, Region);
        pstmt.setString(3, StationId);

        rs = pstmt.executeUpdate();
        conn.commit();
        pstmt.close();
        conn.close();
  
	} 
	catch (e) 
	{
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
	}
    $.response.contentType = 'application/json';
    $.response.setBody(rs + ' Record Inserted successfully');
    $.response.status = $.net.http.OK;
	}
    