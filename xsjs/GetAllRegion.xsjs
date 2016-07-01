getDataFromTable();
function getDataFromTable(){
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var output = {results: [] };
    try {
     pstmt = conn.prepareStatement("SELECT 	LONGLAT.ST_AsGeoJSON() FROM \"waysidecloudapp.dbtables::RegionStation_new\"");

        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
            
        record.RegionName   = rs.getString(1);
       // record.RegionId     = rs.getString(2);
 		
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