
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var query;
    var output = {results: [] };
    try {
        
        query = 'SELECT "SensorId",'+
                'CASE '+
    		    	'WHEN "Status"=\'Running\'	        THEN \'GREEN\''+
    		        'WHEN "Status"=\'Maintaninance\'	THEN \'YELLOW\''+
    		        'ELSE \'RED\''+
    	        'END AS "STATUS"'+
                'FROM \"NEO_6JPBVD37WSX2QT1FE2YGPB0KX\".\"waysidecloudapp.dbtables::SensorDetails\"';
  
     
        pstmt = conn.prepareStatement(query);
        //pstmt.setString(1, Station_ID);
        rs = pstmt.executeQuery();

        var record = {};
        while (rs.next()) {
        record.StationId  = rs.getString(1);
        record.StationCount    = rs.getString(2);

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
