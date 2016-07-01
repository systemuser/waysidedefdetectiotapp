    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var query;
    var output = {results: [] };
    try 
    {
        query   =   'SELECT \"C_SENSORID"\,COUNT(*) AS "ALERTCOUNT" '+
                    'FROM \"NEO_6JPBVD37WSX2QT1FE2YGPB0KX\".\"T_IOT_98076F081C1896C6B59E\"'+
                    'WHERE (SECONDS_BETWEEN(\"C_ALERTCREATEDATE\",CURRENT_TIMESTAMP)/86400<30)'+
                    'GROUP BY \"C_SENSORID\"';
          
        pstmt   = conn.prepareStatement(query);
        rs      = pstmt.executeQuery();

        while (rs.next()) 
        {
            var record = {};

            record.SENSORID     = rs.getString(1);
            record.ALERTCOUNT   = rs.getString(2);
            output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
	} 
	catch (e) 
	{
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        //return;
	}
	var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;
