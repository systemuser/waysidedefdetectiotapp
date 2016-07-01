    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var query;
    var output = {results: [] };
    try {
      //  query = 'SELECT * FROM \"p1891766442trial.hanadb.hihana.hana::RegionStation_Data"\"';
        pstmt = conn.prepareStatement("SELECT LONGLAT.ST_AsGeoJSON(),\"StationId\",\"StationName\" FROM \"waysidecloudapp.dbtables::RegionStation_new\"");

       //  pstmt = conn.prepareStatement("SELECT * FROM \"p1891766442trial.hanadb.hihana.hana::RegionStation_Data\"");

       // pstmt = conn.prepareStatement(query);
        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) 
        {
            record.LONGLAT    = rs.getString(1);
            record.StationId  = rs.getString(2);
            record.StationName      = rs.getString(3);
            
        	output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
	} catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
	}
	var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;